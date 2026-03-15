"use client";

import { useState } from "react";
import { CircleCheck, Fingerprint } from "lucide-react";

interface Module {
  num: string;
  title: string;
  level: string;
  levelColor: string;
  levelBg: string;
  checkColor: string;
  tags: string[];
  checks: string[];
}

const modules: Module[] = [
  {
    num: "01",
    title: "Portuguese Basics",
    level: "A0 → A1",
    levelColor: "text-[#1B8A7E]",
    levelBg: "bg-[#E8F5F3]",
    checkColor: "text-[#1B8A7E]",
    tags: ["Alphabet & Phonetics", "Grammar Basics", "Numbers & Time", "Everyday Vocabulary"],
    checks: [
      "Alphabet, phonetics and pronunciation",
      "Basic grammar — articles, verbs ser/estar",
      "Numbers, time, calendar",
    ],
  },
  {
    num: "02",
    title: "Skills Development",
    level: "A1 → A2",
    levelColor: "text-[#E85D26]",
    levelBg: "bg-[#FFF4EF]",
    checkColor: "text-[#E85D26]",
    tags: ["Complex Sentences", "Practical Situations", "Past & Future Tenses"],
    checks: [
      "Building complex sentences",
      "Practical situations: shop, restaurant, doctor, bank",
    ],
  },
  {
    num: "03",
    title: "Language Consolidation",
    level: "A2 Level",
    levelColor: "text-[#15803D]",
    levelBg: "bg-[#F0FDF4]",
    checkColor: "text-[#15803D]",
    tags: ["Reading Comprehension", "Written Production", "Listening", "Oral Speech"],
    checks: [
      "Compreensão de Leitura (Reading comprehension)",
      "Produção Oral (Oral speech)",
    ],
  },
];

const tabMeta = [
  { hours: "A0 → A1 · 50h" },
  { hours: "A1 → A2 · 50h" },
  { hours: "A2 Certified · 50h" },
];

export default function CourseProgramme() {
  const [active, setActive] = useState(0);
  const mod = modules[active];

  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="max-w-[1060px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 px-5 pb-8 lg:gap-3 lg:px-0 lg:pb-12">
          <span className="text-xs font-bold tracking-[2px] text-[#1B8A7E] uppercase">
            PROGRAMME
          </span>
          <h2 className="text-2xl font-bold leading-[1.2] text-[#1E293B] text-center lg:text-[36px]">
            Course Programme — 150 Academic Hours
          </h2>
          <p className="text-sm leading-[1.5] text-[#64748B] text-center lg:text-lg lg:max-w-[580px]">
            Three progressive modules. Each builds on the previous. Full
            preparation to reach A2 Portuguese level.
          </p>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 px-5 lg:flex-row lg:gap-12 lg:px-0">
          {/* Tabs / Sidebar */}
          <div className="flex flex-col gap-1 lg:w-[280px] lg:shrink-0">
            {modules.map((m, i) => (
              <button
                key={m.num}
                onClick={() => setActive(i)}
                className={`relative flex flex-col gap-1.5 rounded-[10px] px-5 py-4 text-left transition-all cursor-pointer ${
                  i === active
                    ? "bg-[#1B8A7E] shadow-[0_4px_12px_rgba(27,138,126,0.3)]"
                    : "tab-hint bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#1B8A7E] hover:bg-[#F0FAF9] hover:shadow-[0_2px_8px_rgba(27,138,126,0.1)]"
                }`}
              >
                <span
                  className={`text-[11px] font-bold tracking-[2px] ${
                    i === active ? "text-white/60" : "text-[#94A3B8]"
                  }`}
                >
                  {m.num}
                </span>
                <span
                  className={`text-base font-bold ${
                    i === active ? "text-white" : "text-[#1E293B]"
                  }`}
                >
                  {m.title}
                </span>
                <span
                  className={`text-[13px] ${
                    i === active ? "text-white/60" : "text-[#64748B]"
                  }`}
                >
                  {tabMeta[i].hours}
                </span>
                {i !== active && (
                  <Fingerprint className="tap-icon lg:hidden absolute bottom-3 right-3 w-5 h-5 text-[#1B8A7E]/40" />
                )}
              </button>
            ))}
          </div>

          {/* Content Panel */}
          <div className="flex-1 rounded-xl border border-[#E2E8F0] bg-white p-5 lg:p-8">
            <div className="flex flex-col gap-5 lg:gap-6">
              {/* Title + Badge */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#1E293B] lg:text-[22px]">
                  {mod.title}
                </h3>
                <span
                  className={`rounded-full px-3.5 py-[5px] text-[13px] font-bold ${mod.levelBg} ${mod.levelColor}`}
                >
                  {mod.level}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#E2E8F0]" />

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {mod.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-[#E2E8F0] bg-white px-3 py-[5px] text-xs text-[#475569] lg:bg-white lg:text-[13px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Checklist */}
              <div className="flex flex-col gap-3">
                {mod.checks.map((check) => (
                  <div key={check} className="flex items-start gap-2.5">
                    <CircleCheck
                      className={`w-4 h-4 shrink-0 mt-0.5 ${mod.checkColor}`}
                    />
                    <span className="text-sm text-[#475569]">{check}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
