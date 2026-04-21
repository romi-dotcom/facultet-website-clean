import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const BASE_URL = "https://pt.facultet.school";
const OG_IMAGE = `${BASE_URL}/images/hero.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "PLA Course for Portuguese Citizenship | Ola Facultet",
    template: "%s | Ola Facultet",
  },
  description:
    "Official 150-hour A2 Portuguese (PLA) course for citizenship in Portugal. DGERT-licensed school, Centro Qualifica partner. Declaração de Matrícula issued within 2 hours. 423+ graduates.",
  keywords: [
    "PLA course Portugal",
    "Portuguese language course citizenship",
    "curso português cidadania",
    "A2 Portuguese certificate",
    "Centro Qualifica course",
    "DGERT licensed language school",
    "Portuguese citizenship documents",
    "learn Portuguese online Portugal",
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Ola Facultet",
    title: "PLA Course for Portuguese Citizenship | Ola Facultet",
    description:
      "Official 150-hour A2 Portuguese course. Required for citizenship applications. DGERT-licensed, Centro Qualifica partner. Declaração de Matrícula in 2 hours. 423+ graduates from 20+ countries.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Ola Facultet — PLA Portuguese Course for Citizenship",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PLA Course for Portuguese Citizenship | Ola Facultet",
    description:
      "Official 150-hour A2 Portuguese course. Required for citizenship. DGERT-licensed. 423+ graduates.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Organization + LocalBusiness JSON-LD (applies to all pages)
const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LanguageSchool", "LocalBusiness"],
      "@id": `${BASE_URL}/#organization`,
      name: "Ola Facultet",
      alternateName: "Facultet School Language Centre",
      description:
        "Official PLA language school offering 150-hour A2 Portuguese programme for citizenship applications in Portugal. DGERT-licensed and Centro Qualifica partner.",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/hero.jpg`,
      },
      image: OG_IMAGE,
      telephone: "+351923296007",
      email: "lingua@facultet.school",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. da República 51",
        addressLocality: "Algés",
        postalCode: "1495-110",
        addressCountry: "PT",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 38.7169,
        longitude: -9.2322,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "10:00",
          closes: "14:00",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "47",
        bestRating: "5",
        worstRating: "1",
      },
      hasCredential: [
        { "@type": "EducationalOccupationalCredential", name: "DGERT Licensed Training Entity" },
        { "@type": "EducationalOccupationalCredential", name: "Centro Qualifica Official Partner" },
      ],
      sameAs: [
        "https://ola.facultet.school",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Ola Facultet",
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="font-inter antialiased">
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WJ3L3MPJ');
        `}</Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WJ3L3MPJ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1688440922046563');
          fbq('track', 'PageView');
        `}</Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1688440922046563&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Script id="tiktok-pixel" strategy="afterInteractive">{`
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
            ttq.load('D6C8HUBC77U3L7SPA61G');
            ttq.page();
          }(window, document, 'ttq');
        `}</Script>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
