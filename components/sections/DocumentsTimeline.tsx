import {
  FileText,
  ClipboardList,
  GraduationCap,
  Timer,
  Mail,
  BadgeCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface DocCard {
  badge: { text: string; bg: string; color: string };
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  bodyDesktop: string;
  bodyMobile: string;
  dividerColor: string;
  pill: { icon: LucideIcon; text: string; bg: string; color: string };
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
}

const cards: DocCard[] = [
  {
    badge: { text: "WITHIN 2 HOURS", bg: "bg-[#E8F5F3]", color: "text-[#1B8A7E]" },
    icon: FileText,
    iconBg: "bg-[#E8F5F3]",
    iconColor: "text-[#1B8A7E]",
    title: "Declaração de Matrícula",
    subtitle: "Matriculation Certificate",
    bodyDesktop:
      "Official proof of enrollment in a licensed language school. Required for your citizenship documents package immediately.",
    bodyMobile:
      "Official proof of enrollment. Required for your citizenship documents package.",
    dividerColor: "bg-[#E2E8F0]",
    pill: { icon: Timer, text: "Issued within 2 hours", bg: "bg-[#E8F5F3]", color: "text-[#1B8A7E]" },
    cardBg: "bg-white",
    cardBorder: "border-[#E2E8F0]",
    cardShadow: "shadow-[0_4px_24px_rgba(0,0,0,0.05)]",
  },
  {
    badge: { text: "ON REQUEST", bg: "bg-[#FFF4EF]", color: "text-[#E85D26]" },
    icon: ClipboardList,
    iconBg: "bg-[#FFF4EF]",
    iconColor: "text-[#E85D26]",
    title: "Declaração de Frequência",
    subtitle: "Attendance Certificate",
    bodyDesktop:
      "Confirms your active enrollment. Can be requested by government agencies at any time during the course.",
    bodyMobile:
      "Confirms enrollment on request by government agencies.",
    dividerColor: "bg-[#E2E8F0]",
    pill: { icon: Mail, text: "Available on request", bg: "bg-[#FFF7ED]", color: "text-[#C2410C]" },
    cardBg: "bg-white",
    cardBorder: "border-[#E2E8F0]",
    cardShadow: "shadow-[0_4px_24px_rgba(0,0,0,0.05)]",
  },
  {
    badge: { text: "AFTER 150 HOURS", bg: "bg-[#D1FAF0]", color: "text-[#0F766E]" },
    icon: GraduationCap,
    iconBg: "bg-[#D1FAF0]",
    iconColor: "text-[#0F766E]",
    title: "Certificate of Completion",
    subtitle: "Official A2 PLA Certificate",
    bodyDesktop:
      "Centro Qualifica-recognised certificate confirming 150-hour A2 Portuguese course completion. For permanent residency and citizenship applications.",
    bodyMobile:
      "Required for your citizenship application.",
    dividerColor: "bg-[#99E6D8]",
    pill: { icon: BadgeCheck, text: "Issued by Centro Qualifica", bg: "bg-[#D1FAF0]", color: "text-[#0F766E]" },
    cardBg: "bg-[#F0FDF9]",
    cardBorder: "border-[#1B8A7E]",
    cardShadow: "shadow-[0_8px_32px_rgba(27,138,126,0.1)]",
  },
];

function MobileBadgeText(card: DocCard) {
  if (card.badge.text === "AFTER 150 HOURS") return "AFTER 150H";
  return card.badge.text;
}

export default function DocumentsTimeline() {
  return (
    <section className="bg-white pt-12 lg:pt-20 lg:pb-20">
      {/* Section Header */}
      <div className="flex flex-col items-center gap-[10px] px-5 lg:gap-3 lg:px-0">
        <span className="text-xs font-bold tracking-[2px] text-[#1B8A7E] uppercase lg:text-[13px]">
          WHAT YOU RECEIVE
        </span>
        <h2 className="text-[26px] font-extrabold leading-[1.2] text-[#1E293B] text-center lg:text-[40px]">
          Official Documents — from Day One
        </h2>
        <p className="text-[15px] text-[#64748B] text-center lg:text-lg lg:max-w-[600px]">
          <span className="lg:hidden">
            Every document is official and recognised by Portuguese authorities.
          </span>
          <span className="hidden lg:inline">
            From enrollment to citizenship application — every document is
            official and recognised by Portuguese authorities.
          </span>
        </p>
      </div>

      {/* Cards */}
      <div
        className="flex flex-col gap-[14px] px-5 mt-6
                   lg:flex-row lg:gap-6 lg:max-w-[1060px] lg:mx-auto lg:mt-10 lg:px-0"
      >
        {cards.map((card) => (
          <div
            key={card.title}
            className={`flex flex-col gap-[10px] rounded-2xl px-4 py-5 border ${card.cardBg} ${card.cardBorder} ${card.cardShadow}
                       lg:flex-1 lg:gap-3 lg:rounded-[20px] lg:px-6 lg:py-5`}
          >
            {/* Top Badge */}
            <div className="w-fit">
              <span
                className={`inline-flex items-center rounded-full px-3 py-[5px] text-[11px] font-bold tracking-[1.5px] ${card.badge.bg} ${card.badge.color}`}
              >
                <span className="lg:hidden">{MobileBadgeText(card)}</span>
                <span className="hidden lg:inline">{card.badge.text}</span>
              </span>
            </div>

            {/* Icon + Title */}
            <div className="flex items-center gap-2.5 lg:gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg} lg:w-11 lg:h-11`}
              >
                <card.icon className={`w-5 h-5 ${card.iconColor} lg:w-[22px] lg:h-[22px]`} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[17px] font-bold leading-[1.2] text-[#1E293B] lg:text-[19px] whitespace-nowrap">
                  {card.title}
                </span>
                <span className="text-[13px] text-[#64748B]">
                  {card.subtitle}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className={`h-px w-full ${card.dividerColor}`} />

            {/* Body */}
            <p className="text-sm leading-[1.6] text-[#64748B]">
              <span className="lg:hidden">{card.bodyMobile}</span>
              <span className="hidden lg:inline">{card.bodyDesktop}</span>
            </p>

            {/* Spacer — desktop only */}
            <div className="hidden lg:block flex-1" />

            {/* Bottom Pill */}
            <div className="w-fit">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-[5px] text-xs font-semibold ${card.pill.bg} ${card.pill.color}`}
              >
                <card.pill.icon className="w-[13px] h-[13px]" />
                {card.pill.text}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
