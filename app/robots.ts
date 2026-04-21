import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/thank-you", "/api/"],
      },
      // Allow major AI crawlers explicitly
      { userAgent: "GPTBot",      allow: "/" },
      { userAgent: "ClaudeBot",   allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Applebot",    allow: "/" },
      { userAgent: "Bingbot",     allow: "/" },
    ],
    sitemap: "https://pt.facultet.school/sitemap.xml",
  };
}
