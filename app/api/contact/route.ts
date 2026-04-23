import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body?.name || !body?.phone || !body?.neededService) {
    return NextResponse.json({ error: "Majburiy maydonlar toliq emas" }, { status: 400 });
  }

  // Replace with Telegram bot, email service or CRM integration.
  console.log("Yangi sorov:", body);

  return NextResponse.json({ ok: true });
}
