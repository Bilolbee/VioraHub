import { Environment } from "@prisma/client";
import { z } from "zod";
import { db } from "@/lib/db";
import { defaultContent } from "@/lib/cms-defaults";
import { AuditEntry, Role, SiteContent } from "@/lib/cms-types";

const shortText = z.string().trim().min(1).max(140);
const mediumText = z.string().trim().min(1).max(300);
const longText = z.string().trim().min(1).max(1200);

const siteContentSchema: z.ZodType<SiteContent> = z.object({
  version: z.number().int().nonnegative(),
  updatedAt: z.string().max(120),
  updatedBy: z.string().max(180),
  hero: z.object({
    badge: shortText,
    heading: mediumText,
    subtitle: longText,
    primaryCta: shortText,
    secondaryCta: shortText
  }),
  home: z.object({
    trustLogos: z.array(shortText).max(36),
    processSteps: z.array(
      z.object({
        title: shortText,
        detail: mediumText
      })
    ).max(24),
    faq: z.array(
      z.object({
        question: mediumText,
        answer: longText
      })
    ).max(36)
  }),
  stats: z.array(
    z.object({
      label: shortText,
      value: z.number(),
      suffix: z.string().trim().max(24)
    })
  ).max(24),
  services: z.array(
    z.object({
      title: shortText,
      description: longText,
      outcome: mediumText,
      deliverables: z.array(shortText).max(12)
    })
  ).max(48),
  portfolio: z.array(
    z.object({
      name: shortText,
      category: shortText,
      challenge: longText,
      solution: longText,
      result: longText,
      tools: mediumText
    })
  ).max(96),
  caseStudies: z.array(
    z.object({
      client: shortText,
      industry: shortText,
      challenge: longText,
      solution: longText,
      result: longText,
      timeline: shortText
    })
  ).max(48),
  whyUs: z.array(shortText).max(24),
  about: z.object({
    kicker: shortText,
    title: mediumText,
    subtitle: longText,
    mission: longText,
    approach: longText,
    promise: longText
  }),
  testimonials: z.array(
    z.object({
      name: shortText,
      role: shortText,
      quote: longText
    })
  ).max(48),
  contact: z.object({
    telegram: z.string().trim().min(1).max(300),
    whatsapp: z.string().trim().min(1).max(300),
    phone: z.string().trim().min(5).max(40),
    email: z.string().trim().email().max(180),
    instagram: z.string().trim().min(1).max(120)
  }),
  seo: z.object({
    title: mediumText,
    description: longText,
    ogTitle: mediumText,
    ogDescription: longText
  }),
  nav: z.array(
    z.object({
      href: z.string().trim().min(1).max(180),
      label: shortText
    })
  ).max(24)
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
  const merged = {
    ...defaultContent,
    ...(raw && typeof raw === "object" ? raw : {}),
    hero: {
      ...defaultContent.hero,
      ...(raw && typeof raw === "object" && "hero" in raw && typeof (raw as { hero?: unknown }).hero === "object"
        ? ((raw as { hero?: Record<string, unknown> }).hero ?? {})
        : {})
    },
    home: {
      ...defaultContent.home,
      ...(raw && typeof raw === "object" && "home" in raw && typeof (raw as { home?: unknown }).home === "object"
        ? ((raw as { home?: Record<string, unknown> }).home ?? {})
        : {})
    },
    about: {
      ...defaultContent.about,
      ...(raw && typeof raw === "object" && "about" in raw && typeof (raw as { about?: unknown }).about === "object"
        ? ((raw as { about?: Record<string, unknown> }).about ?? {})
        : {})
    },
    contact: {
      ...defaultContent.contact,
      ...(raw && typeof raw === "object" && "contact" in raw && typeof (raw as { contact?: unknown }).contact === "object"
        ? ((raw as { contact?: Record<string, unknown> }).contact ?? {})
        : {})
    },
    seo: {
      ...defaultContent.seo,
      ...(raw && typeof raw === "object" && "seo" in raw && typeof (raw as { seo?: unknown }).seo === "object"
        ? ((raw as { seo?: Record<string, unknown> }).seo ?? {})
        : {})
    }
  };

  if (Array.isArray(merged.services)) {
    merged.services = merged.services.map((item) => {
      const service = item as Partial<SiteContent["services"][number]>;
      return {
        title: String(service.title ?? ""),
        description: String(service.description ?? ""),
        outcome: String(service.outcome ?? service.description ?? ""),
        deliverables: Array.isArray(service.deliverables)
          ? service.deliverables.map((row) => String(row)).filter(Boolean)
          : []
      };
    });
  }

  if (Array.isArray(merged.portfolio)) {
    merged.portfolio = merged.portfolio.map((item) => {
      const row = item as Partial<SiteContent["portfolio"][number]>;
      return {
        name: String(row.name ?? ""),
        category: String(row.category ?? ""),
        challenge: String(row.challenge ?? row.result ?? ""),
        solution: String(row.solution ?? row.tools ?? ""),
        result: String(row.result ?? ""),
        tools: String(row.tools ?? "")
      };
    });
  }

  if (Array.isArray(merged.caseStudies)) {
    merged.caseStudies = merged.caseStudies.map((item) => {
      const row = item as Partial<SiteContent["caseStudies"][number]>;
      return {
        client: String(row.client ?? ""),
        industry: String(row.industry ?? ""),
        challenge: String(row.challenge ?? ""),
        solution: String(row.solution ?? ""),
        result: String(row.result ?? ""),
        timeline: String(row.timeline ?? "")
      };
    });
  }

  const parsed = siteContentSchema.safeParse(merged);
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
