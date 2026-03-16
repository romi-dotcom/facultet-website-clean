import {
  Timer,
  Users,
  Video,
  MapPin,
  CalendarCheck,
  CirclePlay,
  Wifi,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Card {
  badge: { text: string; color: string; bg: string; border?: string };
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  title: string;
  subtitle: string;
  bodyDesktop: string;
  bodyMobile: string;
  divider: string;
  pill: { icon: LucideIcon; text: string; color: string; bg: string };
  cardBg: string;
  cardBorder: string;
  /* card4 uses gradient */
  gradient?: string;
  dark?: boolean;
}

const cards: Card[] = [
  {
    badge: { text: "SAVES TIME", color: "text-[#E85D26]", bg: "bg-[#FFF0EB]" },
    icon: Timer,
    iconColor: "text-[#E85D26]",
    iconBg: "bg-[#FFF0EB]",
    title: "Save 1–2 Hours Daily",
    subtitle: "No commute needed",
    bodyDesktop:
      "No commuting to school. When the lesson ends, you're already home. Especially important for those living outside Lisbon or Porto.",
    bodyMobile:
      "No commuting to school. When the lesson ends, you're already home.",
    divider: "bg-[#E2E8F0]",
    pill: { icon: Timer, text: "1–2 hours saved daily", color: "text-[#E85D26]", bg: "bg-[#FFF0EB]" },
    cardBg: "bg-white",
    cardBorder: "border-[#E2E8F0]",
  },
  {
    badge: { text: "FAMILY FRIENDLY", color: "text-[#3B82F6]", bg: "bg-[#EFF6FF]" },
    icon: Users,
    iconColor: "text-[#3B82F6]",
    iconBg: "bg-[#EFF6FF]",
    title: "Works Around Family Life",
    subtitle: "Your schedule, your pace",
    bodyDesktop:
      "Choose morning, afternoon or evening sessions. Drop a class when life gets busy and catch up with recordings. Learning fits into your life, not the other way around.",
    bodyMobile:
      "Choose morning, afternoon or evening sessions. Learning fits into your life, not the other way around.",
    divider: "bg-[#E2E8F0]",
    pill: { icon: CalendarCheck, text: "Flexible scheduling", color: "text-[#3B82F6]", bg: "bg-[#EFF6FF]" },
    cardBg: "bg-white",
    cardBorder: "border-[#E2E8F0]",
  },
  {
    badge: { text: "NEVER MISS A CLASS", color: "text-[#0F766E]", bg: "bg-[#CBEDE8]", border: "border border-[#1B8A7E]" },
    icon: Video,
    iconColor: "text-[#1B8A7E]",
    iconBg: "bg-[#F0FDF9] lg:bg-[#F0FDF9]",
    title: "All Lessons Recorded",
    subtitle: "Access 24/7, forever",
    bodyDesktop:
      "Miss a class? No problem. Every session is recorded and available in your personal account. Rewatch at 1.5× speed or pause and review the grammar rule again.",
    bodyMobile:
      "Miss a class? No problem. Every session is recorded. Rewatch at 1.5× speed anytime.",
    divider: "bg-[#99E6D8]",
    pill: { icon: CirclePlay, text: "Lifetime recording access", color: "text-[#0F766E]", bg: "bg-[#CBEDE8]" },
    cardBg: "bg-[#F0FDF9]",
    cardBorder: "border-[#E2E8F0]",
  },
  {
    badge: { text: "STUDY FROM ANYWHERE", color: "text-white", bg: "bg-white/15" },
    icon: MapPin,
    iconColor: "text-white",
    iconBg: "bg-white/15",
    title: "From Anywhere in Portugal",
    subtitle: "North to south — no big city needed",
    bodyDesktop:
      "Wherever you are in Portugal, all you need is a phone or laptop. No need to move to Lisbon or Porto just to learn Portuguese.",
    bodyMobile:
      "Wherever you are — all you need is a phone or laptop. No need to move to a big city.",
    divider: "bg-white/20",
    pill: { icon: Wifi, text: "Works on any device", color: "text-white", bg: "bg-white/15" },
    cardBg: "",
    cardBorder: "border-white/15",
    gradient: "bg-gradient-to-br from-[#1B8A7E] to-[#0D5C56]",
    dark: true,
  },
];

function WhyCard({ card }: { card: Card }) {
  const isDark = card.dark;
  return (
    <div
      className={`flex flex-col justify-between gap-3.5 rounded-2xl p-5 border shadow-[0_2px_12px_rgba(0,0,0,0.04)] shrink-0 w-[300px] h-[280px]
                  lg:w-auto lg:h-[280px] lg:gap-4 lg:rounded-[20px] lg:p-7 lg:shadow-[0_4px_24px_rgba(0,0,0,0.05)]
                  ${card.gradient || card.cardBg} ${card.cardBorder}`}
    >
      {/* Badge */}
      <span
        className={`inline-flex items-center self-start h-[26px] lg:h-7 rounded-full px-3 text-[10px] lg:text-[11px] font-bold tracking-[1.5px] ${card.badge.bg} ${card.badge.color} ${card.badge.border || ""}`}
      >
        {card.badge.text}
      </span>

      {/* Icon + Title */}
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-[10px] lg:rounded-xl flex items-center justify-center shrink-0 lg:w-11 lg:h-11 ${card.iconBg}`}
        >
          <card.icon className={`w-5 h-5 ${card.iconColor} lg:w-[22px] lg:h-[22px]`} />
        </div>
        <div className="flex flex-col gap-0.5">
          <span
            className={`text-base font-bold leading-[1.2] lg:text-[19px] ${isDark ? "text-white" : "text-[#1E293B]"}`}
          >
            {card.title}
          </span>
          <span
            className={`text-[13px] ${isDark ? "text-white/70" : "text-[#64748B]"}`}
          >
            {card.subtitle}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className={`h-px w-full ${card.divider}`} />

      {/* Body */}
      <p
        className={`text-sm leading-[1.6] flex-1 ${isDark ? "text-white/80" : "text-[#64748B]"}`}
      >
        <span className="lg:hidden">{card.bodyMobile}</span>
        <span className="hidden lg:inline">{card.bodyDesktop}</span>
      </p>

      {/* Pill */}
      <span
        className={`inline-flex items-center self-start gap-1.5 h-[26px] lg:h-7 rounded-full px-3 text-[11px] lg:text-xs font-semibold ${card.pill.bg} ${card.pill.color}`}
      >
        <card.pill.icon className="w-3 h-3 lg:w-[13px] lg:h-[13px]" />
        {card.pill.text}
      </span>
    </div>
  );
}

export default function WhyOnline() {
  return (
    <section className="bg-[#F8FAFC] py-12 lg:py-20">
      {/* Header */}
      <div className="flex flex-col items-center gap-[10px] px-5 lg:gap-3 lg:px-0">
        <span className="text-xs font-bold tracking-[2px] text-[#1B8A7E] uppercase lg:text-[13px]">
          ONLINE FORMAT
        </span>
        <h2 className="text-[28px] font-bold leading-[1.2] text-[#1E293B] text-center lg:text-[36px]">
          Why Our Students Choose Online
        </h2>
        <p className="text-[15px] text-[#64748B] text-center lg:text-lg lg:max-w-[600px]">
          <span className="lg:hidden">
            Study from anywhere — without interrupting your life.
          </span>
          <span className="hidden lg:inline">
            Study from Braga to Faro, from 7am to midnight — on your schedule.
          </span>
        </p>
      </div>

      {/* ── Desktop: 2×2 grid ── */}
      <div className="hidden lg:block max-w-[1120px] mx-auto mt-12">
        <div className="flex gap-6">
          {cards.slice(0, 2).map((c) => (
            <div key={c.title} className="flex-1">
              <WhyCard card={c} />
            </div>
          ))}
        </div>
        <div className="flex gap-6 mt-6">
          {cards.slice(2).map((c) => (
            <div key={c.title} className="flex-1">
              <WhyCard card={c} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: horizontal scroll ── */}
      <div className="lg:hidden mt-6">
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-1 px-5" style={{ scrollPaddingLeft: 20 }}>
          {cards.map((c) => (
            <div key={c.title} className="snap-start shrink-0">
              <WhyCard card={c} />
            </div>
          ))}
          <div className="min-w-[20px] shrink-0" />
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-6">
          <span className="w-2 h-2 rounded-full bg-[#1B8A7E]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1]" />
        </div>
      </div>
    </section>
  );
}
