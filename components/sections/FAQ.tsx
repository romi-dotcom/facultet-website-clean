"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  // Documents & Citizenship
  {
    category: "documents",
    question: "Is this certificate required for Portuguese citizenship?",
    answer:
      "Yes. The PLA course completion certificate is one of the required documents for your Portuguese citizenship application. Our courses are delivered through official Centro Qualifica partner centres, and all documents are recognised by the relevant Portuguese authorities.",
  },
  {
    category: "documents",
    question: "Can I enroll today and get documents immediately?",
    answer:
      "Yes. Upon enrollment you receive the Declaração de Matrícula (official matriculation certificate) within 2 hours by email. This document confirms your enrollment in a licensed language school and can be submitted as part of your citizenship application package right away.",
  },
  {
    category: "documents",
    question:
      "Is the certificate valid for citizenship and family reunification?",
    answer:
      "Yes. Our certificates are issued through Centro Qualifica partner centres and are officially recognised by Portuguese authorities, including for citizenship applications and family reunification procedures.",
  },
  // Learning Process
  {
    category: "learning",
    question: "What language are classes taught in?",
    answer:
      "All classes are taught in English. This allows students from different countries to study comfortably and communicate with teachers. Basic English proficiency is sufficient — you don\u2019t need to be fluent to understand grammar explanations and course materials.",
  },
  {
    category: "learning",
    question: "What if I miss a lesson?",
    answer:
      "All lessons are recorded and available 24/7 on the learning platform. You can catch up at any time. Your teacher and group chat are always available for questions. We recommend attending live sessions when possible — practice with classmates makes a real difference.",
  },
  {
    category: "learning",
    question: "How long does the course take?",
    answer:
      "The full A0\u2009\u2192\u2009A2 course takes 16 weeks with 3 live sessions per week (Tuesday, Thursday, Saturday), each 3 hours. Total: 150 academic hours. If you already have some basics (A1 level), the A1\u2009\u2192\u2009A2 course takes 4 weeks.",
  },
  // Enrollment
  {
    category: "enrollment",
    question: "Who is this course for?",
    answer:
      "The course is designed for people already living in Portugal who are planning to apply for Portuguese citizenship. It is open to adults aged 18 and above. No prior Portuguese knowledge required — we start from zero.",
  },
  {
    category: "enrollment",
    question: "How do I enroll?",
    answer:
      "Fill in the enrollment form on our website, choose your preferred group and schedule, and complete the payment. Within 24 hours you\u2019ll receive your contract and official matriculation number by email.",
  },
  {
    category: "enrollment",
    question: "Can I pay in installments?",
    answer:
      "Yes. We offer a 3-installment plan via Klarna at no extra cost. You can also pay the full amount upfront with a card or bank transfer.",
  },
];

const categories = [
  { key: "documents", label: "Documents & Citizenship" },
  { key: "learning", label: "Learning Process" },
  { key: "enrollment", label: "Enrollment" },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("documents");

  const filteredFaqs = faqs.filter((f) => f.category === activeCategory);

  return (
    <section className="bg-white py-12 px-5 lg:py-20 lg:px-0">
      <div className="max-w-[1100px] mx-auto">
        {/* ── Desktop Layout ── */}
        <div className="hidden lg:flex gap-20">
          {/* Sidebar */}
          <div className="flex flex-col gap-8 w-[280px] shrink-0">
            {/* Header */}
            <div className="flex flex-col gap-[10px]">
              <span className="text-[11px] font-bold tracking-[2px] text-[#1B8A7E] uppercase">
                FAQ
              </span>
              <h2 className="text-[28px] font-bold leading-[1.2] text-[#1E293B]">
                Frequently Asked Questions
              </h2>
              <p className="text-sm leading-[1.6] text-[#64748B]">
                Answers to the most common questions about enrollment, documents,
                and learning.
              </p>
            </div>

            {/* Categories */}
            <div className="flex flex-col gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-left transition-colors ${
                    activeCategory === cat.key
                      ? "bg-[#1B8A7E] text-white"
                      : "bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      activeCategory === cat.key ? "bg-white" : "bg-[#94A3B8]"
                    }`}
                  />
                  <span
                    className={`text-[13px] ${
                      activeCategory === cat.key ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>

            {/* CTA Card */}
            <div className="flex flex-col gap-3 rounded-xl border border-[#E85D26] bg-[#FFFAF7] p-5">
              <MessageCircle className="w-[22px] h-[22px] text-[#E85D26]" />
              <span className="text-sm font-bold text-[#1E293B]">
                Still have a question?
              </span>
              <p className="text-[13px] leading-[1.5] text-[#64748B]">
                Write to us — we reply within 1 hour.
              </p>
              <a
                href="#contact"
                className="flex items-center justify-center rounded-lg bg-[#1B8A7E] px-5 py-2.5 text-[13px] font-semibold text-white"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Accordion — uses <details>/<summary> so all answers are in the DOM for crawlers */}
          <div className="flex-1 rounded-xl border border-[#E2E8F0] bg-white shadow-[0_4px_24px_rgba(15,23,42,0.05)] overflow-hidden">
            {filteredFaqs.map((faq, i) => (
              <details
                key={faq.question}
                open={i === 0}
                className={`group ${i > 0 ? "border-t border-[#E2E8F0]" : ""}`}
              >
                <summary className="flex items-center justify-between w-full px-6 py-5 cursor-pointer list-none group-open:bg-[#FAFFFE]">
                  <span className="text-[15px] font-semibold text-[#1E293B] pr-4">
                    {faq.question}
                  </span>
                  {/* Chevron rotates via CSS */}
                  <svg
                    className="w-[18px] h-[18px] shrink-0 transition-transform group-open:rotate-180 text-[#1B8A7E]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 bg-[#FAFFFE]">
                  <p className="text-sm leading-[1.7] text-[#64748B]">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* ── Mobile Layout ── */}
        <div className="lg:hidden flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold tracking-[2px] text-[#1B8A7E] uppercase">
              FAQ
            </span>
            <h2 className="text-2xl font-bold leading-[1.2] text-[#1E293B] text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-sm leading-[1.6] text-[#64748B] text-center">
              Answers to the most common questions about enrollment, documents,
              and learning.
            </p>
          </div>

          {/* Accordion — <details> ensures answers are always in HTML for crawlers */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white shadow-[0_4px_24px_rgba(15,23,42,0.05)] overflow-hidden">
            {faqs.slice(0, 5).map((faq, i) => (
              <details
                key={faq.question}
                open={i === 0}
                className={`group ${i > 0 ? "border-t border-[#E2E8F0]" : ""}`}
              >
                <summary className="flex items-center justify-between w-full px-6 py-5 cursor-pointer list-none group-open:bg-[#FAFFFE]">
                  <span className="text-[15px] font-semibold text-[#1E293B] pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className="w-[18px] h-[18px] shrink-0 transition-transform group-open:rotate-180 text-[#1B8A7E]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 bg-[#FAFFFE]">
                  <p className="text-sm leading-[1.7] text-[#64748B]">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>

          {/* CTA Card */}
          <div className="flex flex-col gap-3 rounded-xl border border-[#E85D26] bg-[#FFFAF7] p-5">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#E85D26]" />
              <span className="text-sm font-bold text-[#1E293B]">
                Still have a question?
              </span>
            </div>
            <p className="text-[13px] leading-[1.5] text-[#64748B]">
              Write to us — we reply within 1 hour.
            </p>
            <a
              href="#contact"
              className="flex items-center justify-center rounded-lg bg-[#1B8A7E] px-5 py-3 text-sm font-semibold text-white"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
