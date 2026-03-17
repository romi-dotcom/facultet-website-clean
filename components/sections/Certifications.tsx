import {
  Landmark,
  BadgeCheck,
  CircleCheck,
  ShieldCheck,
  Building2,
} from "lucide-react";

const logos = [
  { name: "CESPU", sub: "University Group", mSub: "University Group" },
  { name: "IEFP", sub: "Employment Institute", mSub: "Employment Inst." },
  { name: "Centro Qualifica", sub: "Official Network", mSub: "Official Network" },
];

const docItems = [
  "Matriculation Certificate",
  "Attendance Reference",
  "Completion Certificate",
  "Required for citizenship application",
  "Recognised by embassies worldwide",
];

export default function Certifications() {
  return (
    <section className="bg-[#F8FAFC] py-12 px-5 lg:py-20 lg:px-0">
      <div className="max-w-[1060px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center gap-[10px] lg:gap-3">
          <span className="text-xs font-bold tracking-[2px] text-[#1B8A7E] uppercase">
            ACCREDITATION
          </span>
          <h2 className="text-2xl font-bold leading-[1.2] text-[#1E293B] text-center lg:text-[36px]">
            Our Certifications — Your Documents Are Official
          </h2>
          <p className="text-[15px] leading-[1.5] text-[#64748B] text-center lg:text-lg lg:max-w-[715px]">
            PLA courses delivered in partnership with Centro Qualifica centres.
            Recognised by Portuguese government agencies for citizenship
            applications.
          </p>
        </div>

        {/* Logo Strip */}
        <div className="mt-8 lg:mt-12">
          <p className="text-[11px] font-bold tracking-[2px] text-[#94A3B8] text-center mb-3.5 lg:mb-5">
            RECOGNISED BY
          </p>

          {/* Desktop logos */}
          <div className="hidden lg:flex items-center rounded-xl border border-[#E2E8F0] bg-white px-10 py-5">
            {logos.map((l, i) => (
              <div key={l.name} className="contents">
                <div className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-base font-extrabold tracking-[1px] text-[#1E293B]">
                    {l.name}
                  </span>
                  <span className="text-[11px] text-[#94A3B8]">{l.sub}</span>
                </div>
                {i < logos.length - 1 && (
                  <div className="w-px h-9 bg-[#E2E8F0]" />
                )}
              </div>
            ))}
          </div>

          {/* Mobile logos — marquee */}
          <div className="lg:hidden rounded-xl border border-[#E2E8F0] bg-white py-4 overflow-hidden">
            <div className="marquee-wrap">
              <div className="marquee-inner">
                {[0, 1, 2, 3].map((copy) =>
                  logos.map((l, i) => (
                    <span key={`${copy}-${i}`} className="marquee-item">
                      <span className="text-sm font-extrabold tracking-[1px] text-[#1E293B]">{l.name}</span>
                      <span className="text-[10px] text-[#94A3B8]">{l.mSub}</span>
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Two Cards */}
        <div className="flex flex-col gap-4 mt-6 lg:flex-row lg:gap-6 lg:mt-8">
          {/* Left Card — Certified Training Entity */}
          <div className="flex-1 flex flex-col gap-5 rounded-2xl border border-[#E2E8F0] bg-white p-6 pb-7 lg:gap-7 lg:p-9 lg:pb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-[#E8F5F3] flex items-center justify-center shrink-0 lg:w-11 lg:h-11 lg:rounded-xl">
                <Landmark className="w-5 h-5 text-[#1B8A7E] lg:w-[22px] lg:h-[22px]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[17px] font-bold text-[#1E293B] lg:text-xl">
                  Certified Training Entity
                </span>
                <span className="text-xs font-semibold text-[#1B8A7E] lg:text-[13px]">
                  Licensed Training Entity · PLA Official
                </span>
              </div>
            </div>
            <div className="h-px bg-[#F1F5F9]" />
            <p className="text-sm leading-[1.6] text-[#64748B] lg:text-[15px]">
              Ola Facultet is an officially licensed training entity, delivering
              PLA courses in partnership with Centro Qualifica centres for
              official Portuguese language certification.
            </p>
            {/* Partner badge — mobile */}
            <div className="flex items-center gap-2.5 rounded-[10px] bg-[#F8FAFC] border border-[#E2E8F0] px-3.5 py-3 lg:hidden">
              <Building2 className="w-4 h-4 text-[#64748B] shrink-0" />
              <div className="flex flex-col gap-px">
                <span className="text-[10px] font-semibold tracking-[1px] text-[#94A3B8]">
                  Official Partner
                </span>
                <span className="text-[13px] font-semibold text-[#1E293B]">
                  Centro Qualifica Network
                </span>
              </div>
            </div>
          </div>

          {/* Right Card — Recognised Documents */}
          <div className="flex-1 flex flex-col gap-5 rounded-2xl border border-[#E2E8F0] bg-white p-6 pb-7 lg:gap-7 lg:p-9 lg:pb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-[#EFF6FF] flex items-center justify-center shrink-0 lg:w-11 lg:h-11 lg:rounded-xl">
                <BadgeCheck className="w-5 h-5 text-[#3B82F6] lg:w-[22px] lg:h-[22px]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[17px] font-bold text-[#1E293B] lg:text-xl">
                  Recognised Documents
                </span>
                <span className="text-xs font-semibold text-[#3B82F6] lg:text-[13px]">
                  For citizenship · Embassies · Gov. Agencies
                </span>
              </div>
            </div>
            <div className="h-px bg-[#F1F5F9]" />
            <div className="flex flex-col gap-2.5 lg:gap-3">
              {docItems.map((item) => (
                <div key={item} className="flex items-center gap-2.5 lg:gap-3">
                  <CircleCheck className="w-[17px] h-[17px] text-[#15803D] shrink-0 lg:w-[18px] lg:h-[18px]" />
                  <span className="text-sm font-semibold text-[#1E293B] lg:text-[15px]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Strip */}
        <div className="flex items-start gap-2.5 mt-4 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] px-4 py-3.5 lg:gap-3 lg:mt-4 lg:px-6 lg:py-4">
          <ShieldCheck className="w-[18px] h-[18px] text-[#15803D] shrink-0 mt-0.5 lg:w-5 lg:h-5" />
          <p className="text-[13px] leading-[1.5] text-[#15803D] lg:text-sm">
            <span className="lg:hidden">
              Our documents have official status. Recognised by Portuguese
              authorities, embassies and government agencies.
            </span>
            <span className="hidden lg:inline">
              Our documents (matriculation certificates, attendance references,
              completion certificates) have official status. Recognised by
              Portuguese authorities and embassies.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
