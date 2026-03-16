import { Handshake, Award, Monitor, Landmark } from "lucide-react";

const items = [
  { emoji: "🤝", icon: Handshake, label: "Partner of Centro Qualifica" },
  { emoji: "📋", icon: Award, label: "Official A2 Certificate" },
  { emoji: "💻", icon: Monitor, label: "Online & In-person" },
  { emoji: "🏛️", icon: Landmark, label: "Licensed training entity" },
];

export default function TrustBar() {
  return (
    <section className="bg-[#F8FAFC] border-y border-[#E2E8F0]">
      {/* ── Desktop ── */}
      <div className="hidden lg:flex items-center justify-between max-w-[1100px] mx-auto py-5">
        {items.map((item, i) => (
          <div key={item.label} className="contents">
            <div className="flex items-center gap-2">
              <item.icon className="w-5 h-5 text-[#4A5568]" />
              <span className="text-[13px] text-[#4A5568]">{item.label}</span>
            </div>
            {i < items.length - 1 && (
              <div className="w-px h-5 bg-[#E2E8F0]" />
            )}
          </div>
        ))}
      </div>

      {/* ── Mobile ── */}
      <div className="flex flex-col gap-2 p-4 lg:hidden">
        {/* Row 1 */}
        <div className="flex gap-2">
          {[items[0], items[3]].map((item) => (
            <div
              key={item.label}
              className="flex-1 flex items-center gap-1.5 bg-white rounded-lg px-2 py-2.5"
            >
              <item.icon className="w-4 h-4 text-[#64748B] shrink-0" />
              <span className="text-xs text-[#64748B]">{item.label}</span>
            </div>
          ))}
        </div>
        {/* Row 2 */}
        <div className="flex gap-2">
          {[items[1], items[2]].map((item) => (
            <div
              key={item.label}
              className="flex-1 flex items-center gap-1.5 bg-white rounded-lg px-2 py-2.5"
            >
              <item.icon className="w-4 h-4 text-[#64748B] shrink-0" />
              <span className="text-xs text-[#64748B]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
