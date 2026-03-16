"use client";

import { useRef, useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Video,
  Award,
  Monitor,
  Users,
  Play,
  Pause,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface GalleryItem {
  bg: string;
  tag: string;
  tagIcon: LucideIcon;
  video?: string;
  image?: string;
}

const desktopItems: GalleryItem[] = [
  { bg: "", tag: "Offline class · Lisbon", tagIcon: Video, video: "/videos/gallery-1.mp4" },
  { bg: "", tag: "Certificate received", tagIcon: Award, image: "/images/gallery-2.png" },
  { bg: "", tag: "Group lesson · Lisbon", tagIcon: Monitor, video: "/videos/gallery-2.mp4" },
  { bg: "", tag: "Certificate received", tagIcon: Users, image: "/images/gallery-4.png" },
  { bg: "", tag: "Certificate received", tagIcon: Award, image: "/images/gallery-5.png" },
  { bg: "", tag: "Certificate received", tagIcon: Award, image: "/images/gallery-6.png" },
  { bg: "", tag: "Certificate received", tagIcon: Award, image: "/images/gallery-8.png" },
  { bg: "", tag: "Certificate received", tagIcon: Award, image: "/images/gallery-9.png" },
  { bg: "", tag: "Certificate received", tagIcon: Award, image: "/images/gallery-10.png" },
];

const mobileItems: GalleryItem[] = [
  { bg: "", tag: "Offline class", tagIcon: Video, video: "/videos/gallery-1.mp4" },
  { bg: "", tag: "Certificate", tagIcon: Award, image: "/images/gallery-2.png" },
  { bg: "", tag: "Online class", tagIcon: Monitor, video: "/videos/gallery-2.mp4" },
  { bg: "", tag: "Certificate", tagIcon: Award, image: "/images/gallery-4.png" },
  { bg: "", tag: "Certificate", tagIcon: Award, image: "/images/gallery-5.png" },
  { bg: "", tag: "Certificate", tagIcon: Award, image: "/images/gallery-6.png" },
  { bg: "", tag: "Certificate", tagIcon: Award, image: "/images/gallery-8.png" },
  { bg: "", tag: "Certificate", tagIcon: Award, image: "/images/gallery-9.png" },
  { bg: "", tag: "Certificate", tagIcon: Award, image: "/images/gallery-10.png" },
];

function VideoCard({
  item,
  className,
  tagClassName,
  tagIconSize,
  tagTextSize,
  playSize,
  playIconSize,
}: {
  item: GalleryItem;
  className: string;
  tagClassName: string;
  tagIconSize: string;
  tagTextSize: string;
  playSize: string;
  playIconSize: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className={`relative ${className} ${item.video ? "bg-black" : item.image ? "" : item.bg}`}>
      {item.image && (
        <img
          src={item.image}
          alt={item.tag}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {item.video && (
        <video
          ref={videoRef}
          src={item.video}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          loop
          preload="metadata"
        />
      )}
      {/* Tag */}
      <div className={tagClassName}>
        <item.tagIcon className={`${tagIconSize} text-white`} />
        <span className={`${tagTextSize} font-semibold text-white`}>
          {item.tag}
        </span>
      </div>
      {/* Play/Pause button */}
      {item.video && (
        <button
          onClick={toggle}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${playSize} rounded-full bg-white/[0.93] flex items-center justify-center shadow-[0_4px_12px_rgba(15,23,42,0.13)] transition-opacity ${playing ? "opacity-0 hover:opacity-100" : "opacity-100"}`}
        >
          {playing ? (
            <Pause className={`${playIconSize} text-[#E85D26] fill-[#E85D26]`} />
          ) : (
            <Play className={`${playIconSize} text-[#E85D26] fill-[#E85D26]`} />
          )}
        </button>
      )}
    </div>
  );
}

export default function SocialProofGallery() {
  const [current, setCurrent] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [activeMobileDot, setActiveMobileDot] = useState(0);

  useEffect(() => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / (el.scrollWidth / mobileItems.length));
      setActiveMobileDot(Math.min(idx, mobileItems.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const prev = () =>
    setCurrent((c) => (c === 0 ? desktopItems.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === desktopItems.length - 1 ? 0 : c + 1));

  return (
    <section className="bg-white py-12 lg:py-20">
      {/* ── Header ── */}
      <div className="flex flex-col items-center gap-2 px-5 lg:gap-3 lg:px-0">
        <span className="text-[11px] font-bold tracking-[2px] text-[#E85D26] uppercase lg:text-xs">
          LIFE AT FACULTET
        </span>
        <h2 className="text-[26px] font-extrabold leading-[1.2] text-[#1E293B] text-center lg:text-[36px]">
          <span className="lg:hidden">
            Real Classrooms.{"\n"}Real Students.
          </span>
          <span className="hidden lg:inline">
            Real Classrooms. Real Students.{"\n"}Real Results.
          </span>
        </h2>
        <p className="hidden lg:block text-[17px] text-[#64748B] text-center max-w-[520px]">
          No stock photos. These are our actual students and classes.
        </p>
      </div>

      {/* ── Gallery — Desktop ── */}
      <div className="hidden lg:block mt-12">
        <div className="overflow-hidden px-20">
          <div
            className="flex gap-4 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${current * (280 + 16)}px)` }}
          >
            {desktopItems.map((item, i) => (
              <VideoCard
                key={i}
                item={item}
                className="shrink-0 w-[280px] h-[498px] rounded-[20px] overflow-hidden"
                tagClassName="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-lg bg-[#1E293B]/80 px-3.5 py-2"
                tagIconSize="w-[13px] h-[13px]"
                tagTextSize="text-xs"
                playSize="w-14 h-14"
                playIconSize="w-[22px] h-[22px]"
              />
            ))}
          </div>
        </div>

        {/* Nav buttons */}
        <div className="flex items-center justify-center gap-3 mt-12">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full border-[1.5px] border-[#E2E8F0] bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(15,23,42,0.05)] hover:bg-[#F8FAFC] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#1E293B]" />
          </button>
          <button
            onClick={next}
            className="w-12 h-12 rounded-full bg-[#E85D26] flex items-center justify-center hover:bg-[#D4521E] transition-colors"
          >
            <ArrowRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* ── Gallery — Mobile ── */}
      <div className="lg:hidden mt-6">
        <div ref={mobileScrollRef} className="flex gap-3 px-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {mobileItems.map((item, i) => (
            <VideoCard
              key={i}
              item={item}
              className="shrink-0 w-[200px] h-[356px] rounded-2xl overflow-hidden snap-start"
              tagClassName="absolute top-2.5 left-2.5 z-10 flex items-center gap-[5px] rounded-md bg-[#1E293B]/80 px-2.5 py-1.5"
              tagIconSize="w-[11px] h-[11px]"
              tagTextSize="text-[10px]"
              playSize="w-11 h-11"
              playIconSize="w-[18px] h-[18px]"
            />
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {mobileItems.map((_, i) => (
            <span
              key={i}
              className={`rounded-full transition-all ${
                i === activeMobileDot ? "w-2 h-2 bg-[#E85D26]" : "w-1.5 h-1.5 bg-[#D1D5DB]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
