import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

const KOMMO_SUBDOMAIN = "letofacultetschool";
const KOMMO_ACCESS_TOKEN = process.env.KOMMO_ACCESS_TOKEN!;
const PIPELINE_ID = 12976892;

const META_PIXEL_ID = process.env.META_PIXEL_ID!;
const META_CAPI_TOKEN = process.env.META_CAPI_TOKEN!;

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN!;
const TG_CHAT_ID = process.env.TG_CHAT_ID!;

async function sendTgAlert(message: string) {
  if (!TG_BOT_TOKEN || !TG_CHAT_ID) return;
  try {
    await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TG_CHAT_ID, text: message, parse_mode: "HTML", disable_web_page_preview: true }),
    });
  } catch (err) {
    console.error("Telegram alert error:", err);
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

/** Fetch lead custom field IDs by name (cached in memory for the process lifetime) */
let fieldMapCache: Record<string, number> | null = null;

async function getUtmFieldMap(): Promise<Record<string, number>> {
  if (fieldMapCache) return fieldMapCache;

  const res = await fetch(
    `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/leads/custom_fields`,
    {
      headers: {
        Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}`,
      },
    }
  );

  if (!res.ok) return {};

  const data = await res.json();
  const fields = data._embedded?.custom_fields || [];
  const map: Record<string, number> = {};

  for (const f of fields) {
    const name = (f.name || "").toLowerCase().replace(/\s+/g, "_");
    if (UTM_KEYS.includes(name)) {
      map[name] = f.id;
    }
  }

  fieldMapCache = map;
  return map;
}

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, course, utm, fbp, fbc, eventSourceUrl, referrer, language, timeOnSite, device } = await req.json();
    const utmData = (utm || {}) as Record<string, string>;
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";
    const userAgent = req.headers.get("user-agent") || "";
    // Vercel provides geo headers
    const country = req.headers.get("x-vercel-ip-country") || "";
    const city = req.headers.get("x-vercel-ip-city") || "";

    if (!name || !phone || !email) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Create contact
    const contactRes = await fetch(
      `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            name: name || "Website Lead",
            custom_fields_values: [
              ...(phone
                ? [{ field_code: "PHONE", values: [{ value: phone, enum_code: "MOB" }] }]
                : []),
              ...(email
                ? [{ field_code: "EMAIL", values: [{ value: email, enum_code: "WORK" }] }]
                : []),
            ],
          },
        ]),
      }
    );

    if (!contactRes.ok) {
      const errText = await contactRes.text();
      console.error(`Kommo contact error (HTTP ${contactRes.status}):`, errText);
      await sendTgAlert(`🚨 <b>Kommo contact error</b>\nHTTP ${contactRes.status}\nLead: ${name} / ${phone}\n\n${errText.slice(0, 200)}`);
      return NextResponse.json({ error: "Failed to create contact" }, { status: 500 });
    }

    const contactData = await contactRes.json();
    const contactId = contactData._embedded?.contacts?.[0]?.id;

    // Build UTM custom fields for the lead
    const utmFieldMap = Object.keys(utmData).length > 0 ? await getUtmFieldMap() : {};
    const customFields: { field_id: number; values: { value: string }[] }[] = [];

    for (const [key, value] of Object.entries(utmData)) {
      const fieldId = utmFieldMap[key];
      if (fieldId) {
        customFields.push({ field_id: fieldId, values: [{ value }] });
      }
    }

    // Add course to custom field "Курс" (ID: 777040)
    if (course) {
      customFields.push({ field_id: 777040, values: [{ value: course }] });
    }

    // Create lead linked to contact
    const leadRes = await fetch(
      `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/leads`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            name: name || "Unknown",
            pipeline_id: PIPELINE_ID,
            status_id: 100062868, // Pickup
            ...(customFields.length > 0 && { custom_fields_values: customFields }),
            _embedded: {
              contacts: [{ id: contactId }],
            },
          },
        ]),
      }
    );

    if (!leadRes.ok) {
      const errText = await leadRes.text();
      console.error(`Kommo lead error (HTTP ${leadRes.status}):`, errText);
      await sendTgAlert(`🚨 <b>Kommo lead error</b>\nHTTP ${leadRes.status}\nLead: ${name} / ${phone}\n\n${errText.slice(0, 200)}`);
      return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
    }

    const data = await leadRes.json();
    const leadId = data._embedded?.leads?.[0]?.id;

    // Send Meta Conversion API event
    if (META_PIXEL_ID && META_CAPI_TOKEN) {
      const eventData = {
        data: [
          {
            event_name: "Lead",
            event_time: Math.floor(Date.now() / 1000),
            action_source: "website",
            event_source_url: eventSourceUrl || "",
            user_data: {
              em: [sha256(email.trim().toLowerCase())],
              ph: [sha256(phone.replace(/\D/g, ""))],
              fn: [sha256(name.trim().toLowerCase())],
              client_ip_address: clientIp,
              client_user_agent: userAgent,
              ...(fbp && { fbp }),
              ...(fbc && { fbc }),
            },
          },
        ],
      };

      try {
        const capiRes = await fetch(
          `https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events?access_token=${META_CAPI_TOKEN}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventData),
          }
        );
        const capiBody = await capiRes.json();
        if (!capiRes.ok) {
          console.error(`Meta CAPI error (HTTP ${capiRes.status}):`, JSON.stringify(capiBody));
          await sendTgAlert(`⚠️ <b>Meta CAPI error</b>\nHTTP ${capiRes.status}\n\n${JSON.stringify(capiBody).slice(0, 200)}`);
        }
      } catch (err) {
        console.error("Meta CAPI network error:", err);
      }
    }

    // Send Telegram notification with full lead details
    const timeMin = Math.floor((timeOnSite || 0) / 60);
    const timeSec = (timeOnSite || 0) % 60;
    const timeStr = timeMin > 0 ? `${timeMin}м ${timeSec}с` : `${timeSec}с`;
    const geo = [city, country].filter(Boolean).join(", ");

    const tgLines = [
      `📩 <b>Новая заявка с сайта!</b>`,
      ``,
      `👤 <b>${name}</b>`,
      `📱 ${phone}`,
      `📧 ${email}`,
      `📚 Курс: <b>${course || "—"}</b>`,
      ``,
      referrer ? `🔗 Реферер: ${(() => { try { return new URL(referrer).hostname.replace("www.", "").replace(".com", "").replace(".org", ""); } catch { return referrer; } })()}` : "",
      utmData.utm_source ? `📊 UTM Source: <b>${utmData.utm_source}</b>` : "",
      device ? `📱 Устройство: ${device}` : "",
      language ? `🌐 Язык: ${language}` : "",
      geo ? `📍 Гео: ${geo}` : "",
      `⏱ На сайте: ${timeStr}`,
      ``,
      `🔗 <a href="https://letofacultetschool.kommo.com/leads/detail/${leadId}">Открыть в Kommo</a>`,
    ].filter(Boolean);

    await sendTgAlert(tgLines.join("\n"));

    return NextResponse.json({ success: true, id: leadId });
  } catch (e) {
    console.error("Lead creation error:", e);
    await sendTgAlert(`🔥 <b>Server error</b>\n${String(e).slice(0, 300)}`);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
