"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

type Status = "idle" | "loading" | "success" | "error";

export function useLeadForm(course: string) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e?: FormEvent) {
    e?.preventDefault();
    if (!name && !phone && !email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, course }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  }

  return { name, setName, phone, setPhone, email, setEmail, status, handleSubmit };
}
