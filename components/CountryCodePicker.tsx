"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { countryCodes } from "@/lib/countryCodes";

interface Props {
  value: string;
  onChange: (code: string) => void;
  className?: string;
}

export default function CountryCodePicker({ value, onChange, className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = countryCodes.find((c) => c.code === value) || countryCodes[0];

  const filtered = search.trim()
    ? countryCodes.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.code.includes(search)
      )
    : countryCodes;

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Focus search input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setSearch("");
    }
  }, [open]);

  return (
    <div ref={ref} className={`relative shrink-0 ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 bg-transparent text-sm font-bold text-[#4A5568] outline-none cursor-pointer"
      >
        <span>{selected.flag}</span>
        <span>{selected.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#94A3B8] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-full mt-2 w-[240px] bg-white border border-[#E2E8F0] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] z-50 overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-[#E2E8F0]">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              className="w-full h-9 px-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#1E293B] placeholder:text-[#9CA3AF] outline-none"
            />
          </div>
          {/* List */}
          <div className="max-h-[200px] overflow-y-auto">
            {filtered.length === 0 && (
              <p className="text-sm text-[#9CA3AF] text-center py-4">No results</p>
            )}
            {filtered.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => { onChange(c.code); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left hover:bg-[#F8FAFC] transition-colors ${
                  c.code === value ? "bg-[#F0FDF4]" : ""
                }`}
              >
                <span className="text-base">{c.flag}</span>
                <span className="text-sm text-[#1E293B] flex-1">{c.name}</span>
                <span className="text-xs text-[#64748B]">{c.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
