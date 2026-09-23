import { NextResponse } from "next/server";
import {
  getClickState,
  incrementClickAndGetWhatsApp,
} from "../../lib/click-store";

export async function GET() {
  try {
    const state = await getClickState();
    return NextResponse.json({ ok: true, ...state });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Falha ao ler contador" },
      { status: 500 },
    );
  }
}

export async function POST() {
  try {
    const result = await incrementClickAndGetWhatsApp();
    return NextResponse.json({ ok: true, ...result });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Falha ao registrar clique" },
      { status: 500 },
    );
  }
}
