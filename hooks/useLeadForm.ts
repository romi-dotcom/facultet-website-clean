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

const pageLoadTime = typeof window !== "undefined" ? Date.now() : 0;

export function useLeadForm(course: string) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+351");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");

  useEffect(() => { captureUtm(); }, []);

  /** Allow only digits, strip anything else */
  function setPhoneSafe(val: string) {
    setPhone(val.replace(/\D/g, ""));
    if (formError) setFormError("");
  }

  function clearError() { if (formError) setFormError(""); }

  async function handleSubmit(e?: FormEvent) {
    e?.preventDefault();
    if (!name.trim()) { setFormError("Please enter your name"); return; }
    if (!email.trim()) { setFormError("Please enter your email"); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) { setFormError("Please enter a valid email address"); return; }
    if (!phone.trim()) { setFormError("Please enter your phone number"); return; }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) {
      setFormError("Please enter a valid phone number (7–15 digits)");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: `${countryCode}${phone}`,
          email,
          course,
          utm: getUtm(),
          fbp: document.cookie.match(/_fbp=([^;]+)/)?.[1] || "",
          fbc: document.cookie.match(/_fbc=([^;]+)/)?.[1] || "",
          eventSourceUrl: window.location.href,
          referrer: document.referrer || "",
          language: navigator.language || "",
          timeOnSite: Math.round((Date.now() - pageLoadTime) / 1000),
          device: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  }

  return { name, setName: (v: string) => { setName(v); clearError(); }, phone, setPhone: setPhoneSafe, countryCode, setCountryCode, email, setEmail: (v: string) => { setEmail(v); clearError(); }, status, formError, handleSubmit };
}
