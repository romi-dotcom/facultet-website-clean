"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Courses", href: "#courses" },
  { label: "About", href: "#about" },
  { label: "Contacts", href: "#contacts" },
];

function scrollToId(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on scroll (with delay to avoid tap-triggered micro-scrolls)
  useEffect(() => {
    if (!menuOpen) return;
    let armed = false;
    const timer = setTimeout(() => { armed = true; }, 300);
    const close = () => { if (armed) setMenuOpen(false); };
    window.addEventListener("scroll", close, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener("scroll", close); };
  }, [menuOpen]);

  return (
    <nav
      className={`sticky top-0 z-[100] bg-white transition-shadow ${
        scrolled ? "shadow-[0_2px_12px_rgba(0,0,0,0.08)]" : ""
      }`}
    >
      {/* ── Main bar ── */}
      <div
        className="flex items-center justify-between h-14 px-5 border-b border-[#E2E8F0]
                   lg:h-16 lg:px-0 lg:border-0 lg:justify-center"
      >
        <div
          className="flex items-center justify-between w-full
                     lg:max-w-[1200px]"
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 lg:gap-2.5">
            <div className="w-7 h-7 rounded-[5px] bg-[#1B8A7E] flex items-center justify-center lg:w-8 lg:h-8 lg:rounded-[6px]">
              <span className="text-[9px] font-bold text-white lg:text-[10px]">
                OLA
              </span>
            </div>
            <span className="text-[15px] font-bold text-[#1E293B] lg:text-base">
              Ola Facultet
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToId(e, link.href.slice(1))}
                className="text-[15px] font-medium text-[#374151] lg:hover:text-[#1E293B] transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Enroll CTA */}
            <a
              href="#courses"
              onClick={(e) => scrollToId(e, "courses")}
              className="btn-pulse rounded-lg bg-accent px-3.5 py-2 text-[13px] font-bold text-white
                         lg:px-6 lg:py-2.5 lg:text-sm lg:hidden"
            >
              Enroll Now
            </a>
            <a
              href="#enrol"
              onClick={(e) => scrollToId(e, "enrol")}
              className="btn-pulse rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white
                         hidden lg:inline-flex"
            >
              Enroll Now →
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden flex items-center justify-center w-6 h-6"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-[#4A5568]" />
              ) : (
                <Menu className="w-6 h-6 text-[#4A5568]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E2E8F0] shadow-[0_4px_16px_rgba(0,0,0,0.1)] px-5 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { setMenuOpen(false); scrollToId(e, link.href.slice(1)); }}
              className="flex items-center h-12 text-base font-medium text-[#1E293B] border-b border-[#F0F0F0] cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
