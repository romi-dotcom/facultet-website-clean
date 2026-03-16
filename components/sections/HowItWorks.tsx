"use client";

import { useRef, useState, useEffect } from "react";
import {
  ClipboardPen,
  Timer,
  FileText,
  CreditCard,
  Mail,
  ChevronRight,
  BookOpen,
  MonitorPlay,
  Award,
} from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Register & Enroll",
    shortTitle: "Register",
    time: "Day 1",
    color: "#E85D26",
  },
  {
    num: "02",
    title: "Course Introduction",
    shortTitle: "Intro",
    time: "Day 2",
    color: "#1B8A7E",
  },
  {
    num: "03",
    title: "8 Weeks of Training",
    shortTitle: "Training",
    time: "Weeks 1–8",
    color: "#3B82F6",
  },
  {
    num: "04",
    title: "Get Your Certificate",
    shortTitle: "Certificate",
    time: "After Week 8",
    color: "#15803D",
  },
];

const lineGradients = [
  "from-[#E85D26] to-[#1B8A7E]",
  "from-[#1B8A7E] to-[#3B82F6]",
  "from-[#3B82F6] to-[#15803D]",
];

const inactiveCards = [
  {
    icon: BookOpen,
    iconBg: "bg-[#E8F5F3]",
    iconColor: "#1B8A7E",
    stepLabel: "Step 02 · Day 2",
    title: "Course Introduction",
    body: "Platform access, full schedule, and materials. Meet your teacher and group.",
    mobileBody:
      "Platform access, full schedule, and materials. Meet your teacher and group.",
  },
  {
    icon: MonitorPlay,
    iconBg: "bg-[#EFF6FF]",
    iconColor: "#3B82F6",
    stepLabel: "Step 03 · Weeks 1–8",
    title: "8 Weeks of Training",
    body: "Live online lessons 5×/week. Homework, teacher feedback, group chat support.",
    mobileBody:
      "Live online lessons 5×/week. Homework, teacher feedback, group chat support.",
  },
  {
    icon: Award,
    iconBg: "bg-[#F0FDF4]",
    iconColor: "#15803D",
    stepLabel: "Step 04 · After Week 8",
    title: "Get Your Certificate",
    body: "Receive your official Certificate of Completion from Centro Qualifica — valid for your citizenship application.",
    mobileBody:
      "Pass the A2 test. Receive your official Certificate of Completion from Centro Qualifica.",
  },
];

const chips = [
  { icon: FileText, text: "Fill the form" },
  { icon: CreditCard, text: "Complete payment" },
  { icon: Mail, text: "Contract + Matric. Number" },
];

const mobileChips = [
  { icon: FileText, text: "Fill the form" },
  { icon: CreditCard, text: "Complete payment" },
  { icon: Mail, text: "Contract + Matriculation Number" },
];

