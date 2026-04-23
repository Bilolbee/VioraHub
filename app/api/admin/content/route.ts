import { NextRequest, NextResponse } from "next/server";
import { requireApiRoles } from "@/lib/admin-guard";
import { appendAudit, getPublishedContent, getStagingContent, updateStagingContent } from "@/lib/cms-store";
import { SiteContent } from "@/lib/cms-types";

export async function GET(request: NextRequest) {
  const auth = await requireApiRoles(request, ["editor", "reviewer", "admin"]);
  if (!auth.ok) return auth.response;

  const [staging, production] = await Promise.all([getStagingContent(), getPublishedContent()]);

  return NextResponse.json({
    staging,
    production,
    user: {
      email: auth.session.email,
      role: auth.session.role,
      name: auth.session.name
    }
  });
}

function isValidContent(payload: unknown): payload is SiteContent {
  if (!payload || typeof payload !== "object") return false;
  const candidate = payload as SiteContent;
  return Array.isArray(candidate.stats) && Array.isArray(candidate.services) && Array.isArray(candidate.portfolio);
}

export async function PATCH(request: NextRequest) {
  const auth = await requireApiRoles(request, ["editor", "admin"]);
  if (!auth.ok) return auth.response;

  const body = await request.json();
  const content = body?.content;
  const note = String(body?.note || "Staging kontent yangilandi");
  if (!isValidContent(content)) {
    return NextResponse.json({ error: "Kontent formati noto'g'ri" }, { status: 400 });
  }

  const saved = await updateStagingContent(content, auth.session.email);
  await appendAudit(auth.session.email, auth.session.role, "draft_updated", note);

  return NextResponse.json({ ok: true, staging: saved });
}
