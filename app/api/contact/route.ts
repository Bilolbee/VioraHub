import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const leadSchema = z.object({
  name: z.string().min(2).max(120),
  businessType: z.string().min(2).max(120),
  neededService: z.string().min(2).max(160),
  budget: z.string().min(1).max(80),
  phone: z.string().min(5).max(40)
});

export async function POST(request: Request) {
  const raw = await request.json();
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Majburiy maydonlar toliq emas yoki format xato" }, { status: 400 });
  }

  await db.lead.create({
    data: parsed.data
  });

  return NextResponse.json({ ok: true });
}
