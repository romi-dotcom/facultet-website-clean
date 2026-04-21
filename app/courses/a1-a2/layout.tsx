import type { Metadata } from "next";

const BASE_URL = "https://pt.facultet.school";
const PAGE_URL = `${BASE_URL}/courses/a1-a2`;
const OG_IMAGE = `${BASE_URL}/images/hero.jpg`;

export const metadata: Metadata = {
  title: "Portuguese A1 to A2 — PLA Citizenship Course | Ola Facultet",
  description:
    "4-week intensive Portuguese course from A1 to A2. Official PLA certificate for citizenship in Portugal. Already know some basics? Fast-track to A2 in 4 weeks. €310. DGERT-licensed school.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Portuguese A1 to A2 — PLA Citizenship Course | Ola Facultet",
    description:
      "4-week online Portuguese A1→A2 course. Official PLA certificate for Portuguese citizenship. DGERT-licensed. €310 or 3×€104 via Klarna.",
    url: PAGE_URL,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Portuguese A1 to A2 PLA Course — Ola Facultet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portuguese A1 to A2 — PLA Citizenship Course | Ola Facultet",
    description:
      "4-week Portuguese A1→A2 course. Official PLA certificate for citizenship. €310.",
    images: [OG_IMAGE],
  },
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Portuguese A1 to A2 — PLA Citizenship Course",
  description:
    "4-week intensive online Portuguese language course from A1 to A2 level. For those with some basics who need an official PLA certificate for Portuguese citizenship applications. Delivered through Centro Qualifica partner centres.",
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
  teaches: "Portuguese language (A1 to A2) for citizenship applications in Portugal",
  numberOfCredits: 60,
  timeToComplete: "P4W",
  inLanguage: "pt",
  availableLanguage: "en",
  offers: {
    "@type": "Offer",
    price: "310",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: PAGE_URL,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "47",
    bestRating: "5",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Courses", item: `${BASE_URL}/#courses` },
    { "@type": "ListItem", position: 3, name: "Portuguese A1 to A2", item: PAGE_URL },
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
      {children}
    </>
  );
}
