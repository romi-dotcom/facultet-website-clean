import { NextRequest, NextResponse } from "next/server";

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN!;
const TG_CHAT_ID = process.env.TG_CHAT_ID!;
const KOMMO_SUBDOMAIN = "letofacultetschool";
const KOMMO_ACCESS_TOKEN = process.env.KOMMO_ACCESS_TOKEN!;

async function sendTg(message: string) {
  if (!TG_BOT_TOKEN || !TG_CHAT_ID) return;
  try {
    await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TG_CHAT_ID, text: message, parse_mode: "HTML" }),
    });
  } catch (err) {
    console.error("Telegram send error:", err);
  }
}

async function getContactInfo(contactId: number): Promise<{ name: string; phone: string; email: string }> {
  const res = await fetch(
    `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/contacts/${contactId}`,
    { headers: { Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}` } }
  );
  if (!res.ok) return { name: "Unknown", phone: "", email: "" };

  const data = await res.json();
  const name = data.name || "Unknown";
  let phone = "";
  let email = "";

  for (const field of data.custom_fields_values || []) {
    if (field.field_code === "PHONE") phone = field.values?.[0]?.value || "";
    if (field.field_code === "EMAIL") email = field.values?.[0]?.value || "";
  }

  return { name, phone, email };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Kommo sends leads[add] for new leads
    const newLeads = body?.leads?.add;
    if (!newLeads || !Array.isArray(newLeads)) {
      return NextResponse.json({ ok: true });
    }

    for (const lead of newLeads) {
      const leadName = lead.name || "New lead";
      const pipelineName = lead.pipeline_id || "";
      const contactId = lead.contact_id;

      let contactInfo = { name: "", phone: "", email: "" };
      if (contactId) {
        contactInfo = await getContactInfo(Number(contactId));
      }

      const source = lead.utm_source || lead.source || "";

      const lines = [
        `📩 <b>Новая заявка!</b>`,
        ``,
        `👤 <b>${contactInfo.name || leadName}</b>`,
        contactInfo.phone ? `📱 ${contactInfo.phone}` : "",
        contactInfo.email ? `📧 ${contactInfo.email}` : "",
        source ? `📊 Источник: ${source}` : "",
      ].filter(Boolean);

      await sendTg(lines.join("\n"));
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Kommo webhook error:", e);
    return NextResponse.json({ ok: true });
  }
}
