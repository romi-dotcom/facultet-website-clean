"use client";

import {
  Phone,
  Mail,
  MessageCircle,
  Timer,
  Instagram,
  Send,
  ShieldCheck,
  Award,
  CircleCheck,
  User,
} from "lucide-react";
import { useLeadForm } from "@/hooks/useLeadForm";
import CountryCodePicker from "@/components/CountryCodePicker";

export default function FinalCTA() {
  const form = useLeadForm("Homepage");
  return (
    <section id="enrol">
      {/* ── CTA Block — Desktop ── */}
      <div
        className="hidden lg:flex justify-center py-20"
        style={{
          background: "linear-gradient(180deg, #FFF7F4 0%, #F8FAFC 100%)",
        }}
      >
        <div className="flex gap-20 w-[1100px]">
          {/* Left Column */}
          <div className="flex-1 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-6">
              <span className="text-xs font-bold tracking-[2px] text-[#1B8A7E]">
                ENROLL NOW
              </span>
              <h2 className="text-[36px] font-extrabold leading-[1.1] tracking-[-0.5px] text-[#1E293B]">
                Enroll Today — Start Your PLA Course with Official Documents
              </h2>
              <p className="text-[15px] leading-[1.6] text-[#64748B]">
                150-hour A2 Portuguese programme. Declaração de Matrícula issued
                upon enrolment. Recognised by Portuguese authorities for
                citizenship applications.
              </p>

              {/* Urgency */}
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                <span className="text-[13px] font-bold text-[#C2410C]">
                  Next group: March 31 · Only 6 spots left
                </span>
              </div>

              {/* Stats Row */}
              <div className="flex items-center">
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-[28px] font-extrabold text-[#E85D26]">
                    423+
                  </span>
                  <span className="text-[13px] text-[#64748B]">
                    Students enrolled
                  </span>
                </div>
                <div className="w-px h-12 bg-[#E2E8F0]" />
                <div className="flex flex-col gap-1 flex-1 pl-6">
                  <span className="text-[28px] font-extrabold text-[#E85D26]">
                    100%
                  </span>
                  <span className="text-[13px] text-[#64748B]">
                    Gov. recognised
                  </span>
                </div>
                <div className="w-px h-12 bg-[#E2E8F0]" />
                <div className="flex flex-col gap-1 flex-1 pl-6">
                  <span className="text-[28px] font-extrabold text-[#E85D26]">
                    150h
                  </span>
                  <span className="text-[13px] text-[#64748B]">
                    Programme hours
                  </span>
                </div>
              </div>
            </div>

            {/* Mini Review */}
            <div className="flex items-center gap-3.5 rounded-[14px] border border-[#E2E8F0] bg-white px-5 py-4">
              <img src="/images/cta-avatar.png" alt="Maria Fernandes" className="w-10 h-10 rounded-[20px] object-cover shrink-0" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-bold text-[#1E293B]">
                  Maria Fernandes · Brazil → Lisbon
                </span>
                <span className="text-[13px] text-[#64748B]">
                  &ldquo;Enrolled in the morning, had my Declaração de Matrícula
                  the same day.&rdquo;
                </span>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <form noValidate onSubmit={form.handleSubmit} className="flex flex-col gap-3 w-[460px] shrink-0 rounded-[20px] border-2 border-[#E85D26] bg-white p-8 shadow-[0_8px_32px_rgba(232,93,38,0.13)]">
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => form.setName(e.target.value)}
              className="h-[52px] rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-[15px] text-[#1E293B] placeholder:text-[#9CA3AF] outline-none focus:border-[#E85D26] transition-colors"
            />
            <input
              type="email"
              placeholder="Your email address"
              value={form.email}
              onChange={(e) => form.setEmail(e.target.value)}
              className="h-[52px] rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-[15px] text-[#1E293B] placeholder:text-[#9CA3AF] outline-none focus:border-[#E85D26] transition-colors"
            />
            <div className="flex items-center gap-2 h-[52px] rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 focus-within:border-[#E85D26] transition-colors">
              <CountryCodePicker value={form.countryCode} onChange={form.setCountryCode} />
              <div className="w-px h-5 bg-[#E2E8F0]" />
              <input
                type="tel"
                placeholder="WhatsApp / Phone"
                maxLength={15}
                value={form.phone}
                onChange={(e) => form.setPhone(e.target.value)}
                className="flex-1 bg-transparent text-[15px] text-[#1E293B] placeholder:text-[#9CA3AF] outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={form.status === "loading"}
              className="btn-pulse flex items-center justify-center h-[52px] rounded-full bg-[#E85D26] text-base font-bold text-white shadow-[0_2px_8px_rgba(232,93,38,0.19)] hover:bg-[#CC4D1E] transition-colors disabled:opacity-60"
            >
              {form.status === "loading" ? "Sending..." : form.status === "success" ? "Sent ✓" : "Enroll Now →"}
            </button>
            {form.formError && (
              <p className="text-xs text-red-500">{form.formError}</p>
            )}
            {form.status === "error" && (
              <p className="text-xs text-red-500 text-center">Something went wrong. Please try again.</p>
            )}
            <div className="flex items-center justify-center py-1">
              <span className="text-[13px] text-[#9CA3AF]">— or —</span>
            </div>
            <a href="https://api.whatsapp.com/send/?phone=351923296007&text=Hello%21+I%27d+like+to+learn+more+about+your+Portuguese+language+courses.&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-[52px] rounded-full border-[1.5px] border-[#25D366] bg-white text-[15px] font-semibold text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors">
              Message us on WhatsApp
            </a>
            <p className="text-xs text-[#94A3B8] text-center">
              Free consultation · No obligation · We reply within 1 day
            </p>
            <p className="text-[10px] text-[#94A3B8] text-center leading-[1.4]">
              By clicking &quot;Enroll Now&quot;, you agree to our <a href="https://ola.facultet.school/public-offer" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#64748B]">Public Offer</a> and <a href="#" className="underline hover:text-[#64748B]">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>

      {/* ── CTA Block — Mobile ── */}
      <div
        className="lg:hidden flex flex-col items-center gap-5 px-5 py-12"
        style={{
          background: "linear-gradient(180deg, #FFF7F4 0%, #F8FAFC 100%)",
        }}
      >
        <span className="text-[11px] font-bold tracking-[2px] text-[#1B8A7E]">
          ENROLL NOW
        </span>
        <h2 className="text-[26px] font-extrabold leading-[1.2] tracking-[-0.5px] text-[#1E293B] text-center">
          Enroll Today — Start Your PLA Course with Official Documents
        </h2>
        <p className="text-sm leading-[1.6] text-[#64748B] text-center">
          150-hour A2 Portuguese programme. Declaração de Matrícula issued upon
          enrolment. Recognised by Portuguese authorities.
        </p>

        {/* Urgency */}
        <div className="flex items-center justify-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
          <span className="text-[13px] font-bold text-[#C2410C]">
            Next group: March 31 · Only 6 spots left
          </span>
        </div>

        {/* Stats Row */}
        <div className="flex items-center w-full">
          <div className="flex flex-col items-center gap-[3px] flex-1">
            <span className="text-[22px] font-extrabold text-[#E85D26]">
              423+
            </span>
            <span className="text-xs text-[#64748B]">Students</span>
          </div>
          <div className="w-px h-9 bg-[#E2E8F0]" />
          <div className="flex flex-col items-center gap-[3px] flex-1">
            <span className="text-[22px] font-extrabold text-[#E85D26]">
              150h
            </span>
            <span className="text-xs text-[#64748B]">Programme</span>
          </div>
          <div className="w-px h-9 bg-[#E2E8F0]" />
          <div className="flex flex-col items-center gap-[3px] flex-1">
            <span className="text-[22px] font-extrabold text-[#E85D26]">
              100%
            </span>
            <span className="text-xs text-[#64748B]">Gov. recognised</span>
          </div>
        </div>

        {/* Form Card */}
        <form noValidate onSubmit={form.handleSubmit} className="flex flex-col gap-3 w-full rounded-[20px] border-2 border-[#E85D26] bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.05)]">
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => form.setName(e.target.value)}
            className="h-[52px] rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-[15px] text-[#1E293B] placeholder:text-[#9CA3AF] outline-none focus:border-[#E85D26] transition-colors"
          />
          <input
            type="email"
            placeholder="Your email address"
            value={form.email}
            onChange={(e) => form.setEmail(e.target.value)}
            className="h-[52px] rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-[15px] text-[#1E293B] placeholder:text-[#9CA3AF] outline-none focus:border-[#E85D26] transition-colors"
          />
          <div className="flex items-center gap-2 h-[52px] rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 focus-within:border-[#E85D26] transition-colors">
            <CountryCodePicker value={form.countryCode} onChange={form.setCountryCode} />
            <div className="w-px h-5 bg-[#E2E8F0]" />
            <input
              type="tel"
              placeholder="WhatsApp / Phone"
              value={form.phone}
              onChange={(e) => form.setPhone(e.target.value)}
              className="flex-1 bg-transparent text-[15px] text-[#1E293B] placeholder:text-[#9CA3AF] outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={form.status === "loading"}
            className="btn-pulse flex items-center justify-center h-[52px] rounded-full bg-[#E85D26] text-base font-bold text-white shadow-[0_2px_8px_rgba(232,93,38,0.19)] hover:bg-[#CC4D1E] transition-colors disabled:opacity-60"
          >
            {form.status === "loading" ? "Sending..." : form.status === "success" ? "Sent ✓" : "Enroll Now →"}
          </button>
          {form.status === "error" && (
            <p className="text-xs text-red-500 text-center">Something went wrong. Please try again.</p>
          )}
          <div className="flex items-center justify-center">
            <span className="text-[13px] text-[#9CA3AF]">— or —</span>
          </div>
          <a href="https://api.whatsapp.com/send/?phone=351923296007&text=Hello%21+I%27d+like+to+learn+more+about+your+Portuguese+language+courses.&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-[52px] rounded-full border-[1.5px] border-[#25D366] bg-white text-[15px] font-semibold text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors">
            Message us on WhatsApp
          </a>
          <p className="text-xs text-[#94A3B8] text-center">
            Free consultation · No obligation · We reply within 1 day
          </p>
          <p className="text-[10px] text-[#94A3B8] text-center leading-[1.4]">
            By clicking &quot;Enroll Now&quot;, you agree to our <a href="https://ola.facultet.school/public-offer" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#64748B]">Public Offer</a> and <a href="#" className="underline hover:text-[#64748B]">Privacy Policy</a>.
          </p>
        </form>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-[#1E293B]">
        {/* Desktop Footer */}
        <div className="hidden lg:block max-w-[1100px] mx-auto pt-14 pb-10">
          <div className="flex gap-10 justify-between">
            {/* Brand */}
            <div className="flex flex-col gap-2.5 w-[320px]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-[#1B8A7E] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">OLA</span>
                </div>
                <span className="text-base font-bold text-white">
                  Ola Facultet
                </span>
              </div>
              <span className="text-[13px] text-[#94A3B8]">
                Facultet School Language Centre
              </span>
              <span className="text-[13px] text-[#64748B]">
                Av. da República 51, 1495-110 Algés, Portugal
              </span>
              <p className="text-[13px] leading-[1.6] text-[#64748B] max-w-[280px]">
                Official PLA language school. A2 Portuguese programme recognised
                by Portuguese authorities and embassies.
              </p>
              <div className="flex gap-2 mt-1">
                {[
                  { icon: Instagram, color: "text-white" },
                  { icon: MessageCircle, color: "text-[#25D366]" },
                  { icon: Send, color: "text-white" },
                ].map(({ icon: Icon, color }, i) => (
                  <a
                    key={i}
                    href={i === 1 ? "https://api.whatsapp.com/send/?phone=351923296007&text=Hello%21+I%27d+like+to+learn+more+about+your+Portuguese+language+courses.&type=phone_number&app_absent=0" : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/[0.07] border border-white/[0.08] flex items-center justify-center"
                  >
                    <Icon className={`w-4 h-4 ${color}`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Contacts */}
            <div className="flex flex-col gap-2.5 w-[220px]">
              <span className="text-[10px] font-bold tracking-[1.5px] text-[#64748B]">
                CONTACTS
              </span>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#64748B]" />
                <span className="text-sm text-[#E2E8F0]">
                  +351 923 296 007
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#64748B]" />
                <span className="text-sm text-[#1B8A7E]">
                  ola@facultet.school
                </span>
              </div>
              <a href="https://api.whatsapp.com/send/?phone=351923296007&text=Hello%21+I%27d+like+to+learn+more+about+your+Portuguese+language+courses.&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-[#64748B]" />
                <span className="text-sm text-[#25D366]">
                  WhatsApp: +351 923 296 007
                </span>
              </a>
              <div className="flex items-center gap-1.5">
                <Timer className="w-3.5 h-3.5 text-[#64748B]" />
                <span className="text-[13px] text-[#64748B]">
                  Mon–Fri 9:00–18:00 · Sat 10:00–14:00
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-2.5 w-[140px]">
              <span className="text-[10px] font-bold tracking-[1.5px] text-[#64748B]">
                QUICK LINKS
              </span>
              <a href="#courses" className="text-sm text-[#E2E8F0]">
                Courses & Pricing
              </a>
              <a href="#programme" className="text-sm text-[#E2E8F0]">
                Programme
              </a>
              <a href="#faq" className="text-sm text-[#E2E8F0]">
                FAQ
              </a>
              <a href="#" className="text-sm text-[#64748B]">
                Privacy Policy
              </a>
            </div>

            {/* Accredited By */}
            <div className="flex flex-col gap-3 w-[180px]">
              <span className="text-[10px] font-bold tracking-[1.5px] text-[#64748B]">
                ACCREDITED BY
              </span>
              {[
                { icon: ShieldCheck, text: "DGERT Licensed" },
                { icon: Award, text: "Centro Qualifica" },
                { icon: CircleCheck, text: "Gov. Recognised" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 rounded-lg bg-white/[0.04] border border-white/[0.07] px-3 py-2"
                >
                  <Icon className="w-3.5 h-3.5 text-[#1B8A7E]" />
                  <span className="text-xs font-semibold text-[#E2E8F0]">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#334155] mt-8" />

          {/* Bottom */}
          <div className="flex items-center justify-between pt-6">
            <span className="text-xs text-[#64748B]">
              © 2026 Facultet School · All rights reserved
            </span>
            <span className="text-xs text-[#64748B]">
              Terms of Use · Privacy Policy · Cookies · <a href="https://ola.facultet.school/public-offer" target="_blank" rel="noopener noreferrer" className="hover:text-[#94A3B8] transition-colors">Public Offer</a>
            </span>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden">
          <div className="h-px bg-[#334155]" />

          {/* Brand */}
          <div className="flex flex-col gap-3 px-5 pt-8 pb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-[#1B8A7E] flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">OLA</span>
              </div>
              <span className="text-base font-bold text-white">
                Ola Facultet
              </span>
            </div>
            <span className="text-[13px] text-[#94A3B8]">
              Facultet School Language Centre
            </span>
            <span className="text-[13px] leading-[1.5] text-[#64748B]">
              Av. da República 51, 1495-110 Algés, Portugal
            </span>
            <p className="text-xs leading-[1.6] text-[#64748B]">
              Official PLA language school. A2 Portuguese programme recognised by
              Portuguese authorities and embassies.
            </p>
            <div className="flex gap-2">
              {[
                { icon: Instagram, color: "text-white" },
                { icon: MessageCircle, color: "text-[#25D366]" },
                { icon: Send, color: "text-white" },
              ].map(({ icon: Icon, color }, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-lg bg-white/[0.07] border border-white/[0.08] flex items-center justify-center"
                >
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#334155]" />

          {/* Contacts */}
          <div className="flex flex-col gap-3 px-5 py-6">
            <span className="text-[10px] font-bold tracking-[1.5px] text-[#64748B]">
              CONTACTS
            </span>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#64748B]" />
              <span className="text-sm text-[#E2E8F0]">+351 923 296 007</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#64748B]" />
              <span className="text-sm text-[#1B8A7E]">
                ola@facultet.school
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5 text-[#64748B]" />
              <span className="text-sm text-[#25D366]">
                WhatsApp: +351 923 296 007
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Timer className="w-3.5 h-3.5 text-[#64748B]" />
              <span className="text-[13px] text-[#64748B]">
                Mon–Fri 9:00–18:00 · Sat 10:00–14:00
              </span>
            </div>
          </div>

          <div className="h-px bg-[#334155]" />

          {/* Links + Trust */}
          <div className="flex gap-5 px-5 py-6">
            <div className="flex flex-col gap-2.5 flex-1">
              <span className="text-[10px] font-bold tracking-[1.5px] text-[#64748B]">
                QUICK LINKS
              </span>
              <a href="#courses" className="text-sm text-[#E2E8F0]">
                Courses & Pricing
              </a>
              <a href="#programme" className="text-sm text-[#E2E8F0]">
                Programme
              </a>
              <a href="#faq" className="text-sm text-[#E2E8F0]">
                FAQ
              </a>
              <a href="#" className="text-sm text-[#64748B]">
                Privacy Policy
              </a>
            </div>
            <div className="flex flex-col gap-2.5 flex-1">
              <span className="text-[10px] font-bold tracking-[1.5px] text-[#64748B]">
                ACCREDITED BY
              </span>
              {[
                { icon: ShieldCheck, text: "DGERT" },
                { icon: Award, text: "Centro Qualifica" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-1.5 rounded-md bg-white/[0.04] border border-white/[0.07] px-2.5 py-[7px]"
                >
                  <Icon className="w-3 h-3 text-[#1B8A7E]" />
                  <span className="text-[11px] font-semibold text-[#E2E8F0]">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#334155]" />

          {/* Bottom */}
          <div className="flex flex-col items-center gap-1.5 px-5 py-5 pb-12">
            <span className="text-xs text-[#64748B] text-center">
              © 2026 Facultet School · All rights reserved
            </span>
            <span className="text-xs text-[#64748B] text-center">
              Terms of Use · Privacy Policy · Cookies · <a href="https://ola.facultet.school/public-offer" target="_blank" rel="noopener noreferrer" className="hover:text-[#94A3B8] transition-colors">Public Offer</a>
            </span>
          </div>
        </div>
      </footer>
    </section>
  );
}
