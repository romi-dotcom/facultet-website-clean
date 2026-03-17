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
    `https://graph.facebook.com/v21.0/120244722476930580/insights?date_preset=today&fields=spend,impressions,actions&access_token=${META_ADS_TOKEN}`
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
  // Get today's date range (Lisbon = UTC+0 winter / UTC+1 summer)
  // Cron runs at 23:05 UTC = 00:05 Lisbon, so "today" in UTC = the day we report on
  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setUTCHours(0, 0, 0, 0);

  const from = Math.floor(todayStart.getTime() / 1000);
  const to = Math.floor(now.getTime() / 1000);

  const res = await fetch(
    `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/leads?filter[pipeline_id][0]=${PIPELINE_ID}&filter[created_at][from]=${from}&filter[created_at][to]=${to}&limit=250`,
    { headers: { Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}` } }
  );

  if (!res.ok) return 0;
  const data = await res.json();
  const leads = data._embedded?.leads || [];
  return leads.length;
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

    const today = new Date();
    const dateStr = today.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });

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
