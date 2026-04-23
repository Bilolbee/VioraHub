import { Environment } from "@prisma/client";
import { z } from "zod";
import { db } from "@/lib/db";
import { defaultContent } from "@/lib/cms-defaults";
import { AuditEntry, Role, SiteContent } from "@/lib/cms-types";

const siteContentSchema: z.ZodType<SiteContent> = z.object({
  version: z.number().int().nonnegative(),
  updatedAt: z.string(),
  updatedBy: z.string(),
  hero: z.object({
    badge: z.string(),
    heading: z.string(),
    subtitle: z.string(),
    primaryCta: z.string(),
    secondaryCta: z.string()
  }),
  stats: z.array(
    z.object({
      label: z.string(),
      value: z.number(),
      suffix: z.string()
    })
  ),
  services: z.array(
    z.object({
      title: z.string(),
      description: z.string()
    })
  ),
  portfolio: z.array(
    z.object({
      name: z.string(),
      category: z.string(),
      result: z.string(),
      tools: z.string()
    })
  ),
  whyUs: z.array(z.string()),
  about: z.object({
    kicker: z.string(),
    title: z.string(),
    subtitle: z.string(),
    mission: z.string(),
    approach: z.string(),
    promise: z.string()
  }),
  testimonials: z.array(
    z.object({
      name: z.string(),
      role: z.string(),
      quote: z.string()
    })
  ),
  contact: z.object({
    telegram: z.string(),
    whatsapp: z.string(),
    phone: z.string(),
    email: z.string(),
    instagram: z.string()
  }),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    ogTitle: z.string(),
    ogDescription: z.string()
  }),
  nav: z.array(
    z.object({
      href: z.string(),
      label: z.string()
    })
  )
});

async function ensureSnapshot(environment: Environment) {
  const existing = await db.contentSnapshot.findUnique({ where: { environment } });
  if (existing) return existing;
  return db.contentSnapshot.create({
    data: {
      environment,
      content: defaultContent,
      version: 1,
      updatedAt: new Date(),
      updatedBy: "system"
    }
  });
}

function toSiteContent(raw: unknown): SiteContent {
  const parsed = siteContentSchema.safeParse(raw);
  if (!parsed.success) return defaultContent;
  return parsed.data;
}

export async function getPublishedContent() {
  const row = await ensureSnapshot(Environment.production);
  return toSiteContent(row.content);
}

export async function getStagingContent() {
  const row = await ensureSnapshot(Environment.staging);
  return toSiteContent(row.content);
}

export async function updateStagingContent(next: SiteContent, actorEmail: string) {
  const validated = siteContentSchema.parse(next);
  const current = await ensureSnapshot(Environment.staging);
  const merged: SiteContent = {
    ...validated,
    version: current.version,
    updatedAt: new Date().toISOString(),
    updatedBy: actorEmail
  };
  const updated = await db.contentSnapshot.update({
    where: { environment: Environment.staging },
    data: {
      content: merged,
      updatedAt: new Date(),
      updatedBy: actorEmail
    }
  });
  return toSiteContent(updated.content);
}

export async function publishStagingContent(actorEmail: string) {
  const staging = await ensureSnapshot(Environment.staging);
  const production = await ensureSnapshot(Environment.production);
  const parsedStaging = toSiteContent(staging.content);
  const published: SiteContent = {
    ...parsedStaging,
    version: production.version + 1,
    updatedAt: new Date().toISOString(),
    updatedBy: actorEmail
  };

  await db.$transaction([
    db.contentSnapshot.update({
      where: { environment: Environment.production },
      data: {
        content: published,
        version: published.version,
        updatedAt: new Date(),
        updatedBy: actorEmail
      }
    }),
    db.contentSnapshot.update({
      where: { environment: Environment.staging },
      data: {
        content: published,
        version: published.version,
        updatedAt: new Date(),
        updatedBy: actorEmail
      }
    })
  ]);

  return published;
}

export async function appendAudit(
  actorEmail: string,
  actorRole: Role | "system",
  action: AuditEntry["action"],
  details: string
) {
  await db.auditLog.create({
    data: {
      actorEmail,
      actorRole,
      action,
      details
    }
  });
}

export async function readAudit(limit = 200): Promise<AuditEntry[]> {
  const rows = await db.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: limit
  });
  return rows.map((row) => ({
    id: row.id,
    at: row.createdAt.toISOString(),
    actorEmail: row.actorEmail,
    actorRole: row.actorRole as Role | "system",
    action: row.action as AuditEntry["action"],
    details: row.details
  }));
}
