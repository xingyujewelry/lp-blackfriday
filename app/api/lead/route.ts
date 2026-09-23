import { NextResponse } from "next/server";

const WEBHOOK_URL =
  "https://n8n-n8n.oaxs64.easypanel.host/webhook/eaf088ae-2420-470e-879a-71d991e8604a";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: `Webhook respondeu ${res.status}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Falha ao encaminhar para o webhook" },
      { status: 500 }
    );
  }
}
