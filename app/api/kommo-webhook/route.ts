import { NextRequest, NextResponse } from "next/server";

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN!;
const TG_CHAT_ID = process.env.TG_CHAT_ID!;
const KOMMO_SUBDOMAIN = "letofacultetschool";
const KOMMO_ACCESS_TOKEN = process.env.KOMMO_ACCESS_TOKEN!;

async function sendTg(message: string) {
  if (!TG_BOT_TOKEN || !TG_CHAT_ID) return;
  await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: TG_CHAT_ID, text: message, parse_mode: "HTML" }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const rawText = await req.text();
    const params = new URLSearchParams(rawText);

    // Check if this is a lead add event
    const leadId = params.get("leads[add][0][id]");
    if (!leadId) {
      return NextResponse.json({ ok: true });
    }

    // Extract data directly from webhook params
    const leadName = params.get("leads[add][0][name]") || "New lead";
    const responsibleUser = params.get("leads[add][0][responsible_user_id]") || "";
    const pipelineId = params.get("leads[add][0][pipeline_id]") || "";

    // Try to get contact name from webhook
    const contactName = params.get("contacts[add][0][name]") || "";
    const contactPhone = params.get("contacts[add][0][custom_fields][0][values][0][value]") || "";

    // Check source via Kommo API (one fast call)
    let source = "Сайт";
    try {
      const leadRes = await fetch(
        `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/leads/${leadId}?with=source_id`,
        { headers: { Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}` } }
      );
      if (leadRes.ok) {
        const leadData = await leadRes.json();
        if (leadData.source_id) {
          source = "WhatsApp";
        }
      }
    } catch {
      // fallback to "Сайт"
    }

    const name = contactName || leadName;

    const lines = [
      `📩 <b>Новая заявка!</b>`,
      ``,
      `👤 <b>${name}</b>`,
      contactPhone ? `📱 ${contactPhone}` : "",
      `📊 Источник: <b>${source}</b>`,
      `🔗 <a href="https://letofacultetschool.kommo.com/leads/detail/${leadId}">Открыть в Kommo</a>`,
    ].filter(Boolean);

    await sendTg(lines.join("\n"));

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Kommo webhook error:", e);
    // Try to send error alert
    try {
      await sendTg(`🚨 Webhook error: ${String(e).slice(0, 200)}`);
    } catch {}
    return NextResponse.json({ ok: true });
  }
}
