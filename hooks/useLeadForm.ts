"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";

type Status = "idle" | "loading" | "success" | "error";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

function captureUtm() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const hasUtm = UTM_KEYS.some((k) => params.has(k));
  if (hasUtm) {
    const utm: Record<string, string> = {};
    UTM_KEYS.forEach((k) => {
      const v = params.get(k);
      if (v) utm[k] = v;
    });
    sessionStorage.setItem("utm", JSON.stringify(utm));
  }
}

function getUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem("utm") || "{}");
  } catch {
    return {};
  }
}

export function useLeadForm(course: string) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+351");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => { captureUtm(); }, []);

  /** Allow only digits, strip anything else */
  function setPhoneSafe(val: string) {
    setPhone(val.replace(/\D/g, ""));
    setPhoneError("");
  }

  async function handleSubmit(e?: FormEvent) {
    e?.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) return;
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) {
      setPhoneError("Enter a valid phone number (7–15 digits)");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone: `${countryCode}${phone}`, email, course, utm: getUtm() }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  }

  return { name, setName, phone, setPhone: setPhoneSafe, countryCode, setCountryCode, email, setEmail, status, phoneError, handleSubmit };
}
