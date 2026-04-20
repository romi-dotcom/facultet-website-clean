import { Globe, Landmark, Timer } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-[#F8FAFC]">
      <div
        className="px-5 pt-6 pb-10 flex flex-col items-center gap-3
                   lg:max-w-[1200px] lg:mx-auto lg:flex-row lg:items-center lg:gap-16 lg:py-20 lg:px-0"
      >
        {/* ── Left Column ── */}
        <div
          className="flex flex-col items-center gap-3 w-full
                     lg:items-start lg:gap-6 lg:w-[588px] lg:shrink-0"
        >
          {/* Pre-badge */}
          <div className="inline-flex items-center gap-1.5 bg-[#E8F5F3] rounded-full px-3.5 py-[5px] lg:py-1.5 w-fit whitespace-nowrap">
            <span className="w-[7px] h-[7px] rounded-full bg-[#1B8A7E]" />
            <span className="text-[11px] font-bold tracking-[1px] text-[#1B8A7E] uppercase lg:tracking-[2px]">
              PLA Course · For Citizenship in Portugal
            </span>
          </div>

          {/* H1 */}
          <h1
            className="text-[34px] font-extrabold leading-[1.15] text-[#1E293B] text-center
                       lg:text-[56px] lg:leading-[1.1] lg:text-left"
          >
            PLA Course —<br />
            Documents for<br />
            Citizenship
          </h1>

          {/* Social Proof Row */}
          <div className="flex items-center justify-center gap-2.5 lg:justify-start lg:gap-3">
            {/* Avatar Stack */}
            <div className="relative w-[72px] h-8 lg:w-[88px] lg:h-9">
              <img src="/images/testimonial-1.png" alt="" className="absolute left-0 top-0 w-8 h-8 rounded-full border-2 border-white object-cover object-top lg:w-9 lg:h-9 lg:border-[#F8FAFC]" />
              <img src="/images/testimonial-2.png" alt="" className="absolute left-[18px] top-0 w-8 h-8 rounded-full border-2 border-white object-cover object-top lg:left-5 lg:w-9 lg:h-9 lg:border-[#F8FAFC]" />
              <img src="/images/testimonial-3.png" alt="" className="absolute left-9 top-0 w-8 h-8 rounded-full border-2 border-white object-cover object-top lg:left-10 lg:w-9 lg:h-9 lg:border-[#F8FAFC]" />
            </div>
            {/* Desktop: divider */}
            <div className="hidden lg:block w-px h-7 bg-[#E2E8F0]" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] text-[#F59E0B]">★★★★★</span>
              <span className="text-[11px] text-[#64748B] lg:text-[13px]">
                <span className="lg:hidden">500+ graduates</span>
                <span className="hidden lg:inline">500+ graduates from 20+ countries</span>
              </span>
            </div>
          </div>

          {/* Subheadline */}
          <p
            className="text-[15px] leading-[1.6] text-[#64748B] text-center
                       lg:text-base lg:text-left lg:max-w-[480px]"
          >
            <span className="lg:hidden">
              150-hour A2 Portuguese programme.<br />
              Required for your citizenship application.
            </span>
            <span className="hidden lg:inline">
              150-hour A2 Portuguese programme.
              Required for your citizenship application.
              Recognised by Portuguese authorities and embassies.
            </span>
          </p>

          {/* Urgency Row */}
          <div className="hidden lg:flex items-center gap-2 bg-[#FFF7ED] border border-[#FED7AA] rounded-lg px-4 py-3 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#EF4444] shrink-0" />
            <span className="text-[13px] font-bold text-[#C2410C]">
              Next group starts April 28 — only 6 spots available
            </span>
          </div>

          {/* CTA Row — desktop only */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#enrol"
              className="btn-pulse inline-flex items-center justify-center h-[52px] px-8 bg-accent rounded-lg text-base font-bold text-white lg:hover:opacity-90 transition-opacity"
            >
              Enroll Now →
            </a>
            <a
              href="#enrol"
              className="inline-flex items-center justify-center h-[52px] px-7 bg-white border-[1.5px] border-[#1E293B] rounded-lg text-base font-medium text-[#1E293B] lg:hover:bg-[#1E293B] lg:hover:text-white transition-colors"
            >
              See Programmes
            </a>
          </div>
        </div>

        {/* ── Right Column — Photo ── */}
        <div className="w-full lg:relative lg:w-[548px] lg:h-[520px] lg:shrink-0">
          {/* Photo */}
          <div
            className="w-full h-[220px] rounded-2xl overflow-hidden
                       lg:w-[548px] lg:h-[520px] lg:rounded-3xl lg:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.16)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero.jpg"
              alt="Happy students studying in Portugal"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating stat cards — desktop only */}
          <div className="hidden lg:flex absolute -left-7 top-[120px] bg-white rounded-[14px] shadow-[0_8px_24px_rgba(0,0,0,0.1)] px-[18px] py-3.5 flex-col gap-0.5">
            <span className="text-[15px] font-bold text-[#1E293B]">
              ⏱ 2 hours
            </span>
            <span className="text-xs text-[#64748B]">
              Matrícula delivered
            </span>
          </div>

          <div className="hidden lg:flex absolute right-[54px] top-8 bg-white rounded-[14px] shadow-[0_8px_24px_rgba(0,0,0,0.1)] px-4 py-3 items-center gap-2.5">
            <Globe className="w-5 h-5 text-[#1E293B]" />
            <div className="flex flex-col gap-px">
              <span className="text-[13px] font-bold text-[#1E293B]">
                20+ countries
              </span>
              <span className="text-[11px] text-[#64748B]">
                Students enrolled
              </span>
            </div>
          </div>

          <div className="hidden lg:flex absolute left-6 bottom-[120px] bg-white rounded-[14px] border-2 border-[#1B8A7E] shadow-[0_8px_24px_rgba(0,0,0,0.1)] px-4 py-3 items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#E8F5F3] flex items-center justify-center shrink-0">
              <Landmark className="w-5 h-5 text-[#1B8A7E]" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-bold text-[#1E293B]">
                Citizenship Eligible
              </span>
              <span className="text-[11px] text-[#64748B]">
                Certificate for citizenship
              </span>
            </div>
          </div>
        </div>

        {/* ── Stats Row — mobile only ── */}
        <div className="flex gap-2 w-full lg:hidden">
          {[
            { icon: Timer, label: "2 hours", sub: "Matrícula", bordered: false },
            { icon: Globe, label: "20+ countries", sub: "Students", bordered: false },
            { icon: Landmark, label: "Citizenship", sub: "Eligible", bordered: true },
          ].map((card) => (
            <div
              key={card.label}
              className={`flex-1 flex flex-col gap-0.5 bg-white rounded-xl px-3 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border ${
                card.bordered ? "border-[#1B8A7E]" : "border-[#E2E8F0]"
              }`}
            >
              <card.icon className="w-4 h-4 text-[#1B8A7E]" />
              <span className="text-[11px] font-bold text-[#1E293B] whitespace-nowrap">
                {card.label}
              </span>
              <span className="text-[10px] text-[#64748B]">{card.sub}</span>
            </div>
          ))}
        </div>

        {/* ── CTA Block — mobile only ── */}
        <div className="flex flex-col gap-2.5 w-full lg:hidden">
          <a
            href="#enrol"
            className="btn-pulse flex items-center justify-center h-[52px] bg-accent rounded-lg text-base font-bold text-white"
          >
            Enroll Now →
          </a>
          <a
            href="#enrol"
            className="flex items-center justify-center h-12 bg-white border-[1.5px] border-[#1E293B] rounded-lg text-[15px] text-[#1E293B]"
          >
            See Programmes
          </a>
        </div>

        {/* ── Bottom text — mobile only ── */}
        <p className="text-xs font-semibold text-[#64748B] text-center lg:hidden">
          ⏱ Next group: April 28 · 6 spots left
        </p>
      </div>
    </section>
  );
}
