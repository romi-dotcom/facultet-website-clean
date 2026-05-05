import { NextRequest, NextResponse } from "next/server";

const HOST = "pt.facultet.school";
const KEY = "20eb76b98106395617437075bf557d7c0c28733f355766108b01173dc5d920be";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const DEFAULT_URLS = [
  `https://${HOST}/`,
  `https://${HOST}/courses/a0-a2`,
];

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET ?? ""}`;
  if (!process.env.CRON_SECRET || auth !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let urlList: string[] = DEFAULT_URLS;
  try {
    const body = await req.json();
    if (Array.isArray(body?.urls) && body.urls.length > 0) {
      urlList = body.urls.filter((u: unknown): u is string => typeof u === "string" && u.startsWith(`https://${HOST}/`));
    }
  } catch {
    // empty body — use defaults
  }

  if (urlList.length === 0) {
    return NextResponse.json({ error: "no valid urls" }, { status: 400 });
  }

  const r = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });

  return NextResponse.json({
    submitted: urlList.length,
    indexnowStatus: r.status,
    indexnowOk: r.ok,
  }, { status: r.ok ? 200 : 502 });
}
