import { NextRequest, NextResponse } from "next/server";
import { hasRole, readSessionFromRequest } from "@/lib/admin-auth";
import { Role } from "@/lib/cms-types";

export async function requireApiRoles(request: NextRequest, allowed: Role[]) {
  const session = await readSessionFromRequest(request);
  if (!session) {
    return { ok: false as const, response: NextResponse.json({ error: "Autorizatsiya talab qilinadi" }, { status: 401 }) };
  }
  if (!hasRole(session.role, allowed)) {
    return { ok: false as const, response: NextResponse.json({ error: "Ruxsat yetarli emas" }, { status: 403 }) };
  }
  return { ok: true as const, session };
}
