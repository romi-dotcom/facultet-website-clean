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

async function getMetaAdsData(): Promise<{ spend: number; clicks: number; impressions: number; leads: number }> {
  const res = await fetch(
    `https://graph.facebook.com/v21.0/act_${META_AD_ACCOUNT_ID}/insights?date_preset=yesterday&fields=spend,impressions,actions&action_breakdowns=action_type&access_token=${META_ADS_TOKEN}`
  );
  if (!res.ok) return { spend: 0, clicks: 0, impressions: 0, leads: 0 };

  const data = await res.json();
  const row = data.data?.[0];
  if (!row) return { spend: 0, clicks: 0, impressions: 0, leads: 0 };

  const spend = parseFloat(row.spend || "0");
  const impressions = parseInt(row.impressions || "0");

  let clicks = 0;
  let leads = 0;
  for (const action of row.actions || []) {
    if (action.action_type === "link_click") clicks = parseInt(action.value);
    if (action.action_type === "lead") leads = parseInt(action.value);
  }

  return { spend, clicks, impressions, leads };
}

async function getKommoLeads(): Promise<number> {
  // Get yesterday's date range (UTC)
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const from = Math.floor(yesterday.getTime() / 1000);
  const to = Math.floor(todayStart.getTime() / 1000);

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
    const cr = meta.clicks > 0 ? ((kommoLeads / meta.clicks) * 100).toFixed(1) : "—";

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });

    const lines = [
      `📊 <b>Ежедневный отчёт · ${dateStr}</b>`,
      ``,
      `💰 Расход: <b>€${meta.spend.toFixed(2)}</b>`,
      `👁 Показы: <b>${meta.impressions.toLocaleString()}</b>`,
      `🖱 Клики (посещения): <b>${meta.clicks}</b>`,
      ``,
      `📩 Лиды (Kommo): <b>${kommoLeads}</b>`,
      `📩 Лиды (Meta): <b>${meta.leads}</b>`,
      `💵 CPL: <b>€${cpl}</b>`,
      `📈 CR сайта: <b>${cr}%</b>`,
    ];

    await sendTg(lines.join("\n"));

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Daily report error:", e);
    return NextResponse.json({ error: "Report failed" }, { status: 500 });
  }
}
