import type { Metadata } from "next";

const BASE_URL = "https://pt.facultet.school";
const PAGE_URL = `${BASE_URL}/courses/a0-a2`;
const OG_IMAGE = `${BASE_URL}/images/hero.jpg`;

export const metadata: Metadata = {
  title: "Portuguese A0 to A2 — PLA Citizenship Course | Ola Facultet",
  description:
    "150-hour online Portuguese course from absolute beginner (A0) to A2. Official PLA certificate for citizenship in Portugal. DGERT-licensed, Centro Qualifica partner. Starts April 28. €470.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Portuguese A0 to A2 — PLA Citizenship Course | Ola Facultet",
    description:
      "150-hour online Portuguese course from A0 to A2. Official certificate for Portuguese citizenship. DGERT-licensed school. Starts April 28. €470 or 3×€157 via Klarna.",
    url: PAGE_URL,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Portuguese A0 to A2 PLA Course — Ola Facultet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portuguese A0 to A2 — PLA Citizenship Course | Ola Facultet",
    description:
      "150-hour online Portuguese A0→A2 course. Official PLA certificate for citizenship. €470.",
    images: [OG_IMAGE],
  },
};

// Course JSON-LD schema
const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Portuguese A0 to A2 — PLA Citizenship Course",
  description:
    "150-hour online Portuguese language course from absolute beginner (A0) to A2 level. Officially recognised PLA certificate required for Portuguese citizenship applications. Delivered through Centro Qualifica partner centres.",
  url: PAGE_URL,
  provider: {
    "@type": "LanguageSchool",
    name: "Ola Facultet",
    url: BASE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. da República 51",
      addressLocality: "Algés",
      postalCode: "1495-110",
      addressCountry: "PT",
    },
  },
  courseMode: ["online", "onsite"],
  educationalLevel: "A2",
  teaches: "Portuguese language (A0 to A2) for citizenship applications in Portugal",
  numberOfCredits: 150,
  timeToComplete: "P16W",
  inLanguage: "pt",
  availableLanguage: "en",
  courseSchedule: {
    "@type": "Schedule",
    repeatFrequency: "P1W",
    byDay: ["Tuesday", "Thursday", "Saturday"],
    startTime: "09:00",
    endTime: "12:00",
  },
  hasCourseInstance: [
    {
      "@type": "CourseInstance",
      name: "April 2026 cohort",
      startDate: "2026-04-28",
      endDate: "2026-07-22",
      courseMode: "online",
      location: {
        "@type": "VirtualLocation",
        url: "https://zoom.us",
      },
      offers: {
        "@type": "Offer",
        price: "470",
        priceCurrency: "EUR",
        availability: "https://schema.org/LimitedAvailability",
        validFrom: "2026-01-01",
      },
    },
  ],
  offers: {
    "@type": "Offer",
    price: "470",
    priceCurrency: "EUR",
    priceValidUntil: "2026-04-28",
    availability: "https://schema.org/LimitedAvailability",
    url: PAGE_URL,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "47",
    bestRating: "5",
  },
};

// BreadcrumbList
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Courses", item: `${BASE_URL}/#courses` },
    { "@type": "ListItem", position: 3, name: "Portuguese A0 to A2", item: PAGE_URL },
  ],
};

// FAQ specific to this course page
const courseFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the PLA Portuguese course A0 to A2?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The PLA (Português Língua de Acolhimento) A0 to A2 course is a 150-hour government-recognised Portuguese language programme for people living in Portugal who need an official A2 certificate for their citizenship application. The course runs 16 weeks with 3 live online sessions per week.",
      },
    },
    {
      "@type": "Question",
      name: "How much does the Portuguese citizenship course cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The A0 to A2 PLA course costs €470 (reduced from €590, saving €120). You can pay in 3 installments of €157 via Klarna at 0% interest, or pay the full amount by card or bank transfer.",
      },
    },
    {
      "@type": "Question",
      name: "What documents do I get from this Portuguese course?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upon enrollment you receive the Declaração de Matrícula within 2 hours — required immediately for citizenship applications. After completing 150 hours you receive the official A2 PLA Certificate (Certificado de Aprovação) issued through Centro Qualifica, recognised by Portuguese authorities for citizenship and family reunification.",
      },
    },
    {
      "@type": "Question",
      name: "Can I study Portuguese online from anywhere in Portugal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All classes are held via Zoom. You only need a phone or laptop. Every session is recorded with lifetime access, so you can study from anywhere in Portugal — Lisbon, Porto, Braga, Faro, or any other city.",
      },
    },
  ],
};

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseFaqSchema) }}
      />
      {children}
    </>
  );
}
