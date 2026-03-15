"use client";

import {
  Check,
  MessageCircle,
  Phone,
  Mail,
  Timer,
  Instagram,
  Send,
  ShieldCheck,
  Award,
  CircleCheck,
} from "lucide-react";
import NavBar from "@/components/sections/NavBar";

const WA_LINK =
  "https://api.whatsapp.com/send/?phone=351923296007&text=Hello%21+I%27d+like+to+learn+more+about+your+Portuguese+language+courses.&type=phone_number&app_absent=0";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <HeroSection />
      <StepsSection />
      <UrgencySection />
      <Footer />
    </main>
  );
}

/* ── Hero ── */
function HeroSection() {
  return (
    <section className="bg-[#F8FAFC] flex justify-center px-5 py-12 lg:px-[120px] lg:py-20">
      <div className="flex flex-col items-center gap-6 lg:gap-8 max-w-[720px] w-full">
        {/* Check circle */}
        <div className="w-[72px] h-[72px] lg:w-20 lg:h-20 rounded-full bg-[#DCFCE7] flex items-center justify-center">
          <Check className="w-8 h-8 lg:w-9 lg:h-9 text-[#16A34A]" />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-3 lg:gap-4 w-full">
          <span className="text-[11px] lg:text-xs font-bold tracking-[2px] text-[#1B8A7E]">
            REQUEST RECEIVED
          </span>
          {/* Mobile heading */}
          <h1 className="lg:hidden text-[28px] font-extrabold text-[#1E293B] text-center leading-[1.2] tracking-[-0.5px]">
            Got it — we&apos;ll be in touch within 1 day
          </h1>
          {/* Desktop heading */}
          <h1 className="hidden lg:block text-[44px] font-extrabold text-[#1E293B] text-center leading-[1.15] tracking-[-0.5px] w-full">
            Got it — we&apos;ll be{"\n"}in touch within 1 day
          </h1>
          <p className="text-sm lg:text-base text-[#64748B] text-center leading-[1.6] w-full">
            We&apos;ve received your request and will contact you via WhatsApp
            or email to answer your questions, share the details, and help you
            decide if this course is right for you.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Steps ── */
const steps = [
  {
    num: "1",
    numBg: "bg-[#1B8A7E]",
    title: "We get in touch",
    text: "Within 1 day, our team will reach out via WhatsApp or email to answer your questions and walk you through everything — format, schedule, payment options.",
  },
  {
    num: "2",
    numBg: "bg-[#E85D26]",
    title: "You decide",
    text: "No pressure. Take your time to think it over. If you're ready to join, we'll guide you through the next steps and reserve your spot.",
  },
  {
    num: "3",
    numBg: "bg-[#1B8A7E]",
    title: "Start learning",
    text: "Join the group chat, get access to materials and attend your first class. Your Portuguese journey begins.",
  },
];

function StepsSection() {
  return (
    <section className="bg-white px-5 py-10 lg:px-[120px] lg:py-20 flex justify-center">
      <div className="flex flex-col gap-6 lg:gap-12 max-w-[1100px] w-full">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 lg:gap-3">
          <span className="text-[11px] lg:text-xs font-bold tracking-[2px] text-[#1B8A7E]">
            WHAT HAPPENS NEXT
          </span>
          <h2 className="text-[22px] lg:text-[32px] font-extrabold text-[#1E293B] text-center leading-[1.2] tracking-[-0.3px] lg:tracking-[-0.5px]">
            What happens next
          </h2>
        </div>

        {/* Cards */}
        <div className="flex flex-col lg:flex-row gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="flex-1 flex flex-col gap-3 lg:gap-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 lg:p-8"
            >
              <div
                className={`w-9 h-9 lg:w-10 lg:h-10 rounded-[18px] lg:rounded-[20px] ${step.numBg} flex items-center justify-center`}
              >
                <span className="text-[15px] font-bold text-white">
                  {step.num}
                </span>
              </div>
              <h3 className="text-base lg:text-lg font-bold text-[#1E293B]">
                {step.title}
              </h3>
              <p className="text-sm text-[#64748B] leading-[1.6]">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Urgency / WhatsApp ── */
function UrgencySection() {
  return (
    <section className="bg-[#F8FAFC] border-y border-[#E2E8F0] px-5 py-8 lg:px-[120px] lg:py-12 flex justify-center">
      <div className="flex flex-col lg:flex-row items-center lg:items-center gap-5 lg:gap-10 max-w-[1100px] w-full lg:justify-between">
        {/* Left text */}
        <div className="flex flex-col gap-2 lg:gap-2 text-center lg:text-left">
          <h3 className="text-xl lg:text-[22px] font-extrabold text-[#1E293B] leading-[1.2] tracking-[-0.3px]">
            <span className="lg:hidden">
              Have questions?{"\n"}Write to us on WhatsApp
            </span>
            <span className="hidden lg:inline">
              Have questions? Write to us on WhatsApp
            </span>
          </h3>
          <p className="text-sm lg:text-[15px] text-[#64748B] leading-[1.5]">
            We&apos;ll walk you through the course details, schedule and options
            — no pressure.
          </p>
        </div>

        {/* Right CTA */}
        <div className="flex flex-col items-center gap-3 w-full lg:w-auto">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full lg:w-[280px] h-14 rounded-full bg-[#25D366] shadow-[0_2px_12px_rgba(37,211,102,0.19)]"
          >
            <MessageCircle className="w-5 h-5 text-white" />
            <span className="text-[15px] font-bold text-white">
              Message us on WhatsApp
            </span>
          </a>
          <span className="text-[13px] text-[#64748B]">
            Or call: +351 923 296 007
          </span>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="bg-[#1E293B]">
      {/* Desktop */}
      <div className="hidden lg:block max-w-[1100px] mx-auto pt-14 pb-10">
        <div className="flex gap-10 justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-2.5 w-[320px]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-[#1B8A7E] flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">OLA</span>
              </div>
              <span className="text-base font-bold text-white">
                Ola Facultet
              </span>
            </div>
            <span className="text-[13px] text-[#94A3B8]">
              Facultet School Language Centre
            </span>
            <span className="text-[13px] text-[#64748B]">
              Av. da República 51, 1495-110 Algés, Portugal
            </span>
            <p className="text-[13px] leading-[1.6] text-[#64748B] max-w-[280px]">
              Official PLA language school. A2 Portuguese programme recognised
              by Portuguese authorities and embassies.
            </p>
            <div className="flex gap-2 mt-1">
              {[
                { icon: Instagram, color: "text-white", href: "#" },
                { icon: MessageCircle, color: "text-[#25D366]", href: WA_LINK },
                { icon: Send, color: "text-white", href: "#" },
              ].map(({ icon: Icon, color, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/[0.07] border border-white/[0.08] flex items-center justify-center"
                >
                  <Icon className={`w-4 h-4 ${color}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Contacts */}
          <div className="flex flex-col gap-2.5 w-[220px]">
            <span className="text-[10px] font-bold tracking-[1.5px] text-[#64748B]">
              CONTACTS
            </span>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#64748B]" />
              <span className="text-sm text-[#E2E8F0]">+351 923 296 007</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#64748B]" />
              <span className="text-sm text-[#1B8A7E]">
                ola@facultet.school
              </span>
            </div>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#64748B]" />
              <span className="text-sm text-[#25D366]">
                WhatsApp: +351 923 296 007
              </span>
            </a>
            <div className="flex items-center gap-1.5">
              <Timer className="w-3.5 h-3.5 text-[#64748B]" />
              <span className="text-[13px] text-[#64748B]">
                Mon–Fri 9:00–18:00 · Sat 10:00–14:00
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2.5 w-[140px]">
            <span className="text-[10px] font-bold tracking-[1.5px] text-[#64748B]">
              QUICK LINKS
            </span>
            <a href="/#courses" className="text-sm text-[#E2E8F0]">
              Courses & Pricing
            </a>
            <a href="/#programme" className="text-sm text-[#E2E8F0]">
              Programme
            </a>
            <a href="/#faq" className="text-sm text-[#E2E8F0]">
              FAQ
            </a>
            <a href="#" className="text-sm text-[#64748B]">
              Privacy Policy
            </a>
          </div>

          {/* Accredited By */}
          <div className="flex flex-col gap-3 w-[180px]">
            <span className="text-[10px] font-bold tracking-[1.5px] text-[#64748B]">
              ACCREDITED BY
            </span>
            {[
              { icon: ShieldCheck, text: "DGERT Licensed" },
              { icon: Award, text: "Centro Qualifica" },
              { icon: CircleCheck, text: "AIMA Recognised" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 rounded-lg bg-white/[0.04] border border-white/[0.07] px-3 py-2"
              >
                <Icon className="w-3.5 h-3.5 text-[#1B8A7E]" />
                <span className="text-xs font-semibold text-[#E2E8F0]">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-[#334155] mt-8" />
        <div className="flex items-center justify-between pt-6">
          <span className="text-xs text-[#64748B]">
            © 2026 Facultet School · All rights reserved
          </span>
          <span className="text-xs text-[#64748B]">
            Terms of Use · Privacy Policy · Cookies
          </span>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <div className="flex flex-col gap-2.5 px-5 pt-10 pb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-[#1B8A7E] flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">OLA</span>
            </div>
            <span className="text-base font-bold text-white">Ola Facultet</span>
          </div>
          <span className="text-[13px] text-[#94A3B8]">
            Facultet School Language Centre
          </span>
          <span className="text-[13px] leading-[1.5] text-[#64748B]">
            Av. da República 51, 1495-110 Algés, Portugal
          </span>
        </div>

        <div className="h-px bg-[#334155]" />

        <div className="flex gap-5 px-5 py-6">
          <div className="flex flex-col gap-2.5 flex-1">
            <span className="text-[10px] font-bold tracking-[1.5px] text-[#64748B]">
              QUICK LINKS
            </span>
            <a href="/#courses" className="text-sm text-[#E2E8F0]">Courses & Pricing</a>
            <a href="/#programme" className="text-sm text-[#E2E8F0]">Programme</a>
            <a href="/#faq" className="text-sm text-[#E2E8F0]">FAQ</a>
          </div>
          <div className="flex flex-col gap-2.5 flex-1">
            <span className="text-[10px] font-bold tracking-[1.5px] text-[#64748B]">
              CONTACTS
            </span>
            <span className="text-sm text-[#E2E8F0]">+351 923 296 007</span>
            <span className="text-sm text-[#1B8A7E]">ola@facultet.school</span>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-sm text-[#25D366]">
              WhatsApp
            </a>
          </div>
        </div>

        <div className="h-px bg-[#334155]" />

        <div className="flex justify-center gap-4 px-5 py-4">
          <span className="text-xs text-[#64748B]">Terms of Use</span>
          <span className="text-xs text-[#64748B]">Privacy Policy</span>
        </div>

        <div className="pb-8">
          <p className="text-xs text-[#64748B] text-center">
            © 2026 Facultet School · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
