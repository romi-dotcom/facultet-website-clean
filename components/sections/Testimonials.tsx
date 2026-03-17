"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

interface Testimonial {
  quote: string;
  mobileQuote: string;
  name: string;
  location: string;
  mobileLocation: string;
  photoBg: string;
  photo?: string;
  imgStyle?: React.CSSProperties;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "\u201cStarted from zero \u2014 after 4 months at Facultet I completed the course and got all the documents for my citizenship application. Teachers explain everything clearly.\u201d",
    mobileQuote:
      "\u201cI started from zero. After 4 months at Facultet I passed the A2 exam and submitted my residency documents.\u201d",
    name: "Maria Fernandes",
    location: "Argentina \u2192 Lisbon \u00b7 studying 4 months",
    mobileLocation: "Argentina \u2192 Lisbon \u00b7 4 months",
    photo: "/images/testimonial-1.png",
    photoBg: "bg-gradient-to-br from-[#F0D9C4] to-[#E8C4A8]",
    imgStyle: { objectPosition: "50% 50%" },
  },
  {
    quote:
      "\u201cThe online format is perfect for someone with a busy schedule. I watch the recordings when the kids are asleep. In 3 months I reached A1 and now I can talk to my son\u2019s teacher without Google Translate.\u201d",
    mobileQuote:
      "\u201cThe online format is perfect for a busy schedule. In 3 months I reached A1 and now I talk to my son\u2019s teacher without Google Translate.\u201d",
    name: "Arjun Mehta",
    location: "India \u2192 Porto \u00b7 studying online",
    mobileLocation: "India \u2192 Porto \u00b7 online",
    photo: "/images/testimonial-2.png",
    photoBg: "bg-gradient-to-br from-[#D4C4B0] to-[#C8B8A4]",
    imgStyle: { objectPosition: "50% 30%" },
  },
  {
    quote:
      "\u201cFacultet prepared me step by step \u2014 grammar, vocabulary, listening. When I went to my appointment I understood everything and answered without an interpreter. It was a huge moment for me.\u201d",
    mobileQuote:
      "\u201cFacultet prepared me step by step. At my appointment I understood everything and answered without an interpreter.\u201d",
    name: "Ana R.",
    location: "Russia \u2192 Porto \u00b7 studying 5 months",
    mobileLocation: "Russia \u2192 Porto \u00b7 5 months",
    photo: "/images/testimonial-3.png",
    photoBg: "bg-gradient-to-br from-[#C4D4E0] to-[#B0C4D8]",
    imgStyle: { objectPosition: "50% 30%" },
  },
];

