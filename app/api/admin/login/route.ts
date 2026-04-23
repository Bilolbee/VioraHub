import { NextResponse } from "next/server";
import { createSessionForUser, findUser, SESSION_COOKIE } from "@/lib/admin-auth";
import { appendAudit } from "@/lib/cms-store";

export async function POST(request: Request) {
  const body = await request.json();
  const login = String(body?.login || body?.email || "").trim();
  const password = String(body?.password || "");
  const user = await findUser(login, password);

  if (!user) {
    await appendAudit(login || "unknown", "system", "login_failed", "Noto'g'ri login urinish");
    return NextResponse.json({ error: "Login yoki parol noto'g'ri" }, { status: 401 });
  }

  const { token, expiresAt } = await createSessionForUser(user.id);

  await appendAudit(user.email, user.role, "login_success", "Admin panelga muvaffaqiyatli kirish");

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
