import { NextRequest, NextResponse } from "next/server";

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN!;
const TG_CHAT_ID = process.env.TG_CHAT_ID!;
const META_ADS_TOKEN = process.env.META_ADS_TOKEN!;
const META_AD_ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID!;
const KOMMO_ACCESS_TOKEN = process.env.KOMMO_ACCESS_TOKEN!;
const KOMMO_SUBDOMAIN = "letofacultetschool";
const PIPELINE_ID = 12976892;

async function sendTg(message: string) {
  if (!TG_BOT_TOKEN || !TG_CHAT_ID) return;
  await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: TG_CHAT_ID, text: message, parse_mode: "HTML", disable_web_page_preview: true }),
  });
}

async function getMetaAdsData(): Promise<{ spend: number; landingPageViews: number; impressions: number }> {
  const res = await fetch(
    `https://graph.facebook.com/v21.0/120244722476930580/insights?date_preset=yesterday&fields=spend,impressions,actions&access_token=${META_ADS_TOKEN}`
  );
  if (!res.ok) return { spend: 0, landingPageViews: 0, impressions: 0 };

  const data = await res.json();
  const row = data.data?.[0];
  if (!row) return { spend: 0, landingPageViews: 0, impressions: 0 };

  const spend = parseFloat(row.spend || "0");
  const impressions = parseInt(row.impressions || "0");

  let landingPageViews = 0;
  for (const action of row.actions || []) {
    if (action.action_type === "landing_page_view") landingPageViews = parseInt(action.value);
  }

  return { spend, landingPageViews, impressions };
}

async function getKommoLeads(): Promise<number> {
  // Cron runs at 23:30 UTC = 00:30 Lisbon
  // Lisbon day ends at 23:00 UTC (summer, UTC+1)
  // We want the Lisbon day that just ended: from 23:00 UTC yesterday to 23:00 UTC today
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setUTCHours(23, 0, 0, 0); // 23:00 UTC today = 00:00 Lisbon tomorrow
  const toUTC = Math.floor(endOfDay.getTime() / 1000);
  const fromUTC = toUTC - 86400; // 24 hours before

  const res = await fetch(
    `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/leads?filter[pipeline_id][0]=${PIPELINE_ID}&limit=250&order[created_at]=desc`,
    { headers: { Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}` } }
  );

  if (!res.ok) return 0;
  const data = await res.json();
  const leads = data._embedded?.leads || [];

  // Count leads created between yesterday 00:00 and today 00:00 Lisbon time
  let count = 0;
  for (const lead of leads) {
    const ts = lead.created_at || 0;
    if (ts >= fromUTC && ts < toUTC) count++;
  }
  return count;
}

export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [meta, kommoLeads] = await Promise.all([
      getMetaAdsData(),
      getKommoLeads(),
    ]);

    const cpl = kommoLeads > 0 ? (meta.spend / kommoLeads).toFixed(2) : "—";
    const cr = meta.landingPageViews > 0 ? ((kommoLeads / meta.landingPageViews) * 100).toFixed(1) : "—";

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });

    const lines = [
      `📊 <b>Ежедневный отчёт · ${dateStr}</b>`,
      ``,
      `💰 Расход: <b>€${meta.spend.toFixed(2)}</b>`,
      `👁 Показы: <b>${meta.impressions.toLocaleString()}</b>`,
      `🖱 Просмотры страницы: <b>${meta.landingPageViews}</b>`,
      `📩 Лиды: <b>${kommoLeads}</b>`,
      ``,
      `💵 CPL: <b>€${cpl}</b>`,
      `📈 Конверсия сайта: <b>${cr}%</b>`,
    ];

    await sendTg(lines.join("\n"));

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Daily report error:", e);
    return NextResponse.json({ error: "Report failed" }, { status: 500 });
  }
}