export default function HowItWorks() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / (el.scrollWidth / inactiveCards.length));
      setActiveCard(Math.min(idx, inactiveCards.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="bg-white lg:pb-24">
      <div className="max-w-[1100px] mx-auto">
        {/* ── Header — Desktop ── */}
        <div className="hidden lg:flex flex-col items-center gap-3 pt-12 pb-8">
          <span className="text-xs font-bold tracking-[2px] text-[#1B8A7E] uppercase">
            PROCESS
          </span>
          <h2 className="text-[36px] font-bold leading-[1.2] text-[#1E293B] text-center">
            How the Training Works
          </h2>
        </div>

        {/* ── Header — Mobile ── */}
        <div className="lg:hidden flex flex-col items-center gap-[10px] px-5 pt-12 pb-8">
          <span className="text-xs font-bold tracking-[2px] text-[#1B8A7E] uppercase">
            PROCESS
          </span>
          <h2 className="text-[26px] font-bold leading-[1.2] text-[#1E293B] text-center">
            How the Training Works
          </h2>
          <p className="text-sm leading-[1.5] text-[#64748B] text-center">
            From registration to certificate — a clear path.
          </p>
        </div>

        {/* ── Step Rail — Desktop ── */}
        <div className="hidden lg:flex items-start justify-between">
          {steps.map((step, i) => (
            <div key={step.num} className="contents">
              <div className="flex flex-col items-center gap-[10px] w-[215px]">
                <div
                  className="step-circle w-12 h-12 rounded-full flex items-center justify-center text-white text-[15px] font-bold"
                  style={{ backgroundColor: step.color, "--step-color": `${step.color}40`, "--delay": `${i * 0.5}s` } as React.CSSProperties}
                >
                  {step.num}
                </div>
                <span className="text-sm font-bold text-[#1E293B] text-center">
                  {step.title}
                </span>
                <span className="text-xs text-[#94A3B8]">{step.time}</span>
              </div>
              {i < 3 && (
                <div className="flex items-center w-20 h-12">
                  <div
                    className={`h-0.5 w-full bg-gradient-to-r ${lineGradients[i]}`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Step Rail — Mobile ── */}
        <div className="flex lg:hidden items-center justify-center px-5 pb-7">
          {steps.map((step, i) => (
            <div key={step.num} className="contents">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className="step-circle w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
                  style={{ backgroundColor: step.color, "--step-color": `${step.color}40`, "--delay": `${i * 0.5}s` } as React.CSSProperties}
                >
                  {step.num}
                </div>
                <span className="text-[10px] font-bold text-[#1E293B] text-center w-[60px]">
                  {step.shortTitle}
                </span>
              </div>
              {i < 3 && (
                <div className="flex flex-col w-7 self-stretch pt-[17px]">
                  <div
                    className={`h-0.5 w-full bg-gradient-to-r ${lineGradients[i]}`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Active Panel — Desktop ── */}
        <div className="hidden lg:flex flex-col gap-5 rounded-[20px] border-2 border-[#E85D26] bg-[#FFFAF7] p-8 px-10 mt-5 shadow-[0_8px_32px_rgba(15,23,42,0.04)]">
          {/* Top row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-[14px] bg-[#E85D26] flex items-center justify-center">
                <ClipboardPen className="w-[26px] h-[26px] text-white" />
              </div>
              <div className="flex flex-col gap-[3px]">
                <span className="text-xs font-bold tracking-[2px] text-[#E85D26]">
                  Step 01 · Day 1
                </span>
                <span className="text-[28px] font-bold text-[#1E293B]">
                  Register & Enroll
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-[#FFF4EF] px-4 py-2">
              <Timer className="w-3.5 h-3.5 text-[#E85D26]" />
              <span className="text-[13px] font-semibold text-[#E85D26]">
                Completes in 24 hours
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#F1F5F9]" />

          {/* Body */}
          <p className="text-base leading-[1.6] text-[#475569]">
            Fill the form, choose your group, complete payment. Within 24 hours
            you&apos;ll receive your contract and official matriculation number
            by email.
          </p>

          {/* Chips */}
          <div className="flex items-center gap-2">
            {chips.map((chip, i) => (
              <div key={chip.text} className="contents">
                <div className="flex items-center gap-2.5 rounded-[10px] border border-[#E2E8F0] bg-white px-4 py-2.5">
                  <chip.icon className="w-[18px] h-[18px] text-[#E85D26]" />
                  <span className="text-sm font-semibold text-[#334155]">
                    {chip.text}
                  </span>
                </div>
                {i < chips.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-[#CBD5E1]" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Active Panel — Mobile ── */}
        <div className="flex lg:hidden flex-col gap-5 rounded-2xl border-2 border-[#E85D26] bg-[#FFFAF7] px-5 pt-6 pb-7 shadow-[0_4px_16px_rgba(232,93,38,0.08)]">
          {/* Top */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[14px] bg-[#E85D26] flex items-center justify-center shrink-0">
              <ClipboardPen className="w-[22px] h-[22px] text-white" />
            </div>
            <div className="flex flex-col gap-[3px]">
              <span className="text-[11px] font-bold tracking-[1px] text-[#E85D26]">
                Step 01 · Day 1
              </span>
              <span className="text-xl font-bold text-[#1E293B]">
                Register & Enroll
              </span>
            </div>
          </div>

          {/* Time badge */}
          <div className="flex items-center gap-1.5 self-start rounded-full bg-white border border-[#FDDCCC] px-3.5 py-[7px]">
            <Timer className="w-[13px] h-[13px] text-[#E85D26]" />
            <span className="text-xs font-semibold text-[#E85D26]">
              Completes in 24 hours
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#F1E8E0]" />

          {/* Body */}
          <p className="text-sm leading-[1.6] text-[#475569]">
            Fill the form, choose your group, complete payment. Within 24 hours
            you&apos;ll receive your contract and official matriculation number
            by email.
          </p>

          {/* Chips — vertical */}
          <div className="flex flex-col gap-2">
            {mobileChips.map((chip) => (
              <div
                key={chip.text}
                className="flex items-center gap-2.5 rounded-[10px] border border-[#E2E8F0] bg-white px-3.5 py-2.5 w-full"
              >
                <chip.icon className="w-4 h-4 text-[#E85D26]" />
                <span className="text-[13px] font-semibold text-[#334155]">
                  {chip.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Inactive Steps — Desktop ── */}
        <div className="hidden lg:flex gap-4 pt-4 mb-8 h-[186px]">
          {inactiveCards.map((step) => (
            <div
              key={step.title}
              className="flex-1 flex flex-col gap-4 rounded-2xl border border-[#E2E8F0] bg-[#FAFAFA] p-7 opacity-70 h-full"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${step.iconBg}`}
                >
                  <step.icon
                    className="w-[18px] h-[18px]"
                    style={{ color: step.iconColor }}
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span
                    className="text-[11px] font-bold tracking-[1px]"
                    style={{ color: step.iconColor }}
                  >
                    {step.stepLabel}
                  </span>
                  <span className="text-base font-bold text-[#1E293B]">
                    {step.title}
                  </span>
                </div>
              </div>
              <p className="text-[13px] leading-[1.6] text-[#64748B]">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* ── Inactive Steps — Mobile (horizontal scroll) ── */}
        <div className="lg:hidden mt-3">
          <div ref={scrollRef} className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-1 px-5" style={{ scrollPaddingLeft: 20 }}>
            {inactiveCards.map((step) => (
              <div
                key={step.title}
                className="flex flex-col gap-3 rounded-[14px] border border-[#E2E8F0] bg-[#FAFAFA] p-[18px] px-5 opacity-85 shrink-0 w-[270px] snap-start"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-[10px] flex items-center justify-center ${step.iconBg}`}
                  >
                    <step.icon
                      className="w-4 h-4"
                      style={{ color: step.iconColor }}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span
                      className="text-[10px] font-bold tracking-[1px]"
                      style={{ color: step.iconColor }}
                    >
                      {step.stepLabel}
                    </span>
                    <span className="text-[15px] font-bold text-[#1E293B]">
                      {step.title}
                    </span>
                  </div>
                </div>
                <p className="text-[13px] leading-[1.5] text-[#64748B]">
                  {step.mobileBody}
                </p>
              </div>
            ))}
            <div className="min-w-[20px] shrink-0" />
          </div>

          {/* Scroll dots */}
          <div className="flex items-center justify-center gap-1.5 mt-3 pb-8">
            {inactiveCards.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all ${i === activeCard ? "w-2 h-2 bg-[#E85D26]" : "w-1.5 h-1.5 bg-[#CBD5E1]"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
