"use client";

import { useRef, useState, useEffect } from "react";
import { Handshake, Award, Monitor, Landmark } from "lucide-react";

const items = [
  { emoji: "🤝", icon: Handshake, label: "Partner of Centro Qualifica" },
  { emoji: "📋", icon: Award, label: "Official A2 Certificate" },
  { emoji: "💻", icon: Monitor, label: "Online & In-person" },
  { emoji: "🏛️", icon: Landmark, label: "Licensed training entity" },
];

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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
      <div ref={ref} className="flex flex-col gap-2 p-4 lg:hidden overflow-hidden">
        {/* Row 1 */}
        <div className="flex gap-2">
          {[items[0], items[3]].map((item, i) => (
            <div
              key={item.label}
              className="flex-1 flex items-center gap-1.5 bg-white rounded-lg px-2 py-2.5 transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible
                  ? "translateX(0)"
                  : i === 0
                  ? "translateX(-100%)"
                  : "translateX(100%)",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <item.icon className="w-4 h-4 text-[#64748B] shrink-0" />
              <span className="text-xs text-[#64748B]">{item.label}</span>
            </div>
          ))}
        </div>
        {/* Row 2 */}
        <div className="flex gap-2">
          {[items[1], items[2]].map((item, i) => (
            <div
              key={item.label}
              className="flex-1 flex items-center gap-1.5 bg-white rounded-lg px-2 py-2.5 transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible
                  ? "translateX(0)"
                  : i === 0
                  ? "translateX(-100%)"
                  : "translateX(100%)",
                transitionDelay: `${(i + 2) * 100}ms`,
              }}
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
