import { NextRequest, NextResponse } from "next/server";
import { requireApiRoles } from "@/lib/admin-guard";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const auth = await requireApiRoles(request, ["editor", "reviewer", "admin"]);
  if (!auth.ok) return auth.response;

  const leads = await db.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 300
  });

  return NextResponse.json({
    leads: leads.map((lead) => ({
      id: lead.id,
      name: lead.name,
      businessType: lead.businessType,
      neededService: lead.neededService,
      budget: lead.budget,
      phone: lead.phone,
      createdAt: lead.createdAt.toISOString()
    }))
  });
}
