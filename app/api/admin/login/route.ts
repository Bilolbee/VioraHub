import { NextResponse } from "next/server";
import { z } from "zod";
import { createSessionForUser, findUser, SESSION_COOKIE } from "@/lib/admin-auth";
import { appendAudit } from "@/lib/cms-store";
import { db } from "@/lib/db";

const loginSchema = z.object({
  login: z.string().trim().min(1).max(120),
  password: z.string().min(1).max(256)
});

const maxFailedAttempts = 6;
const blockWindowMinutes = 15;

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown-ip";
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const parsed = loginSchema.safeParse({
    login: String(body?.login || body?.email || ""),
    password: String(body?.password || "")
  });
  if (!parsed.success) {
    return NextResponse.json({ error: "Login yoki parol formati noto'g'ri" }, { status: 400 });
  }

  const login = parsed.data.login;
  const password = parsed.data.password;
  const ip = getClientIp(request);

  const threshold = new Date(Date.now() - blockWindowMinutes * 60 * 1000);
  const failedCount = await db.auditLog.count({
    where: {
      action: "login_failed",
      actorEmail: login,
      createdAt: { gte: threshold }
    }
  });
  if (failedCount >= maxFailedAttempts) {
    return NextResponse.json(
      { error: "Ko'p noto'g'ri urinish. 15 daqiqadan keyin qayta urinib ko'ring." },
      { status: 429 }
    );
  }

  const user = await findUser(login, password);

  if (!user) {
    await appendAudit(login || "unknown", "system", "login_failed", `Noto'g'ri login urinish (ip: ${ip})`);
    return NextResponse.json({ error: "Login yoki parol noto'g'ri" }, { status: 401 });
  }

  const { token, expiresAt } = await createSessionForUser(user.id);

  await appendAudit(user.email, user.role, "login_success", `Admin panelga muvaffaqiyatli kirish (ip: ${ip})`);

  const response = NextResponse.json({
    ok: true,
    user: { email: user.email, role: user.role, name: user.name }
  });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    expires: expiresAt
  });
  return response;
}
