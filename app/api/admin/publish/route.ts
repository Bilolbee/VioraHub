import { NextRequest, NextResponse } from "next/server";
import { requireApiRoles } from "@/lib/admin-guard";
import { appendAudit, publishStagingContent } from "@/lib/cms-store";

export async function POST(request: NextRequest) {
  const auth = await requireApiRoles(request, ["reviewer", "admin"]);
  if (!auth.ok) return auth.response;

  const body = await request.json().catch(() => ({}));
  const note = String(body?.note || "Staging versiya productionga chiqarildi");

  const published = await publishStagingContent(auth.session.email);
  await appendAudit(auth.session.email, auth.session.role, "publish_approved", note);

  return NextResponse.json({ ok: true, production: published });
}
