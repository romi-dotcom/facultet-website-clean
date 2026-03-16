"use client";

import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  FileText,
  FileCheck,
  Award,
  Clock3,
  CircleCheck,
  CircleDashed,
  Calendar,
  Users,
  BookOpen,
  Timer,
  TriangleAlert,
  CalendarCheck,
  BookOpenCheck,
  MessageCircle,
  Landmark,
  Star,
  ShieldCheck,
  ChevronDown,
  Quote,
  Zap,
  CreditCard,
  Phone,
  Mail,
  User,
  HandHelping,
  Instagram,
  Send,
  Menu,
  X,
  RefreshCw,
  Trophy,
  Info,
} from "lucide-react";
import { useLeadForm } from "@/hooks/useLeadForm";
import { countryCodes } from "@/lib/countryCodes";

/* ──────────────────────────────────────────────
   NavBar (reused from homepage with same structure)
   ────────────────────────────────────────────── */
const navLinks = [
  { label: "Courses", href: "#courses" },
  { label: "About", href: "#about" },
  { label: "Contacts", href: "#contacts" },
];

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [menuOpen]);

  return (
    <nav
      className={`sticky top-0 z-[100] bg-white transition-shadow ${
        scrolled ? "shadow-[0_2px_12px_rgba(0,0,0,0.08)]" : ""
      }`}
    >
      <div className="flex items-center justify-between h-14 px-5 border-b border-[#F1F5F9] lg:h-16 lg:px-0 lg:border-0 lg:justify-center">
        <div className="flex items-center justify-between w-full lg:max-w-[1200px]">
          <a href="/" className="flex items-center gap-2 lg:gap-2.5">
            <div className="w-7 h-7 rounded-[5px] bg-[#1B8A7E] flex items-center justify-center lg:w-8 lg:h-8 lg:rounded-[6px]">
              <span className="text-[9px] font-bold text-white lg:text-[10px]">OLA</span>
            </div>
            <span className="text-sm font-bold text-[#1E293B] lg:text-base">Ola Facultet</span>
          </a>
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-[15px] font-medium text-[#374151] hover:text-[#1E293B] transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <a href="#enrol" className="btn-pulse rounded-lg bg-[#E85D26] px-3.5 h-9 flex items-center text-[13px] font-bold text-white lg:h-auto lg:px-6 lg:py-2.5 lg:text-sm">
              <span className="lg:hidden">Enrol Now</span>
              <span className="hidden lg:inline">Enroll Now →</span>
            </a>
            <button onClick={() => setMenuOpen((v) => !v)} className="lg:hidden flex items-center justify-center w-6 h-6" aria-label="Toggle menu">
              {menuOpen ? <X className="w-6 h-6 text-[#4A5568]" /> : <Menu className="w-6 h-6 text-[#4A5568]" />}
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E2E8F0] shadow-[0_4px_16px_rgba(0,0,0,0.1)] px-5 pb-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="flex items-center h-12 text-base font-medium text-[#1E293B] border-b border-[#F0F0F0]">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}


/* ──────────────────────────────────────────────
   Hero Section
   ────────────────────────────────────────────── */