function Stars5({ size = 16 }: { size?: number }) {
  return (
    <div className="flex gap-[3px]">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="text-[#F59E0B] fill-[#F59E0B]"
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [activeMobileCard, setActiveMobileCard] = useState(0);

  useEffect(() => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / (el.scrollWidth / testimonials.length));
      setActiveMobileCard(Math.min(idx, testimonials.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="bg-[#F8FAFC] lg:py-24">
      {/* ── Header ── */}
      <div className="flex flex-col items-center gap-[10px] px-5 pt-10 pb-6 lg:gap-4 lg:pt-0 lg:pb-6 lg:px-0">
        <span className="text-[11px] font-bold tracking-[2px] text-[#1B8A7E] uppercase lg:text-xs">
          TESTIMONIALS
        </span>
        <h2 className="text-[26px] font-extrabold leading-[1.2] text-[#1E293B] text-center lg:text-[40px] lg:leading-[1.15]">
          What Our Students Say
        </h2>

        {/* Social Proof Bar — Desktop */}
        <div className="hidden lg:flex items-center gap-6 rounded-full border border-[#E2E8F0] bg-white px-8 py-3.5 shadow-[0_2px_8px_rgba(15,23,42,0.03)]">
          <span className="text-lg font-bold text-[#4285F4]">G</span>
          <Stars5 size={16} />
          <span className="text-sm font-semibold text-[#1E293B]">
            5.0 &middot; 47 verified reviews
          </span>
          <div className="w-px h-5 bg-[#E2E8F0]" />
          <span className="text-sm font-medium text-[#64748B]">
            423 students completed
          </span>
          <div className="w-px h-5 bg-[#E2E8F0]" />
          <span className="text-sm font-medium text-[#64748B]">
            🇧🇷 🇮🇳 🇺🇦 🇨🇳 🇵🇰  12 countries
          </span>
        </div>

        {/* Social Proof Bar — Mobile */}
        <div className="flex lg:hidden items-center gap-3 rounded-full border border-[#E2E8F0] bg-white px-[18px] py-2.5">
          <span className="text-[15px] font-bold text-[#4285F4]">G</span>
          <Stars5 size={13} />
          <span className="text-xs font-semibold text-[#1E293B]">
            5.0 &middot; 47 reviews
          </span>
        </div>
      </div>

      {/* ── Carousel — Desktop ── */}
      <div className="hidden lg:block max-w-[1060px] mx-auto pt-6">
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${current * (460 + 24)}px)` }}
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="flex shrink-0 w-[460px] h-[289px] rounded-[20px] border border-[#E2E8F0] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.07)] overflow-hidden"
              >
                {/* Photo */}
                {t.photo ? (
                  <img src={t.photo} alt={t.name} className="w-[130px] shrink-0 object-cover" style={t.imgStyle} />
                ) : (
                  <div className={`w-[130px] shrink-0 ${t.photoBg}`} />
                )}
                {/* Body */}
                <div className="flex-1 flex flex-col justify-between p-7 pb-6">
                  <div className="flex flex-col gap-4">
                    <Stars5 size={16} />
                    <p className="text-[15px] font-medium leading-[1.6] text-[#1E293B]">
                      {t.quote}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[15px] font-bold text-[#1E293B]">
                      {t.name}
                    </span>
                    <span className="text-[13px] text-[#64748B]">
                      {t.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nav buttons */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full border-[1.5px] border-[#E2E8F0] bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(15,23,42,0.05)] hover:bg-[#F8FAFC] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#1E293B]" />
          </button>
          <button
            onClick={next}
            className="w-12 h-12 rounded-full border-[1.5px] border-[#E85D26] bg-[#E85D26] flex items-center justify-center shadow-[0_2px_8px_rgba(232,93,38,0.19)] hover:bg-[#D4521E] transition-colors"
          >
            <ArrowRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* CTA Strip — Desktop */}
        <div className="flex items-center justify-between mt-8 rounded-[20px] bg-[#1E293B] px-12 py-8">
          <div className="flex flex-col gap-1.5">
            <span className="text-2xl font-extrabold text-white">
              Start speaking Portuguese today.
            </span>
            <span className="text-[15px] text-[#94A3B8]">
              Join 423 students already learning with Facultet.
            </span>
          </div>
          <a
            href="#courses"
            className="btn-pulse flex items-center gap-2 rounded-full bg-[#E85D26] px-8 py-4 text-base font-bold text-white hover:bg-[#D4521E] transition-colors"
          >
            Enrol Now
            <ArrowRight className="w-[18px] h-[18px]" />
          </a>
        </div>
      </div>

      {/* ── Carousel — Mobile ── */}
      <div className="lg:hidden">
        {/* Cards — gap:12, padding:[0,20] */}
        <div ref={mobileScrollRef} className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pl-5" style={{ scrollPaddingLeft: 20 }}>
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex shrink-0 w-[315px] h-[200px] rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_4px_12px_rgba(15,23,42,0.05)] snap-start overflow-hidden"
            >
              {/* Photo — 90px */}
              {t.photo ? (
                <img src={t.photo} alt={t.name} className="w-[90px] shrink-0 object-cover" style={t.imgStyle} />
              ) : (
                <div className={`w-[90px] shrink-0 ${t.photoBg}`} />
              )}
              {/* Body — padding:16 */}
              <div className="flex-1 flex flex-col gap-[10px] p-4">
                {/* Top: stars + quote — gap:8 */}
                <div className="flex flex-col gap-2">
                  <Stars5 size={13} />
                  <p className="text-[13px] font-medium leading-[1.5] text-[#1E293B]">
                    {t.mobileQuote}
                  </p>
                </div>
                {/* Bottom: name + location — gap:2, pinned to bottom */}
                <div className="flex flex-col gap-0.5 mt-auto">
                  <span className="text-[13px] font-bold text-[#1E293B]">
                    {t.name}
                  </span>
                  <span className="text-[11px] text-[#64748B]">
                    {t.mobileLocation}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots — gap:8, padding-top:14 */}
        <div className="flex items-center justify-center gap-2 pt-[14px]">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${i === activeMobileCard ? "w-2 h-2 bg-[#E85D26]" : "w-1.5 h-1.5 bg-[#D1D5DB]"}`}
            />
          ))}
        </div>

        {/* CTA — gap:20, padding:[24,20,40,20] */}
        <div className="flex flex-col items-center gap-5 px-5 pt-6 pb-10">
          <span className="text-xl font-extrabold text-[#1E293B] text-center">
            Start speaking Portuguese today.
          </span>
          <span className="text-sm text-[#64748B] text-center">
            Join 423 students already learning with Facultet.
          </span>
          <a
            href="#courses"
            className="btn-pulse flex items-center justify-center gap-2 rounded-full bg-[#E85D26] px-8 py-3.5 text-[15px] font-bold text-white"
          >
            Enrol Now
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
