import { NextResponse } from "next/server";
import { deleteSession, readSessionFromCookies, SESSION_COOKIE } from "@/lib/admin-auth";
import { appendAudit } from "@/lib/cms-store";

export async function POST() {
  const session = await readSessionFromCookies();
  if (session) {
    await deleteSession(session.token);
    await appendAudit(session.email, session.role, "logout", "Admin paneldan chiqish");
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 0
  });
  return response;
}
