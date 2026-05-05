import type { Metadata } from "next";
import NavBar from "@/components/sections/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import DocumentsTimeline from "@/components/sections/DocumentsTimeline";
import WhyOnline from "@/components/sections/WhyOnline";
import Courses from "@/components/sections/Courses";
import CourseProgramme from "@/components/sections/CourseProgramme";
import Certifications from "@/components/sections/Certifications";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import SocialProofGallery from "@/components/sections/SocialProofGallery";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

const BASE_URL = "https://pt.facultet.school";

export const metadata: Metadata = {
  title: "PLA Course for Portuguese Citizenship | Ola Facultet",
  description:
    "Official 150-hour A2 Portuguese (PLA) course for citizenship in Portugal. DGERT-licensed, Centro Qualifica partner. Declaração de Matrícula within 2 hours. 423+ graduates from 20+ countries.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "PLA Course for Portuguese Citizenship | Ola Facultet",
    description:
      "Official 150-hour A2 Portuguese course required for citizenship. DGERT-licensed school. Official documents in 2 hours. 423+ graduates from 20+ countries.",
    url: BASE_URL,
  },
};

// FAQPage JSON-LD — all 9 Q&As from the FAQ section
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["#faq summary", "#faq details > div"],
  },
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the PLA certificate required for Portuguese citizenship?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The PLA course completion certificate is one of the required documents for your Portuguese citizenship application. Ola Facultet courses are delivered through official Centro Qualifica partner centres, and all documents are recognised by the relevant Portuguese authorities.",
      },
    },
    {
      "@type": "Question",
      name: "Can I enroll today and get documents immediately?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Upon enrollment you receive the Declaração de Matrícula (official matriculation certificate) within 2 hours by email. This document confirms your enrollment in a DGERT-licensed language school and can be submitted as part of your citizenship application package right away.",
      },
    },
    {
      "@type": "Question",
      name: "Is the certificate valid for citizenship and family reunification in Portugal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Certificates are issued through Centro Qualifica partner centres and are officially recognised by Portuguese authorities, including for citizenship applications and family reunification procedures.",
      },
    },
    {
      "@type": "Question",
      name: "What language are Portuguese classes taught in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All classes are taught in English. This allows students from different countries to study comfortably. Basic English proficiency is sufficient — you don't need to be fluent to understand grammar explanations and course materials.",
      },
    },
    {
      "@type": "Question",
      name: "What if I miss a lesson?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All lessons are recorded and available 24/7 on the learning platform. You can catch up at any time. Your teacher and group chat are always available for questions.",
      },
    },
    {
      "@type": "Question",
      name: "How long does the PLA Portuguese course take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The full A0 to A2 PLA course takes 16 weeks with 3 live sessions per week (Tuesday, Thursday, Saturday), each 3 hours. Total: 150 academic hours. If you already have A1 level basics, the A1 to A2 course takes 4 weeks.",
      },
    },
    {
      "@type": "Question",
      name: "Who is the PLA course for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The course is designed for adults aged 18 and above already living in Portugal who are planning to apply for Portuguese citizenship or family reunification. No prior Portuguese knowledge required — we start from zero.",
      },
    },
    {
      "@type": "Question",
      name: "How do I enroll in the PLA course?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fill in the enrollment form on our website, choose your preferred group and schedule, and complete the payment. Within 24 hours you'll receive your contract and official matriculation number by email. Declaração de Matrícula is issued within 2 hours.",
      },
    },
    {
      "@type": "Question",
      name: "Can I pay for the Portuguese course in installments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Ola Facultet offers a 3-installment plan via Klarna at no extra cost (0% interest). You can also pay the full amount upfront with a card or bank transfer.",
      },
    },
  ],
};

// BreadcrumbList for homepage
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: BASE_URL,
    },
  ],
};

export default function Home() {
  return (
    <main>
      {/* JSON-LD schemas — invisible to users, readable by search engines and AI */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <NavBar />
      <HeroSection />
      <TrustBar />
      <DocumentsTimeline />
      <WhyOnline />
      <div id="programme">
        <CourseProgramme />
      </div>
      <Certifications />
      <div id="about">
        <HowItWorks />
        <Testimonials />
        <SocialProofGallery />
      </div>
      <div id="courses">
        <Courses />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      <div id="contacts">
        <FinalCTA />
      </div>
    </main>
  );
}
