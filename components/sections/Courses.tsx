import {
  Star,
  Sprout,
  TrendingUp,
  MapPin,
  Lock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Course {
  banner: { text: string; bg: string };
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  level: string;
  levelColor: string;
  levelBg: string;
  title: string;
  subtitle: string;
  locations: string;
  price: string;
  oldPrice: string;
  save: string;
  installment: string;
  urgency: string;
  ctaBg: string;
  ctaLabel: string;
  href: string;
}

const courses: Course[] = [
  {
    banner: { text: "MOST POPULAR", bg: "bg-accent" },
    icon: Sprout,
    iconColor: "text-[#E85D26]",
    iconBg: "bg-[#FFF0EB]",
    level: "A0 → A2",
    levelColor: "text-[#E85D26]",
    levelBg: "bg-[#FFF0EB]",
    title: "Starting from Zero",
    subtitle: "No Portuguese at all? Perfect starting point.",
    locations: "Online · Lisbon · Porto",
    price: "€470",
    oldPrice: "€590",
    save: "Save €120",
    installment: "or 3×€157 with",
    urgency: "4 spots left — group starts April 7",
    ctaBg: "bg-accent",
    ctaLabel: "Enroll Now →",
    href: "/courses/a0-a2",
  },
  {
    banner: { text: "BEST VALUE", bg: "bg-[#1B8A7E]" },
    icon: TrendingUp,
    iconColor: "text-[#1B8A7E]",
    iconBg: "bg-[#D1FAF0]",
    level: "A1 → A2",
    levelColor: "text-[#0F766E]",
    levelBg: "bg-[#D1FAF0]",
    title: "Already know some Portuguese?",
    subtitle: "Know some basics? Get to A2 — and get your documents.",
    locations: "Online · Lisbon",
    price: "€310",
    oldPrice: "€520",
    save: "Save €210",
    installment: "or 3×€104 with",
    urgency: "17 spots left — group starts May 2",
    ctaBg: "bg-[#1B8A7E]",
    ctaLabel: "Enroll Now →",
    href: "/courses/a1-a2",
  },
];

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="flex-1 flex flex-col rounded-[20px] border border-[#E2E8F0] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] lg:shadow-[0_8px_24px_rgba(0,0,0,0.07)] overflow-hidden">
      {/* Banner */}
      <div
        className={`flex items-center justify-center gap-1.5 py-2 ${course.banner.bg}`}
      >
        <Star className="w-3 h-3 text-white" />
        <span className="text-[11px] font-bold tracking-[1.5px] text-white">
          {course.banner.text}
        </span>
      </div>

      {/* Card Head */}
      <div className="flex flex-col gap-2.5 px-5 pt-5 pb-4 lg:px-6 lg:pt-6 lg:pb-4">
        {/* Icon + Level */}
        <div className="flex items-center gap-2.5">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${course.iconBg}`}
          >
            <course.icon className={`w-5 h-5 ${course.iconColor}`} />
          </div>
          <span
            className={`text-base font-bold tracking-[0.5px] rounded-full px-4 py-1.5 ${course.levelBg} ${course.levelColor}`}
          >
            {course.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-extrabold leading-[1.25] text-[#1E293B] lg:text-[22px]">
          {course.title}
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-[#64748B] leading-[1.5]">
          {course.subtitle}
        </p>

        {/* Location */}
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#1B8A7E]" />
          <span className="text-[13px] text-[#64748B]">
            {course.locations}
          </span>
        </div>
      </div>

      {/* Separator */}
      <div className="h-px bg-[#F1F5F9]" />

      {/* Price Block */}
      <div className="flex flex-col gap-4 px-5 pt-5 pb-6 lg:px-7 lg:pt-6 lg:pb-7 flex-1">
        {/* Price Row */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2.5">
            <span className="text-[32px] font-extrabold text-[#1E293B] leading-[1]">
              {course.price}
            </span>
            <span className="text-[15px] text-[#9CA3AF] line-through">
              {course.oldPrice}
            </span>
            <span className="text-[11px] font-bold text-[#15803D] bg-[#DCFCE7] rounded-full px-2.5 py-1 lg:text-xs">
              {course.save}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[#6B7280]">
              {course.installment}
            </span>
            <span className="text-xs font-bold text-[#FFB3C7] animate-pulse">Klarna</span>
          </div>
        </div>

        {/* Urgency */}
        <div className="flex items-center gap-2 pt-1">
          <span className="w-[7px] h-[7px] rounded-full bg-[#EF4444]" />
          <span className="text-xs font-bold text-[#C2410C]">
            {course.urgency}
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA Enroll */}
        <a
          href={course.href}
          className={`btn-pulse flex items-center justify-center h-[52px] rounded-xl text-base font-bold text-white ${course.ctaBg}`}
        >
          {course.ctaLabel}
        </a>

        {/* View Curriculum */}
        <a
          href={course.href}
          className="flex items-center justify-center h-11 rounded-xl border border-[#1B8A7E] text-[13px] text-[#1B8A7E] cursor-pointer transition-all hover:bg-[#F0FAF9] hover:shadow-[0_2px_8px_rgba(27,138,126,0.1)]"
        >
          View Curriculum →
        </a>

        {/* Trust line */}
        <div className="flex items-center justify-center gap-1.5 pt-2">
          <Lock className="w-3 h-3 text-[#94A3B8]" />
          <span className="text-[11px] text-[#94A3B8]">
            Secure payment · DGERT-licensed school
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Courses() {
  return (
    <section className="bg-white pt-12 lg:bg-[#f8fafc] lg:py-20">
      <div className="max-w-[1060px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-[10px] px-5 lg:items-start lg:gap-3 lg:px-0">
          <span className="text-xs font-bold tracking-[2px] text-[#1B8A7E] uppercase">
            OUR COURSES
          </span>
          <h2 className="text-2xl font-extrabold leading-[1.2] text-[#1E293B] text-center lg:text-[40px] lg:text-left">
            <span className="lg:hidden">
              From Zero to Citizenship Documents
            </span>
            <span className="hidden lg:inline">
              From Zero to Citizenship Documents — Pick Your Starting Point
            </span>
          </h2>
          <p className="text-[15px] text-[#64748B] text-center lg:text-base lg:text-left">
            <span className="lg:hidden">
              Two paths, one goal: your citizenship documents.
            </span>
            <span className="hidden lg:inline">
              Online and in-person · Two paths, one goal: your citizenship documents.
            </span>
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-5 px-5 pt-7 pb-12 lg:flex-row lg:gap-7 lg:px-0 lg:pt-12 lg:pb-0">
          {courses.map((course) => (
            <CourseCard key={course.title} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