function StatsFlip() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const stats = [
    { icon: Timer, label: "75h" },
    { icon: Calendar, label: "2 months" },
    { icon: Users, label: "Max 20" },
  ];
  return (
    <div ref={ref} className="flex gap-2">
      {stats.map((s, i) => (
        <div key={s.label} className={`flex-1 flex flex-col items-center gap-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] py-3 px-2 ${visible ? "calendar-flip" : "opacity-0"}`} style={{ "--flip-delay": `${i * 0.25}s` } as React.CSSProperties}>
          <s.icon className="w-4 h-4 text-[#1B8A7E]" />
          <span className="text-[13px] font-bold text-[#1E293B]">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="bg-white">
      {/* ── Desktop ── */}
      <div className="hidden lg:flex items-start justify-center py-20 px-[120px]">
        <div className="flex gap-20 w-[1200px]">
          {/* Left */}
          <div className="flex flex-col gap-6 flex-1">
            {/* Pre-head */}
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#1B8A7E]" />
              <span className="text-sm font-medium text-[#1B8A7E]">For immigrants building their life in Portugal</span>
            </div>
            {/* Tags */}
            <div className="flex items-center gap-2">
              <span className="bg-[#E85D26] text-white text-[13px] font-semibold rounded-full px-3.5 py-1.5">A1 → A2</span>
              <span className="bg-[#F1F5F9] text-[#1E293B] text-[13px] font-medium rounded-full px-3.5 py-1.5">Online</span>
              <span className="bg-[#F1F5F9] text-[#1E293B] text-[13px] font-medium rounded-full px-3.5 py-1.5">Mon, Thu · 19–22</span>
              <span className="bg-[#ECFDF5] text-[#065F46] text-[13px] font-medium rounded-full px-3.5 py-1.5">75h total</span>
            </div>
            {/* H1 */}
            <h1 className="text-[56px] font-bold leading-[1.1] text-[#1E293B]">Portuguese A1 to A2</h1>
            {/* Outcome block */}
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-5 px-6 flex flex-col gap-3.5">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#16A34A]" />
                <span className="text-[13px] font-bold text-[#16A34A]">What you&apos;ll achieve in 2 months</span>
              </div>
              <p className="text-[15px] text-[#1E293B] leading-[1.6]">
                Continue your Portuguese journey from A1 to A2. Pass the A2 exam. Get your official PLA certificate — issued in partnership with Centro Qualifica and recognised for citizenship and permanent residence.
              </p>
              <div className="flex items-center gap-2">
                <span className="bg-[#DCFCE7] text-[#15803D] text-xs font-medium rounded-full px-2.5 py-1">✓ Speak confidently</span>
                <span className="bg-[#DCFCE7] text-[#15803D] text-xs font-medium rounded-full px-2.5 py-1">✓ Pass A2 exam</span>
                <span className="bg-[#DCFCE7] text-[#15803D] text-xs font-medium rounded-full px-2.5 py-1">✓ Get official certificate</span>
              </div>
            </div>
            {/* Subheadline */}
            <p className="text-lg text-[#64748B] leading-[1.6]">
              Continue your Portuguese journey from A1 to A2 with evening online classes from the comfort of your home. Immerse yourself in the language and culture — and end your day with something truly worth learning.
            </p>
            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="relative w-[72px] h-8">
                <img src="/images/avatar1.png" alt="" className="absolute left-0 top-0 w-8 h-8 rounded-full border-2 border-white object-cover" />
                <img src="/images/avatar2.png" alt="" className="absolute left-5 top-0 w-8 h-8 rounded-full border-2 border-white object-cover" />
                <img src="/images/avatar3.png" alt="" className="absolute left-10 top-0 w-8 h-8 rounded-full border-2 border-white object-cover" />
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-[#E85D26]">★★★★★</span>
                  <span className="text-sm font-bold text-[#1E293B]">5.0</span>
                  <span className="text-[13px] text-[#64748B]">· 42 reviews</span>
                </div>
                <span className="text-[13px] text-[#64748B]">470+ graduates already certified</span>
              </div>
            </div>
          </div>

          {/* Right — Price Card */}
          <div className="w-[360px] shrink-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
            <div className="flex flex-col gap-5 p-7 pb-6">
              {/* Price row */}
              <div className="flex items-center gap-2.5">
                <span className="text-[42px] font-extrabold text-[#1E293B] leading-[1]">€310</span>
                <span className="text-lg text-[#94A3B8] line-through">€520</span>
                <span className="bg-[#FEF3C7] text-[#B45309] text-[10px] font-bold rounded-md px-2 py-0.5 whitespace-nowrap">−40% · Limited offer</span>
              </div>
              {/* Klarna */}
              <div className="flex items-center gap-2 bg-[#FFF0F8] rounded-lg px-3.5 py-2.5">
                <CreditCard className="w-4 h-4 text-[#DB2777]" />
                <span className="text-[13px] font-medium text-[#1E293B]">Instalments up to 3 months</span>
                <span className="bg-[#FFB3D9] text-[#17120E] text-xs font-bold italic rounded-md px-2.5 py-1">klarna</span>
              </div>
              {/* Breakdown */}
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#94A3B8]">
                <span className="font-semibold">€104</span><span>·</span>
                <span className="font-semibold">€104</span><span>·</span>
                <span className="font-semibold">€104</span>
                <span className="text-[#CBD5E1]">= €312 total · 0% interest</span>
              </div>
              {/* Divider */}
              <div className="h-px bg-[#E2E8F0]" />
              {/* Meta rows */}
              <div className="flex flex-col gap-3.5">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#94A3B8]" />
                  <span className="text-[13px] text-[#94A3B8]">Start:</span>
                  <span className="text-[13px] font-semibold text-[#1E293B]">May 2 · June 2 · August 13</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-[#94A3B8]" />
                  <span className="text-[13px] text-[#94A3B8]">Spots left:</span>
                  <span className="text-[13px] font-bold text-[#E85D26]">20 spots left</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-[#94A3B8]" />
                  <span className="text-[13px] text-[#94A3B8]">Duration:</span>
                  <span className="text-[13px] font-semibold text-[#1E293B]">2 months · 75 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#94A3B8]" />
                  <span className="text-[13px] text-[#94A3B8]">Format:</span>
                  <span className="text-[13px] font-semibold text-[#1E293B]">Online (Zoom)</span>
                </div>
              </div>
              {/* Divider */}
              <div className="h-px bg-[#E2E8F0]" />
              {/* CTA */}
              <a href="#enrol" className="btn-pulse flex items-center justify-center h-[52px] bg-[#E85D26] rounded-lg text-[15px] font-bold text-white">Enrol Now</a>
              {/* Trust */}
              <div className="flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1B8A7E]" />
                <span className="text-[11px] text-[#94A3B8]">Official documents · Licensed school</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="lg:hidden flex flex-col gap-4 px-5 py-6">
        {/* Pre-head */}
        <div className="inline-flex items-center gap-1.5 bg-[#F0FDF4] rounded-full pl-2 pr-3 py-[5px] w-fit">
          <MapPin className="w-[13px] h-[13px] text-[#059669]" />
          <span className="text-xs font-bold text-[#1B8A7E]">For immigrants building their life in Portugal</span>
        </div>
        {/* Tags */}
        <div className="flex items-center gap-1.5">
          <span className="bg-[#E85D26] text-white text-xs font-semibold rounded-full px-3 py-[5px]">A1 → A2</span>
          <span className="bg-[#F1F5F9] text-[#1E293B] text-xs font-medium rounded-full px-3 py-[5px]">Online</span>
          <span className="bg-[#ECFDF5] text-[#065F46] text-xs font-medium rounded-full px-3 py-[5px]">75h total</span>
        </div>
        {/* H1 */}
        <h1 className="text-[36px] font-bold leading-[1.15] text-[#1E293B]">Portuguese A1{"\n"}to A2</h1>
        {/* Outcome */}
        <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center gap-1.5 pb-1">
            <Trophy className="w-3.5 h-3.5 text-[#16A34A]" />
            <span className="text-xs font-bold text-[#16A34A]">What you&apos;ll achieve in 11 weeks</span>
          </div>
          <p className="text-[13px] text-[#1E293B] leading-[1.5]">
            Continue your Portuguese journey from A1 to A2. Pass the A2 exam. Get your official PLA certificate — issued in partnership with Centro Qualifica.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="bg-[#DCFCE7] text-[#15803D] text-[11px] font-medium rounded-full px-2.5 py-1">✓ Speak confidently</span>
            <span className="bg-[#DCFCE7] text-[#15803D] text-[11px] font-medium rounded-full px-2.5 py-1">✓ Get PLA certificate</span>
          </div>
        </div>
        {/* Sub */}
        <p className="text-sm text-[#64748B] leading-[1.6]">
          Continue your Portuguese journey from A1 to A2 with evening online classes from the comfort of your home. Immerse yourself in the language and culture — and end your day with something truly worth learning.
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Mobile Social Proof
   ────────────────────────────────────────────── */
function MobileSocialProof() {
  return (
    <div className="lg:hidden flex items-center gap-3 bg-[#F8FAFC] px-5 py-4">
      <div className="relative w-16 h-7">
        <img src="/images/avatar1.png" alt="" className="absolute left-0 top-0 w-7 h-7 rounded-full border-2 border-white object-cover" />
        <img src="/images/avatar2.png" alt="" className="absolute left-[18px] top-0 w-7 h-7 rounded-full border-2 border-white object-cover" />
        <img src="/images/avatar3.png" alt="" className="absolute left-9 top-0 w-7 h-7 rounded-full border-2 border-white object-cover" />
      </div>
      <div className="flex flex-col gap-0.5 flex-1">
        <span className="text-[13px] font-semibold text-[#1E293B]">★★★★★  5.0 · 42 reviews</span>
        <span className="text-xs text-[#64748B]">470+ graduates already certified</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Mobile Price Card
   ────────────────────────────────────────────── */
function MobilePriceCard() {
  return (
    <div className="lg:hidden flex flex-col gap-4 bg-white px-5 pt-8 pb-5">
      {/* Price row */}
      <div className="flex items-center gap-2.5">
        <span className="text-[38px] font-extrabold text-[#1E293B] leading-[1]">€310</span>
        <span className="text-base text-[#94A3B8] line-through">€520</span>
        <span className="bg-[#FEF3C7] text-[#B45309] text-[11px] font-bold rounded-md px-2.5 py-1">−40% · Limited offer</span>
      </div>
      {/* Klarna */}
      <div className="flex items-center gap-2 bg-[#FFF0F8] rounded-lg px-3.5 py-2.5">
        <CreditCard className="w-[15px] h-[15px] text-[#DB2777]" />
        <span className="text-xs font-medium text-[#1E293B]">Instalments up to 3 months</span>
        <span className="bg-[#FFB3D9] text-[#17120E] text-[11px] font-bold italic rounded-md px-2 py-[3px]">klarna</span>
      </div>
      {/* Breakdown */}
      <div className="flex items-center justify-center text-[11px] text-[#94A3B8]">
        €104 · €104 · €104 = €312 total · 0% interest
      </div>
      {/* Divider */}
      <div className="h-px bg-[#E2E8F0]" />
      {/* Meta */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2.5">
          <Calendar className="w-[15px] h-[15px] text-[#94A3B8]" />
          <span className="text-[13px] text-[#94A3B8]">Start:</span>
          <span className="text-[13px] font-semibold text-[#1E293B]">May 2 · June 2 · August 13</span>
        </div>
        <div className="flex items-center gap-2.5 bg-[#FEF9C3] border border-[#FDE047] rounded-lg px-2.5 py-1.5">
          <Users className="w-[15px] h-[15px] text-[#CA8A04]" />
          <span className="text-[13px] text-[#B45309]">Spots left:</span>
          <span className="text-[13px] font-bold text-[#B45309]">20 left</span>
        </div>
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-[15px] h-[15px] text-[#94A3B8]" />
          <span className="text-[13px] text-[#94A3B8]">Duration:</span>
          <span className="text-[13px] font-semibold text-[#1E293B]">2 months · 75 hours</span>
        </div>
        <div className="flex items-center gap-2.5">
          <MapPin className="w-[15px] h-[15px] text-[#94A3B8]" />
          <span className="text-[13px] text-[#94A3B8]">Format:</span>
          <span className="text-[13px] font-semibold text-[#1E293B]">Online (Zoom)</span>
        </div>
      </div>
      {/* Divider */}
      <div className="h-px bg-[#E2E8F0]" />
      {/* CTA */}
      <a href="#enrol" className="btn-pulse flex items-center justify-center h-14 bg-[#E85D26] rounded-[10px] text-base font-extrabold text-white">Enrol Now</a>
      {/* Trust */}
      <div className="flex flex-col items-center gap-1 pt-2">
        <div className="flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3 h-3 text-[#94A3B8]" />
          <span className="text-[11px] text-[#94A3B8]">Official documents · Licensed school</span>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <CircleCheck className="w-3 h-3 text-[#94A3B8]" />
          <span className="text-[11px] text-[#94A3B8]">No payment today · Cancel anytime</span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Official Documents Section
   ────────────────────────────────────────────── */
function DocsSection() {
  const docsScrollRef = useRef<HTMLDivElement>(null);
  const [activeDocCard, setActiveDocCard] = useState(0);

  useEffect(() => {
    const el = docsScrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / (el.scrollWidth / 3));
      setActiveDocCard(Math.min(idx, 2));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="bg-[#F8FAFC]">
      {/* ── Desktop ── */}
      <div className="hidden lg:block py-20 px-[120px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center gap-3 mb-12">
            <span className="text-xs font-semibold tracking-[0.8px] text-[#1B8A7E]">WHAT YOU RECEIVE</span>
            <h2 className="text-[36px] font-bold leading-[1.2] text-[#1E293B] text-center">Official Documents — from Day One</h2>
            <p className="text-base text-[#64748B] text-center max-w-[700px]">
              From enrolment to citizenship application — every document is official and recognised by Portuguese authorities.
            </p>
          </div>
          <div className="flex flex-row gap-6">
            <div className="flex-1 bg-white rounded-2xl border border-[#E2E8F0] p-7 relative overflow-hidden">
              <span className="inline-block bg-[#ECFDF5] text-[#065F46] text-[11px] font-semibold rounded-full px-3 py-1 mb-4">WITHIN 2 HOURS</span>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-[10px] bg-[#ECFDF5] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#1B8A7E]" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-[#1E293B]">Declaração de Matrícula</p>
                  <p className="text-[13px] text-[#64748B]">Matriculation Certificate</p>
                </div>
              </div>
              <div className="h-px bg-[#E2E8F0] mb-4" />
              <p className="text-sm text-[#475569] leading-[1.5] mb-4">
                Official proof of enrolment in a licensed language school — not a completion certificate. Issued the same day you sign up. Required for your citizenship documents package.
              </p>
              <div className="flex items-center gap-2">
                <Clock3 className="w-3.5 h-3.5 text-[#1B8A7E]" />
                <span className="text-[13px] text-[#1B8A7E]">Enrolment certificate — issued within 2 hours</span>
              </div>
            </div>
            <div className="flex-1 bg-white rounded-2xl border border-[#E2E8F0] p-7 relative overflow-hidden">
              <span className="inline-block bg-[#FFF7ED] text-[#C2410C] text-[11px] font-semibold rounded-full px-3 py-1 mb-4">ON REQUEST</span>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-[10px] bg-[#FFF7ED] flex items-center justify-center">
                  <FileCheck className="w-5 h-5 text-[#E85D26]" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-[#1E293B]">Declaração de Frequência</p>
                  <p className="text-[13px] text-[#64748B]">Attendance Certificate</p>
                </div>
              </div>
              <div className="h-px bg-[#E2E8F0] mb-4" />
              <p className="text-sm text-[#475569] leading-[1.5] mb-4">
                Confirms active course attendance. Can be requested at any time during the course.
              </p>
              <div className="flex items-center gap-2">
                <CircleCheck className="w-3.5 h-3.5 text-[#E85D26]" />
                <span className="text-[13px] text-[#E85D26]">Available on request</span>
              </div>
            </div>
            <div className="flex-1 bg-[#0F766E] rounded-2xl p-7 relative overflow-hidden">
              <span className="inline-block bg-white/15 text-[#CCFBF1] text-[11px] font-semibold rounded-full px-3 py-1 mb-4">AFTER 160 HOURS</span>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white">Certificado de Aprovação</p>
                  <p className="text-[11px] text-[#99F6E4]">Certificate of Completion</p>
                </div>
              </div>
              <div className="h-px bg-white/15 mb-4" />
              <p className="text-[13px] text-[#CCFBF1] leading-[1.5] mb-4">
                Official completion certificate. Recognised by Portuguese authorities for citizenship applications.
              </p>
              <div className="flex items-center gap-2">
                <CircleCheck className="w-4 h-4 text-white" />
                <span className="text-xs font-medium text-white">Issued by Centro Qualifica</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="lg:hidden py-8">
        <div className="flex flex-col gap-2 px-5">
          <h2 className="text-[25px] font-bold leading-[1.2] text-[#1E293B]">Official Documents —{"\n"}from Day One</h2>
          <p className="text-[13px] text-[#64748B] leading-[1.5] mt-1">
            From enrolment to citizenship application — every document is official and recognised by Portuguese authorities.
          </p>
        </div>
        <div ref={docsScrollRef} className="flex flex-row flex-nowrap gap-3 px-5 mt-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide" style={{ scrollPaddingLeft: 20 }}>
          {/* Card 1 */}
          <div className="shrink-0 w-[280px] bg-white rounded-2xl border border-[#E2E8F0] p-4 flex flex-col gap-2.5 snap-start">
            <span className="self-start bg-[#ECFDF5] text-[#065F46] text-[11px] font-semibold rounded-full px-2.5 py-1">WITHIN 2 HOURS</span>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-[10px] bg-[#ECFDF5] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-[#1B8A7E]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-[15px] font-bold text-[#1E293B]">Declaração de Matrícula</p>
                <p className="text-[13px] text-[#64748B]">Matriculation Certificate</p>
              </div>
            </div>
            <p className="text-[13px] text-[#475569] leading-[1.5]">
              Official proof of enrolment in a licensed language school — not a completion certificate. Issued the same day you sign up.
            </p>
            <div className="flex items-center gap-1.5 mt-auto">
              <Clock3 className="w-[13px] h-[13px] text-[#1B8A7E] shrink-0" />
              <span className="text-xs font-medium text-[#1B8A7E]">Issued within 2 hours</span>
            </div>
          </div>
          {/* Card 2 */}
          <div className="shrink-0 w-[280px] bg-white rounded-2xl border border-[#FED7AA] p-4 flex flex-col gap-2.5 snap-start">
            <span className="self-start bg-[#FFF7ED] text-[#C2410C] text-[11px] font-semibold rounded-full px-2.5 py-1">ON REQUEST</span>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-[10px] bg-[#FFF7ED] flex items-center justify-center shrink-0">
                <FileCheck className="w-5 h-5 text-[#E85D26]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-[15px] font-bold text-[#1E293B]">Declaração de Frequência</p>
                <p className="text-[13px] text-[#64748B]">Attendance Certificate</p>
              </div>
            </div>
            <p className="text-[13px] text-[#475569] leading-[1.5]">
              Confirms active course attendance. Can be requested at any time during the course.
            </p>
            <div className="flex items-center gap-1.5 mt-auto">
              <CircleCheck className="w-[13px] h-[13px] text-[#E85D26] shrink-0" />
              <span className="text-xs font-medium text-[#E85D26]">Available on request</span>
            </div>
          </div>
          {/* Card 3 */}
          <div className="shrink-0 w-[280px] bg-[#0F766E] rounded-2xl p-4 flex flex-col gap-2.5 snap-start">
            <span className="self-start bg-white/15 text-[#CCFBF1] text-[11px] font-semibold rounded-full px-2.5 py-1">AFTER 160 HOURS</span>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-[15px] font-bold text-white">Certificado de Aprovação</p>
                <p className="text-[13px] text-[#99F6E4]">Certificate of Completion</p>
              </div>
            </div>
            <p className="text-[13px] text-[#CCFBF1] leading-[1.5]">
              Official completion certificate. Recognised by Portuguese authorities for citizenship applications.
            </p>
            <div className="flex items-center gap-1.5 mt-auto">
              <CircleCheck className="w-[13px] h-[13px] text-white shrink-0" />
              <span className="text-xs font-medium text-white">Issued by Centro Qualifica</span>
            </div>
          </div>
        </div>
        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`rounded-full transition-all ${i === activeDocCard ? "w-2 h-2 bg-[#E85D26]" : "w-1.5 h-1.5 bg-[#CBD5E1]"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Course Programme Section
   ────────────────────────────────────────────── */
const modules = [
  { num: "1", title: "Module 1 — A1 Consolidation", meta: "3 lessons · 9 hours · Weeks 1–3", pills: [{ label: "Review", color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" }, { label: "Grammar", color: "text-[#2563EB]", bg: "bg-[#EFF6FF]" }], accent: false },
  { num: "2", title: "Module 2 — Expanding Communication (A1+)", meta: "4 lessons · 12 hours · Weeks 4–7", pills: [{ label: "Vocabulary", color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" }, { label: "Conversation", color: "text-[#2563EB]", bg: "bg-[#EFF6FF]" }], accent: false },
  { num: "3", title: "Module 3 — Advanced Everyday Contexts (A2)", meta: "2 lessons · 6 hours · Weeks 6–7", pills: [{ label: "Daily life", color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" }, { label: "Culture", color: "text-[#2563EB]", bg: "bg-[#EFF6FF]" }], accent: false },
  { num: "4", title: "Module 4 — Social & Professional Portuguese (A2)", meta: "2 lessons · 6 hours · Weeks 6–7", pills: [{ label: "Professional", color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" }, { label: "Social", color: "text-[#2563EB]", bg: "bg-[#EFF6FF]" }], accent: false },
  { num: "5", title: "Module 5 — Exam Preparation & PLA Certificate (A2)", meta: "2 lessons · 6 hours · Week 8", pills: [{ label: "Mock exam", color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" }, { label: "Final prep", color: "text-[#E85D26]", bg: "bg-[#FFF7ED]" }], accent: true },
];

const mobileModules = [
  { num: "1", title: "A1 Consolidation", meta: "2 lessons · Weeks 1–2", accent: false },
  { num: "2", title: "Expanding Communication (A1+)", meta: "2 lessons · Weeks 3–4", accent: false },
  { num: "3", title: "Advanced Everyday Contexts (A2)", meta: "2 lessons · Weeks 5–6", accent: false },
  { num: "4", title: "Social & Professional Portuguese (A2)", meta: "2 lessons · Weeks 7–8", accent: false },
  { num: "5", title: "Exam Prep & PLA Certificate (A2)", meta: "2 lessons · Weeks 9–10", accent: true },
];

function ProgrammeSection() {
  return (
    <section id="programme" className="bg-white py-8 px-5 lg:py-20 lg:px-[120px]">
      {/* ── Desktop ── */}
      <div className="hidden lg:block">
        <div className="flex flex-row gap-20 max-w-[1200px] mx-auto">
          {/* Left sidebar */}
          <div className="flex flex-col gap-6 w-[360px] shrink-0">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold tracking-[0.8px] text-[#1B8A7E]">WHAT YOU&apos;LL LEARN</span>
              <h2 className="text-[36px] font-bold leading-[1.2] text-[#1E293B]">Course Programme</h2>
              <p className="text-[15px] text-[#64748B] leading-[1.6]">
                10 lessons across 3 modules. Each lesson is 3 hours — live, online, with homework and feedback.
              </p>
            </div>
            {/* Stats */}
            <div className="flex flex-col gap-3">
              {[
                { icon: Timer, text: "75 academic hours total" },
                { icon: Calendar, text: "2 months · Mon & Thu, 19:00–22:00" },
                { icon: Users, text: "Max 20 students per group" },
              ].map((s) => (
                <div key={s.text} className="flex items-center gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] px-4 py-3.5">
                  <s.icon className="w-[18px] h-[18px] text-[#1B8A7E]" />
                  <span className="text-sm font-semibold text-[#1E293B]">{s.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Modules */}
          <div className="flex flex-col gap-3 flex-1">
            {modules.map((m) => (
              <div key={m.num} className="bg-white border border-[#E2E8F0] rounded-xl">
                <div className="flex items-center gap-4 px-5 p-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-bold text-white ${m.accent ? "bg-[#E85D26]" : "bg-[#0F766E]"}`}>
                    {m.num}
                  </div>
                  <div className="flex-1">
                    <p className="text-[15px] font-bold text-[#1E293B]">{m.title}</p>
                    <p className="text-[13px] text-[#64748B]">{m.meta}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {m.pills.map((p) => (
                      <span key={p.label} className={`${p.bg} ${p.color} text-[11px] font-semibold rounded-full px-2.5 py-1`}>{p.label}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="lg:hidden flex flex-col gap-5 max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold tracking-[0.8px] text-[#1B8A7E]">WHAT YOU&apos;LL LEARN</span>
          <h2 className="text-[24px] font-bold leading-[1.2] text-[#1E293B]">Course Programme</h2>
          <p className="text-[13px] text-[#64748B]">
            5 modules · 75 hours · Live online classes
          </p>
        </div>
        {/* Stats — horizontal row */}
        <StatsFlip />
        {/* Module list */}
        <div className="flex flex-col gap-2">
          {mobileModules.map((m) => (
            <div key={m.num} className={`rounded-[10px] border ${m.accent ? "bg-[#FFF7ED] border-[#FED7AA]" : "bg-white border-[#E2E8F0]"}`}>
              <div className="flex items-center gap-3 px-4 py-3.5">
                <div className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold text-white ${m.accent ? "bg-[#E85D26]" : "bg-[#0F766E]"}`}>
                  {m.num}
                </div>
                <div className="flex flex-col gap-0.5 flex-1">
                  <p className="text-[13px] font-bold text-[#1E293B]">{m.title}</p>
                  <p className="text-[11px] text-[#64748B]">{m.meta}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Schedule Section
   ────────────────────────────────────────────── */
const scheduleBadges = [
  { label: "Duration", value: "2 months" },
  { label: "Schedule", value: "Mon, Thu · 19–22" },
  { label: "Total Hours", value: "75h" },
  { label: "Format", value: "Online (Zoom)" },
  { label: "Homework", value: "Daily, reviewed by teachers" },
  { label: "Communication", value: "WhatsApp group" },
];

/* Calendar data: startDay (0=Mon), daysInMonth, class days (Tue/Thu/Sat = schedule) */
const calendarMonths: { name: string; startDay: number; days: number; classDays: number[] }[] = [
  { name: "May", startDay: 4, days: 31, classDays: [4,7,11,14,18,21,25,28] },
  { name: "June", startDay: 0, days: 30, classDays: [1,4,8,11,15,18,22,25,29] },
  { name: "July", startDay: 2, days: 31, classDays: [2,6,9,13,16,20,23,27,30] },
];

function ScheduleSection() {
  const [activeMonth, setActiveMonth] = useState(0);
  const month = calendarMonths[activeMonth];

  return (
    <section id="schedule" className="bg-white py-8 px-5 lg:py-20 lg:px-[120px]">
      {/* ── Desktop ── */}
      <div className="hidden lg:flex flex-row gap-10 max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-6 w-[320px] shrink-0">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-[1.5px] text-[#1B8A7E]">CLASS SCHEDULE</span>
            <h2 className="text-[32px] font-bold text-[#1E293B]">May · July 2026</h2>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#1B8A7E]" />
              <span className="text-sm text-[#475569]">473 students completed this course</span>
            </div>
            <a href="https://api.whatsapp.com/send/?phone=351923296007&text=Hello%21+I%27d+like+to+learn+more+about+your+Portuguese+language+courses.&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-12 bg-[#E85D26] rounded-lg text-[15px] font-semibold text-white">
              Book a Free Consultation
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 w-[240px] shrink-0">
          {scheduleBadges.map((b) => (
            <div key={b.label} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] px-4 py-3 flex flex-col items-start">
              <p className="text-[11px] font-semibold tracking-[0.5px] text-[#94A3B8]">{b.label}</p>
              <p className="text-[15px] font-semibold text-[#1E293B]">{b.value}</p>
            </div>
          ))}
        </div>
        <div className="flex-1 bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="px-6 pt-5 pb-4 flex flex-col gap-3">
            <p className="text-lg font-bold text-[#1E293B]">{month.name} 2026</p>
            <div className="flex items-center gap-1.5">
              {calendarMonths.map((m, i) => (
                <button key={m.name} onClick={() => setActiveMonth(i)} className={`text-xs font-semibold rounded-full px-3.5 py-1.5 transition-colors ${i === activeMonth ? "bg-[#E85D26] text-white" : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"}`}>{m.name}</button>
              ))}
            </div>
          </div>
          <div className="px-4 pb-5">
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-[#94A3B8] mb-2">
              {["Mo","Tu","We","Th","Fr","Sa","Su"].map((d) => (<span key={d}>{d}</span>))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {[...Array(month.startDay)].map((_, i) => (<div key={`empty-${i}`} className="h-10" />))}
              {[...Array(month.days)].map((_, i) => {
                const day = i + 1;
                const isClassDay = month.classDays.includes(day);
                const dayOfWeek = (month.startDay + i) % 7;
                const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;
                return (<div key={day} className={`h-10 flex items-center justify-center rounded-lg ${isClassDay ? "bg-[#ECFDF5] text-[#0F766E] font-semibold" : isWeekend ? "text-[#CBD5E1]" : "text-[#475569]"}`}>{day}</div>);
              })}
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-t border-[#F1F5F9]">
            <span className="text-xs text-[#94A3B8]">ℹ Spot availability and exact schedule — please confirm with your coordinator</span>
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="lg:hidden flex flex-col gap-5 max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold tracking-[0.8px] text-[#1B8A7E]">CLASS SCHEDULE</span>
          <h2 className="text-[26px] font-bold text-[#1E293B]">May · July 2026</h2>
        </div>
        {/* Badges */}
        <div className="flex flex-col gap-2">
          {scheduleBadges.map((b) => (
            <div key={b.label} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] px-4 py-3 flex items-center gap-3">
              <p className="text-[11px] font-semibold tracking-[0.5px] text-[#94A3B8] w-[120px] shrink-0">{b.label}</p>
              <p className="text-[15px] font-semibold text-[#1E293B]">{b.value}</p>
            </div>
          ))}
        </div>
        {/* Calendar */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="px-5 pt-5 pb-4 flex flex-col gap-3">
            <p className="text-lg font-bold text-[#1E293B]">{month.name} 2026</p>
            <div className="flex items-center gap-1.5">
              {calendarMonths.map((m, i) => (
                <button key={m.name} onClick={() => setActiveMonth(i)} className={`text-xs font-semibold rounded-full px-4 py-1.5 transition-colors ${i === activeMonth ? "bg-[#E85D26] text-white" : "bg-[#F1F5F9] text-[#475569]"}`}>{m.name}</button>
              ))}
            </div>
          </div>
          <div className="px-4 pb-5">
            <div className="grid grid-cols-7 gap-0.5 text-center mb-2">
              {["Mo","Tu","We","Th","Fr","Sa","Su"].map((d, i) => (
                <span key={d} className={`text-[11px] font-semibold h-6 flex items-center justify-center ${i >= 5 ? "text-[#CBD5E1]" : "text-[#94A3B8]"}`}>{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-0.5 text-center text-sm">
              {[...Array(month.startDay)].map((_, i) => (<div key={`empty-${i}`} className="h-10" />))}
              {[...Array(month.days)].map((_, i) => {
                const day = i + 1;
                const isClassDay = month.classDays.includes(day);
                const dayOfWeek = (month.startDay + i) % 7;
                const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;
                return (<div key={day} className={`h-10 flex items-center justify-center rounded-md ${isClassDay ? "bg-[#EEF9F7] text-[#0F766E] font-semibold" : isWeekend ? "text-[#CBD5E1]" : "text-[#475569]"}`}>{day}</div>);
              })}
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-4 py-2.5">
            <Info className="w-[13px] h-[13px] text-[#94A3B8] shrink-0" />
            <span className="text-xs text-[#94A3B8] leading-[1.5]">Spot availability and exact schedule — please confirm with your coordinator</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Attendance Section
   ────────────────────────────────────────────── */
function AttendanceSection() {
  return (
    <section id="attendance" className="bg-[#F8FAFC]">
      {/* ── Desktop ── */}
      <div className="hidden lg:block py-20 px-[120px]">
        <div className="flex flex-row gap-20 max-w-[1200px] mx-auto items-center">
          <div className="flex flex-col gap-3 w-[400px] shrink-0">
            <TriangleAlert className="w-6 h-6 text-[#E85D26]" />
            <h2 className="text-[28px] font-bold text-[#1E293B]">Attendance Policy</h2>
            <p className="text-sm text-[#64748B] leading-[1.5] max-w-[360px]">
              We understand life is unpredictable — our policy is designed to support you.
            </p>
          </div>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex-1 overflow-hidden">
            {[
              { icon: CalendarCheck, iconColor: "text-[#1B8A7E]", iconBg: "bg-[#ECFDF5]", title: "Up to 3 absences", sub: "No penalty, no questions asked" },
              { icon: BookOpenCheck, iconColor: "text-[#E85D26]", iconBg: "bg-[#FFF7ED]", title: "Extra absences covered", sub: "Complete assigned homework to stay on track" },
              { icon: MessageCircle, iconColor: "text-[#3B82F6]", iconBg: "bg-[#EFF6FF]", title: "Just let us know", sub: "Notify your teacher via WhatsApp with a reason" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3.5 px-6 py-[18px]">
                <div className={`w-9 h-9 rounded-lg ${item.iconBg} flex items-center justify-center shrink-0`}>
                  <item.icon className={`w-[18px] h-[18px] ${item.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E293B]">{item.title}</p>
                  <p className="text-[13px] text-[#64748B]">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="lg:hidden py-8 px-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <TriangleAlert className="w-6 h-6 text-[#E85D26]" />
            <h2 className="text-[28px] font-bold text-[#1E293B]">Attendance Policy</h2>
            <p className="text-sm text-[#64748B] leading-[1.5]">
              We understand life is unpredictable — our policy is designed to support you.
            </p>
          </div>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl overflow-hidden">
            <div className="flex items-center gap-3.5 px-6 py-[18px]">
              <div className="w-10 h-10 rounded-[10px] bg-[#CCFBF1] flex items-center justify-center shrink-0">
                <CalendarCheck className="w-[18px] h-[18px] text-[#1B8A7E]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold text-[#1E293B]">Up to 3 absences</p>
                <p className="text-[13px] text-[#64748B]">No penalty, no questions asked</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5 px-6 py-[18px]">
              <div className="w-9 h-9 rounded-lg bg-[#FFF7ED] flex items-center justify-center shrink-0">
                <BookOpenCheck className="w-[18px] h-[18px] text-[#E85D26]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold text-[#1E293B]">Extra absences covered</p>
                <p className="text-[13px] text-[#64748B]">Complete assigned homework to stay on track</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5 px-6 py-[18px]">
              <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] flex items-center justify-center shrink-0">
                <MessageCircle className="w-[18px] h-[18px] text-[#3B82F6]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold text-[#1E293B]">Just let us know</p>
                <p className="text-[13px] text-[#64748B]">Notify your teacher via WhatsApp with a reason</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5 px-6 py-[18px]">
              <div className="w-9 h-9 rounded-lg bg-[#F0FDF4] flex items-center justify-center shrink-0">
                <RefreshCw className="w-[18px] h-[18px] text-[#16A34A]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold text-[#1E293B]">Make-up sessions available</p>
                <p className="text-[13px] text-[#64748B]">Request a catch-up class anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Certification Section
   ────────────────────────────────────────────── */
function CertificationSection() {
  return (
    <section id="certificate" className="bg-white">
      {/* ── Desktop ── */}
      <div className="hidden lg:block py-20 px-[120px]">
        <div className="flex flex-row gap-20 max-w-[1200px] mx-auto items-center">
          <div className="flex flex-col gap-3 w-[400px] shrink-0">
            <Award className="w-6 h-6 text-[#E85D26]" />
            <h2 className="text-[28px] font-bold text-[#1E293B]">Certification</h2>
            <p className="text-sm text-[#64748B] leading-[1.5] max-w-[360px]">
              Your proof of progress — recognised where it matters most.
            </p>
          </div>
          <div className="bg-[#F0FDFA] border-[1.5px] border-[#99F6E4] rounded-xl flex-1 overflow-hidden">
            <div className="flex items-center gap-3.5 px-6 py-5">
              <div className="w-10 h-10 rounded-[10px] bg-[#CCFBF1] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-[#0F766E]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0F766E]">PLA certificate</p>
                <p className="text-[13px] text-[#475569]">Issued in partnership with Centro Qualifica within 2 weeks</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5 px-6 py-5">
              <div className="w-10 h-10 rounded-[10px] bg-[#CCFBF1] flex items-center justify-center shrink-0">
                <Landmark className="w-5 h-5 text-[#0F766E]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0F766E]">Accepted for citizenship & residency</p>
                <p className="text-[13px] text-[#475569]">Valid for applying for Portuguese citizenship and permanent residence</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-[#CCFBF1] px-6 py-4 rounded-b-xl">
              <Users className="w-4 h-4 text-[#0F766E]" />
              <span className="text-[13px] font-medium text-[#0F766E]">473 students have already received their certificate</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="lg:hidden py-8 px-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <h2 className="text-[28px] font-bold text-[#1E293B]">Certification</h2>
            <p className="text-sm text-[#64748B] leading-[1.5]">
              Your proof of progress — recognised where it matters most.
            </p>
          </div>
          <div className="bg-[#F0FDFA] border-[1.5px] border-[#99F6E4] rounded-xl overflow-hidden">
            <div className="flex items-center gap-3.5 px-6 py-5">
              <div className="w-10 h-10 rounded-[10px] bg-[#CCFBF1] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-[#0F766E]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold text-[#0F766E]">PLA certificate</p>
                <p className="text-[13px] text-[#475569]">Issued in partnership with Centro Qualifica within 2 weeks</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5 px-6 py-5">
              <div className="w-10 h-10 rounded-[10px] bg-[#CCFBF1] flex items-center justify-center shrink-0">
                <Landmark className="w-5 h-5 text-[#0F766E]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold text-[#0F766E]">Accepted for citizenship & residency</p>
                <p className="text-[13px] text-[#475569]">Valid for applying for Portuguese citizenship and permanent residence</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-[#CCFBF1] px-6 py-4 rounded-b-xl">
              <Users className="w-4 h-4 text-[#0F766E]" />
              <span className="text-[13px] font-medium text-[#0F766E]">473 students have already received their certificate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Required Documents Section
   ────────────────────────────────────────────── */
const requiredDocs = [
  { icon: CircleCheck, title: "Passport copy", sub: "Any valid passport", optional: false },
  { icon: CircleCheck, title: "Residence card", sub: "Both sides on one page", optional: false },
  { icon: CircleCheck, title: "NIF (tax number)", sub: "Your Portuguese tax identification number", optional: false },
  { icon: CircleCheck, title: "Email + WhatsApp number", sub: "For enrollment confirmation and class updates", optional: false },
  { icon: CircleDashed, title: "Employment info — optional", sub: "IEFP declaration if unemployed", optional: true },
];

function RequiredDocsSection() {
  return (
    <section id="documents" className="bg-[#F8FAFC]">
      {/* ── Desktop ── */}
      <div className="hidden lg:block py-20 px-[120px]">
        <div className="flex flex-row gap-20 max-w-[1200px] mx-auto items-start">
          <div className="flex flex-col gap-3 w-[400px] shrink-0">
            <FileText className="w-6 h-6 text-[#E85D26]" />
            <h2 className="text-[28px] font-bold text-[#1E293B]">Required Documents</h2>
            <p className="text-[15px] text-[#64748B]">Prepare these before enrolling</p>
            <div className="flex items-center gap-2 bg-[#F0FDF4] rounded-lg px-3 py-2">
              <Clock3 className="w-3.5 h-3.5 text-[#16A34A]" />
              <span className="text-xs font-semibold text-[#16A34A]">Takes 5 minutes to prepare</span>
            </div>
          </div>
          <div className="bg-white border border-[#E2E8F0] rounded-xl flex-1 overflow-hidden">
            {requiredDocs.map((doc) => (
              <div key={doc.title} className={`flex items-center gap-3 px-5 py-3.5 ${doc.optional ? "bg-[#FAFAFA]" : ""}`}>
                <doc.icon className={`w-4 h-4 shrink-0 ${doc.optional ? "text-[#94A3B8]" : "text-[#1B8A7E]"}`} />
                <div>
                  <p className={`text-sm font-medium ${doc.optional ? "text-[#64748B]" : "text-[#1E293B]"}`}>{doc.title}</p>
                  <p className="text-xs text-[#94A3B8]">{doc.sub}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2.5 bg-[#F8FAFC] px-5 py-3.5 rounded-b-xl">
              <HandHelping className="w-[15px] h-[15px] text-[#1B8A7E]" />
              <span className="text-[13px] font-medium text-[#1B8A7E]">We help you prepare everything at enrollment — no stress.</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="lg:hidden py-8 px-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <h2 className="text-[28px] font-bold text-[#1E293B]">Required Documents</h2>
            <p className="text-[15px] text-[#64748B]">Prepare these before enrolling</p>
          </div>
          <div className="flex items-center gap-2 bg-[#F0FDF4] rounded-lg px-3 py-2.5">
            <Clock3 className="w-4 h-4 text-[#16A34A]" />
            <span className="text-xs font-semibold text-[#16A34A]">Takes 5 minutes to prepare</span>
          </div>
          <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
            {requiredDocs.map((doc) => (
              <div key={doc.title} className={`flex items-center gap-3 px-5 py-3.5 ${doc.optional ? "bg-[#FAFAFA]" : ""}`}>
                <doc.icon className={`w-4 h-4 shrink-0 ${doc.optional ? "text-[#94A3B8]" : "text-[#1B8A7E]"}`} />
                <div className="flex flex-col gap-[1px]">
                  <p className={`text-sm font-medium ${doc.optional ? "text-[#64748B]" : "text-[#1E293B]"}`}>{doc.title}</p>
                  <p className="text-xs text-[#94A3B8]">{doc.sub}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2.5 bg-[#F8FAFC] px-5 py-3.5 rounded-b-xl">
              <HandHelping className="w-[15px] h-[15px] text-[#1B8A7E]" />
              <span className="text-[13px] font-medium text-[#1B8A7E]">We help you prepare everything at enrollment — no stress.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Instructor Section
   ────────────────────────────────────────────── */
function InstructorSection() {
  return (
    <section id="instructor" className="bg-white py-6 px-5 lg:py-20 lg:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        {/* ── Desktop ── */}
        <div className="hidden lg:flex flex-col gap-8">
          <h2 className="text-[28px] font-bold text-[#1E293B]">Instructor</h2>
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-9">
            <div className="flex items-center gap-8">
              <div className="w-[88px] h-[88px] rounded-full bg-[#E2E8F0] shrink-0 overflow-hidden">
                <img src="/images/instructor.png" alt="Instructor" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <p className="text-[23px] font-bold text-[#1E293B]">Ana Silva</p>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="bg-[#F0FDF4] text-[#16A34A] text-xs font-semibold rounded-full px-2.5 py-1.5 flex items-center gap-1.5"><Star className="w-3 h-3" />4.9 rating</span>
                  <span className="bg-[#EFF6FF] text-[#3B82F6] text-xs font-semibold rounded-full px-2.5 py-1.5 flex items-center gap-1.5"><Users className="w-3 h-3" />500+ students</span>
                  <span className="bg-[#FFF7ED] text-[#E85D26] text-xs font-semibold rounded-full px-2.5 py-1.5 flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" />DGERT certified</span>
                </div>
                <p className="text-sm text-[#64748B]">MA in Portuguese Language & Literature · DGERT-certified instructor</p>
                <p className="text-sm text-[#475569] leading-[1.6]">
                  Native Portuguese speaker with 10+ years of teaching experience. Specialized in teaching Portuguese to foreign students — from A0 absolute beginners to C1 advanced. Known for her patient, structured approach and deep understanding of what international residents in Portugal actually need.
                </p>
              </div>
            </div>
            <div className="bg-[#F8FAFC] rounded-[10px] p-5 mt-8 flex flex-col gap-3">
              <p className="text-sm text-[#475569] leading-[1.6] italic">
                &ldquo;My goal is simple — to help you feel confident in Portuguese so you can build your life in Portugal with ease.&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <Quote className="w-3.5 h-3.5 text-[#1B8A7E]" />
                <span className="text-xs font-medium text-[#1B8A7E]">Ana Silva, Lead Instructor</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile ── */}
        <div className="lg:hidden flex flex-col gap-4">
          <h2 className="text-[23px] font-bold text-[#0F172A]">Instructor</h2>
          {/* Profile row */}
          <div className="flex items-center gap-3">
            <div className="w-[72px] h-[72px] rounded-full shrink-0 overflow-hidden">
              <img src="/images/instructor.png" alt="Instructor" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[15px] font-bold text-[#0F172A]">Ana Silva</p>
              <p className="text-[11px] text-[#64748B] leading-[1.4]">MA in Portuguese Language & Literature · DGERT-certified instructor</p>
            </div>
          </div>
          {/* Bio */}
          <p className="text-[13px] text-[#475569] leading-[1.5]">
            Native Portuguese speaker with 10+ years of teaching experience. Specialized in teaching Portuguese to foreign students — from A0 absolute beginners to C1 advanced. Known for her patient, structured approach and deep understanding of what international residents in Portugal actually need.
          </p>
          {/* Badges */}
          <div className="flex items-center gap-1.5">
            <span className="bg-[#F0FDF4] text-[#16A34A] text-[10px] font-semibold rounded-full px-2 py-1 flex items-center gap-1"><Star className="w-2.5 h-2.5" />4.9 rating</span>
            <span className="bg-[#EFF6FF] text-[#3B82F6] text-[10px] font-semibold rounded-full px-2 py-1 flex items-center gap-1"><Users className="w-2.5 h-2.5" />500+ students</span>
            <span className="bg-[#FFF7ED] text-[#E85D26] text-[10px] font-semibold rounded-full px-2 py-1 flex items-center gap-1"><ShieldCheck className="w-2.5 h-2.5" />DGERT certified</span>
          </div>
          {/* Quote */}
          <div className="bg-[#F0FDF4] rounded-[10px] p-4 flex flex-col gap-1.5">
            <p className="text-xs text-[#1E3A2F] leading-[1.5]">
              &ldquo;My goal is simple — to help you feel confident in Portuguese so you can build your life in Portugal with ease.&rdquo;
            </p>
            <div className="flex items-center gap-1.5">
              <Quote className="w-3 h-3 text-[#1B8A7E]" />
              <span className="text-[11px] font-medium text-[#1B8A7E]">Ana Silva, Lead Instructor</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Testimonials Section
   ────────────────────────────────────────────── */
const testimonials = [
  {
    quote: "I passed the A2 exam on the first try. The structure was clear from day one — I always knew what to expect and what was coming next.",
    name: "Mariana Costa",
    badge: "A2 Certified",
    date: "Enrolled March 2025",
    avatar: "/images/testimonial1.png",
    imgStyle: { objectPosition: "50% 50%" } as React.CSSProperties,
  },
  {
    quote: "Within a week of getting my certificate, I submitted my SEF application. The document was accepted immediately — no questions asked.",
    name: "Dmitri Volkov",
    badge: "A2 Certified",
    date: "Enrolled January 2025",
    avatar: "/images/testimonial2.jpg",
    imgStyle: {} as React.CSSProperties,
  },
  {
    quote: "Ana explains grammar in a way that finally makes sense. I went from zero Portuguese to holding full conversations in 5 months. I only wish I had started sooner.",
    name: "Sophie Müller",
    badge: "A2 Certified",
    date: "Enrolled October 2024",
    avatar: "/images/testimonial3.png",
    imgStyle: { objectPosition: "50% 20%" } as React.CSSProperties,
  },
];

function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / (el.scrollWidth / testimonials.length));
      setActiveCard(Math.min(idx, testimonials.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="reviews" className="bg-[#F8FAFC] py-8 lg:py-20 lg:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-5 lg:gap-12">

        {/* ── Mobile ── */}
        <div className="lg:hidden flex flex-col gap-5 px-5">
          {/* Header */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold tracking-[0.8px] text-[#1B8A7E]">STUDENT STORIES</span>
            <h2 className="text-[23px] font-bold leading-[1.2] text-[#1E293B]">Real results from real students</h2>
            <p className="text-[13px] text-[#64748B]">473 graduates. Each one with a story worth sharing.</p>
          </div>
        </div>

        {/* Scroll cards — mobile */}
        <div
          ref={scrollRef}
          className="lg:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-5"
          style={{ scrollPaddingLeft: "20px" }}
        >
          {testimonials.map((t) => (
            <div key={t.name} className="w-[300px] min-w-[300px] snap-start shrink-0 bg-white border border-[#E2E8F0] rounded-2xl p-5 flex flex-col gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                ))}
              </div>
              <p className="text-[13px] text-[#1E293B] leading-[1.6]">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-2.5 mt-auto">
                {t.avatar ? (
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover object-top shrink-0" style={t.imgStyle} />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E85D26] to-[#1B8A7E] flex items-center justify-center text-xs font-bold text-white shrink-0">
                    {t.name[0]}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-[#1E293B]">{t.name}</span>
                    <span className="bg-[#F0FDF4] text-[#16A34A] text-[10px] font-semibold rounded-full px-1.5 py-0.5">{t.badge}</span>
                  </div>
                  <span className="text-[11px] text-[#64748B]">{t.date}</span>
                </div>
              </div>
            </div>
          ))}
          {/* Right padding spacer */}
          <div className="min-w-[20px] shrink-0" />
        </div>

        {/* Dots — mobile */}
        <div className="lg:hidden flex items-center justify-center gap-1.5">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${
                i === activeCard ? "w-2 h-2 bg-[#1B8A7E]" : "w-1.5 h-1.5 bg-[#CBD5E1]"
              }`}
            />
          ))}
        </div>

        {/* Stats bar — mobile */}
        <div className="lg:hidden mx-5 bg-white border border-[#E2E8F0] rounded-xl flex items-center justify-between px-5 py-4">
          <div className="flex flex-col items-center gap-0.5">
            <p className="text-[15px] font-bold text-[#1E293B]">5.0</p>
            <p className="text-[11px] text-[#64748B]">Rating</p>
          </div>
          <div className="w-px h-8 bg-[#E2E8F0]" />
          <div className="flex flex-col items-center gap-0.5">
            <p className="text-[15px] font-bold text-[#1E293B]">473</p>
            <p className="text-[11px] text-[#64748B]">Graduates</p>
          </div>
          <div className="w-px h-8 bg-[#E2E8F0]" />
          <div className="flex flex-col items-center gap-0.5">
            <p className="text-[15px] font-bold text-[#1E293B]">100%</p>
            <p className="text-[11px] text-[#64748B]">Official docs</p>
          </div>
        </div>

        {/* ── Desktop ── */}
        <div className="hidden lg:flex flex-col gap-12 px-5 lg:px-0">
          {/* Header */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold tracking-[0.8px] text-[#1B8A7E]">STUDENT STORIES</span>
            <h2 className="text-[36px] font-bold text-[#1E293B] text-center">Real results from real students</h2>
            <p className="text-base text-[#64748B] text-center">473 graduates. Each one with a story worth sharing.</p>
          </div>

          {/* Cards */}
          <div className="flex gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="flex-1 bg-white border border-[#E2E8F0] rounded-2xl p-7 flex flex-col gap-5">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                  ))}
                </div>
                <p className="text-[15px] text-[#1E293B] leading-[1.6]">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 mt-auto">
                  {t.avatar ? (
                    <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover object-top shrink-0" style={t.imgStyle} />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#E85D26] to-[#1B8A7E] flex items-center justify-center text-sm font-bold text-white shrink-0">
                      {t.name[0]}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#1E293B]">{t.name}</span>
                      <span className="bg-[#F0FDF4] text-[#16A34A] text-[11px] font-semibold rounded-full px-2 py-0.5">{t.badge}</span>
                    </div>
                    <span className="text-xs text-[#64748B]">{t.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl flex items-center justify-center gap-10 px-10 py-6">
            <div className="flex items-center gap-2.5">
              <Star className="w-5 h-5 text-[#F59E0B]" />
              <div>
                <p className="text-base font-bold text-[#1E293B]">5.0</p>
                <p className="text-xs text-[#64748B]">Average rating</p>
              </div>
            </div>
            <div className="w-px h-10 bg-[#E2E8F0]" />
            <div className="flex items-center gap-2.5">
              <Users className="w-5 h-5 text-[#1B8A7E]" />
              <div>
                <p className="text-base font-bold text-[#1E293B]">473 graduates</p>
                <p className="text-xs text-[#64748B]">Successfully certified</p>
              </div>
            </div>
            <div className="w-px h-10 bg-[#E2E8F0]" />
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#E85D26]" />
              <div>
                <p className="text-base font-bold text-[#1E293B]">100% official</p>
                <p className="text-xs text-[#64748B]">Documents accepted by authorities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   FAQ Section
   ────────────────────────────────────────────── */
const faqs = [
  { q: "Do I need any prior knowledge of Portuguese?", a: "No. This course starts from absolute zero (A0). The only requirement is a desire to learn and a stable internet connection." },
  { q: "Is the A2 certificate recognised for residency and citizenship?", a: "Yes. The certificate is issued in partnership with Centro Qualifica and is accepted by SEF, AIMA, and Portuguese embassies worldwide." },
  { q: "What happens if I miss a class?", a: "Up to 3 absences are allowed. If you notify your teacher via WhatsApp in advance, the absence is covered. All lessons are recorded." },
  { q: "What is included in the €470 price?", a: "150 hours of live lessons, course materials, homework review, the official A2 exam, and all three certificates. No hidden fees." },
  { q: "Can I pay in instalments?", a: "Yes. We offer payment via Klarna — split into 3 interest-free monthly payments. You can also pay by bank transfer or Multibanco." },
  { q: "How quickly will I receive my certificate?", a: "The enrolment certificate is issued within 2 hours. The A2 completion certificate is issued within 3 weeks after the final exam." },
  { q: "Is the course online or in-person?", a: "Fully online via Zoom. You can join from anywhere in Portugal. The class size is max 20 students for live interaction." },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-[#F8FAFC] py-8 px-5 lg:py-20 lg:px-[120px]">

      {/* ── Mobile ── */}
      <div className="lg:hidden flex flex-col gap-4 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold tracking-[0.8px] text-[#1B8A7E]">FAQ</span>
          <h2 className="text-[23px] font-bold text-[#1E293B]">Common questions</h2>
        </div>

        {/* FAQ list card */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
          {faqs.map((faq, i) => (
            <div key={i}>
              {i > 0 && <div className="h-px bg-[#E2E8F0]" />}
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="flex items-center gap-3 w-full text-left p-4"
              >
                <span className="text-[13px] font-semibold text-[#1E293B] flex-1">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#94A3B8] shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              {openIndex === i && (
                <div className="px-4 pb-3.5">
                  <p className="text-[13px] text-[#64748B] leading-[1.5]">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* WhatsApp button */}
        <a href="https://api.whatsapp.com/send/?phone=351923296007&text=Hello%21+I%27d+like+to+learn+more+about+your+Portuguese+language+courses.&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-white border border-[#E2E8F0] rounded-lg py-3 px-5 w-full">
          <MessageCircle className="w-4 h-4 text-[#25D366]" />
          <span className="text-sm font-semibold text-[#1E293B]">Ask on WhatsApp</span>
        </a>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden lg:flex flex-row gap-20 max-w-[1200px] mx-auto">
        {/* Left */}
        <div className="flex flex-col gap-5 w-[360px] shrink-0">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold tracking-[0.8px] text-[#1B8A7E]">FAQ</span>
            <h2 className="text-[36px] font-bold leading-[1.2] text-[#1E293B]">Common questions</h2>
            <p className="text-[15px] text-[#64748B] leading-[1.6]">
              Can&apos;t find your answer? Write to us on WhatsApp — we reply within 1 hour.
            </p>
          </div>
          <a href="https://api.whatsapp.com/send/?phone=351923296007&text=Hello%21+I%27d+like+to+learn+more+about+your+Portuguese+language+courses.&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 h-12 bg-white border border-[#E2E8F0] rounded-lg w-fit px-5">
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span className="text-sm font-semibold text-[#1E293B]">Ask on WhatsApp</span>
          </a>
        </div>

        {/* Right */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl flex-1 overflow-hidden">
          {faqs.map((faq, i) => (
            <div key={i}>
              {i > 0 && <div className="h-px bg-[#E2E8F0]" />}
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="flex items-center gap-4 w-full text-left px-6 py-5"
              >
                <span className="text-[15px] font-semibold text-[#1E293B] flex-1">{faq.q}</span>
                <ChevronDown className={`w-[18px] h-[18px] text-[#94A3B8] transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-[#64748B] leading-[1.6]">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   CTA Section
   ────────────────────────────────────────────── */
function CTASection() {
  const form = useLeadForm("A1-A2 Course");
  return (
    <section id="enrol" className="bg-white py-12 px-5 lg:bg-[#F8FAFC] lg:py-20 lg:px-[120px]">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-4 lg:gap-6">
        <span className="text-[11px] lg:text-xs font-bold tracking-[2px] text-[#1B8A7E]">ENROL NOW</span>
        {/* Desktop heading */}
        <h2 className="hidden lg:block text-[44px] font-extrabold text-[#1E293B] text-center leading-[1.2] tracking-[-0.5px] max-w-[820px]">
          Start learning — get your enrolment certificate within 2 hours of signing up
        </h2>
        {/* Mobile heading */}
        <h2 className="lg:hidden text-[28px] font-extrabold text-[#1E293B] text-center leading-[1.2] tracking-[-0.5px]">
          Enrol and get certified in 2 months
        </h2>
        {/* Desktop meta */}
        <p className="hidden lg:block text-base text-[#64748B] text-center">
          Next group starts May 2 — 20 spots left
        </p>
        {/* Mobile meta */}
        <p className="lg:hidden text-sm text-[#64748B] text-center leading-[1.4]">
          Next group starts May 2 · June 2 · August 13{"\n"}— 20 spots left
        </p>
        {/* Form card */}
        <form onSubmit={form.handleSubmit} className="w-full max-w-[480px] bg-white rounded-[20px] border border-[#E2E8F0] shadow-[0_4px_24px_rgba(15,23,42,0.05)] p-6 lg:p-8 flex flex-col gap-3">
          {/* Name & Phone — stacked on mobile, side by side on desktop */}
          <div className="flex items-center gap-2.5 h-[52px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] px-4">
            <User className="w-4 h-4 text-[#94A3B8] shrink-0" />
            <input type="text" placeholder="Your name" value={form.name} onChange={(e) => form.setName(e.target.value)} className="bg-transparent text-sm text-[#1E293B] placeholder:text-[#9CA3AF] outline-none flex-1 min-w-0" />
          </div>
          <div className="flex items-center gap-2.5 h-[52px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] px-4">
            <Phone className="w-4 h-4 text-[#94A3B8] shrink-0" />
            <select value={form.countryCode} onChange={(e) => form.setCountryCode(e.target.value)} className="bg-transparent text-sm text-[#1E293B] outline-none shrink-0 appearance-none pr-1 cursor-pointer">
              {countryCodes.map((c) => (
                <option key={c.code} value={c.code}>{c.flag}{c.code}</option>
              ))}
            </select>
            <div className="w-px h-4 bg-[#E2E8F0] shrink-0" />
            <input type="tel" placeholder="WhatsApp or phone" value={form.phone} onChange={(e) => form.setPhone(e.target.value)} className="bg-transparent text-sm text-[#1E293B] placeholder:text-[#9CA3AF] outline-none flex-1 min-w-0" />
          </div>
          <div className="flex items-center gap-2.5 h-[52px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] px-4">
            <Mail className="w-4 h-4 text-[#94A3B8]" />
            <input type="email" placeholder="Email address" value={form.email} onChange={(e) => form.setEmail(e.target.value)} className="bg-transparent text-sm text-[#1E293B] placeholder:text-[#9CA3AF] outline-none flex-1" />
          </div>
          <button type="submit" disabled={form.status === "loading"} className="btn-pulse flex items-center justify-center h-[52px] bg-[#E85D26] rounded-full lg:rounded-lg text-[15px] font-bold text-white shadow-[0_2px_8px_rgba(232,93,38,0.19)] disabled:opacity-60">
            {form.status === "loading" ? "Sending..." : form.status === "success" ? "Sent ✓" : "Enrol Now"}
          </button>
          {form.status === "error" && (
            <p className="text-xs text-red-500 text-center">Something went wrong. Please try again.</p>
          )}
          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-[13px] h-[13px] text-[#64748B]" />
            <span className="text-xs text-[#64748B]">No spam · Official DGERT-licensed school</span>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Footer
   ────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#1E293B] pt-10 pb-8 px-5 lg:pt-14 lg:pb-10 lg:px-0">
      <div className="max-w-[1100px] mx-auto">
        {/* Desktop grid */}
        <div className="hidden lg:flex gap-10 justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-2.5 w-[320px]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-[6px] bg-[#1B8A7E] flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">OLA</span>
              </div>
              <span className="text-base font-bold text-white">Ola Facultet</span>
            </div>
            <span className="text-[13px] text-[#94A3B8]">Licensed Language School</span>
            <span className="text-[13px] text-[#64748B]">Av. da República 91, 4th floor, Lisbon, Portugal</span>
            <p className="text-[13px] text-[#64748B] leading-[1.6]">
              Official PLA language school. A2 Portuguese programme recognised by Portuguese authorities and embassies.
            </p>
            <div className="flex items-center gap-2">
              {[Instagram, MessageCircle, Send].map((Icon, i) => (
                <div key={i} className="w-9 h-9 rounded-lg bg-white/[0.07] border border-white/[0.08] flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#94A3B8]" />
                </div>
              ))}
            </div>
          </div>
          {/* Contacts */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-bold tracking-[1.5px] text-[#64748B]">CONTACTS</span>
            <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#64748B]" /><span className="text-sm text-[#E2E8F0]">+351 921 235 142</span></div>
            <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#64748B]" /><span className="text-sm text-[#1B8A7E]">+351 921 235 142</span></div>
            <a href="https://api.whatsapp.com/send/?phone=351923296007&text=Hello%21+I%27d+like+to+learn+more+about+your+Portuguese+language+courses.&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5 text-[#64748B]" /><span className="text-sm text-[#25D366]">WhatsApp: +351 923 296 007</span></a>
            <div className="flex items-center gap-1.5"><Timer className="w-3.5 h-3.5 text-[#64748B]" /><span className="text-[13px] text-[#64748B]">info@pla-escola.pt</span></div>
          </div>
          {/* Links */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-bold tracking-[1.5px] text-[#64748B]">QUICK LINKS</span>
            <span className="text-sm text-[#E2E8F0]">Courses & Pricing</span>
            <span className="text-sm text-[#E2E8F0]">Programme</span>
            <span className="text-sm text-[#E2E8F0]">FAQ</span>
            <span className="text-sm text-[#64748B]">Privacy Policy</span>
          </div>
          {/* Trust */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold tracking-[1.5px] text-[#64748B]">ACCREDITED BY</span>
            {[
              { icon: ShieldCheck, label: "Licensed School" },
              { icon: Award, label: "Centro Qualifica" },
              { icon: CircleCheck, label: "DGERT Recognised" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-lg px-3 py-2">
                <b.icon className="w-3.5 h-3.5 text-[#1B8A7E]" />
                <span className="text-xs font-semibold text-[#E2E8F0]">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile footer */}
        <div className="lg:hidden flex flex-col gap-6">
          {/* Top: Logo + tag + address + social */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-[#1B8A7E] flex items-center justify-center">
                <span className="text-[9px] font-bold text-white">OLA</span>
              </div>
              <span className="text-[15px] font-bold text-white">Ola Facultet</span>
            </div>
            <span className="text-xs text-[#94A3B8] leading-[1.4]">Licensed Language School</span>
            <span className="text-xs text-[#64748B]">Av. da República 91, 4th floor, Lisbon</span>
            <div className="flex items-center gap-2">
              {[Instagram, MessageCircle, Send].map((Icon, i) => (
                <div key={i} className="w-9 h-9 rounded-lg bg-white/[0.07] border border-white/[0.08] flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#94A3B8]" />
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#334155]" />

          {/* Links */}
          <div className="flex flex-col gap-3">
            <span className="text-[13px] text-[#E2E8F0]">Courses & Pricing</span>
            <span className="text-[13px] text-[#E2E8F0]">Programme</span>
            <span className="text-[13px] text-[#E2E8F0]">FAQ</span>
          </div>

          {/* Contacts */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-[#64748B]" /><span className="text-[13px] text-[#1B8A7E]">info@pla-escola.pt</span></div>
            <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#64748B]" /><span className="text-[13px] text-[#E2E8F0]">+351 921 235 142</span></div>
            <a href="https://api.whatsapp.com/send/?phone=351923296007&text=Hello%21+I%27d+like+to+learn+more+about+your+Portuguese+language+courses.&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2"><MessageCircle className="w-3.5 h-3.5 text-[#64748B]" /><span className="text-xs text-[#25D366]">WhatsApp: +351 923 296 007</span></a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold tracking-[1.5px] text-[#64748B]">ACCREDITED BY</span>
            {[
              { icon: ShieldCheck, label: "Licensed School" },
              { icon: Award, label: "Centro Qualifica" },
              { icon: CircleCheck, label: "DGERT Recognised" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-lg px-3 py-2">
                <b.icon className="w-3.5 h-3.5 text-[#1B8A7E]" />
                <span className="text-xs font-semibold text-[#E2E8F0]">{b.label}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-[#334155]" />

          {/* Terms */}
          <div className="flex items-center justify-center gap-4">
            <span className="text-[11px] text-[#64748B]">Terms of Use</span>
            <span className="text-[11px] text-[#64748B]">Privacy Policy</span>
            <span className="text-[11px] text-[#64748B]">Cookies</span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-[#64748B] text-center">© 2026 Facultet School · All rights reserved</p>
        </div>

        {/* Desktop bottom */}
        <div className="hidden lg:block">
          <div className="h-px bg-[#334155] mt-8" />
          <div className="flex items-center justify-between pt-6">
            <span className="text-xs text-[#64748B]">© 2026 Facultet School · All rights reserved</span>
            <span className="text-xs text-[#64748B]">Terms of Use · Privacy Policy · Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────
   Page
   ────────────────────────────────────────────── */
export default function CourseDetailPage() {
  return (
    <main>
      <NavBar />

      <HeroSection />
      <MobileSocialProof />
      <MobilePriceCard />
      <DocsSection />
      <ProgrammeSection />
      <ScheduleSection />
      <AttendanceSection />
      <CertificationSection />
      <RequiredDocsSection />
      <InstructorSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
