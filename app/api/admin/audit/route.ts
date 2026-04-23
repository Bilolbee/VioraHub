import { NextRequest, NextResponse } from "next/server";
import { requireApiRoles } from "@/lib/admin-guard";
import { readAudit } from "@/lib/cms-store";

export async function GET(request: NextRequest) {
  const auth = await requireApiRoles(request, ["reviewer", "admin"]);
  if (!auth.ok) return auth.response;

  const audit = await readAudit(300);
  return NextResponse.json({ audit });
}
