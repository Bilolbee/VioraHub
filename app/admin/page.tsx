"use client";

import { useEffect, useMemo, useState } from "react";
import { Role, SiteContent } from "@/lib/cms-types";

type AdminPayload = {
  staging: SiteContent;
  production: SiteContent;
  user: {
    email: string;
    role: Role;
    name: string;
  };
};

type AuditRow = {
  id: string;
  at: string;
  actorEmail: string;
  actorRole: Role | "system";
  action: string;
  details: string;
};

type LeadRow = {
  id: string;
  name: string;
  businessType: string;
  neededService: string;
  budget: string;
  phone: string;
  createdAt: string;
};

type TabId =
  | "general"
  | "portfolio"
  | "services"
  | "stats"
  | "about"
  | "navigation"
  | "leads"
  | "release";

const tabs: Array<{ id: TabId; label: string }> = [
  { id: "general", label: "Asosiy" },
  { id: "portfolio", label: "Portfolio" },
  { id: "services", label: "Xizmatlar" },
  { id: "stats", label: "Stat va WhyUs" },
  { id: "about", label: "About va Testimonial" },
  { id: "navigation", label: "Navigatsiya" },
  { id: "leads", label: "Leadlar" },
  { id: "release", label: "Publish va Audit" }
];

const emptyStatus = "";

function SectionCard({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="surface rounded-3xl p-6">
      <h3 className="text-xl font-semibold">{title}</h3>
      {subtitle ? <p className="mt-2 text-sm text-muted">{subtitle}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  disabled
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <input
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-accent disabled:opacity-60"
    />
  );
}

function TextAreaInput({
  value,
  onChange,
  placeholder,
  disabled,
  rows = 3
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
}) {
  return (
    <textarea
      rows={rows}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-accent disabled:opacity-60"
    />
  );
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<AdminPayload | null>(null);
  const [draft, setDraft] = useState<SiteContent | null>(null);
  const [status, setStatus] = useState(emptyStatus);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [saveNote, setSaveNote] = useState("Admin panel orqali kontent yangilandi");
  const [publishNote, setPublishNote] = useState("Staging versiya productionga chiqarildi");
  const [audit, setAudit] = useState<AuditRow[]>([]);
  const [leads, setLeads] = useState<LeadRow[]>([]);

  const canPublish = useMemo(() => {
    if (!data) return false;
    return data.user.role === "reviewer" || data.user.role === "admin";
  }, [data]);

  const canEdit = useMemo(() => {
    if (!data) return false;
    return data.user.role === "editor" || data.user.role === "admin";
  }, [data]);

  async function loadAll() {
    setLoading(true);
    const response = await fetch("/api/admin/content", { cache: "no-store" });
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        window.location.href = "/admin/login";
        return;
      }
      setStatus("Malumotlarni yuklab bolmadi.");
      setLoading(false);
      return;
    }

    const payload = (await response.json()) as AdminPayload;
    setData(payload);
    setDraft(payload.staging);

    const leadsResponse = await fetch("/api/admin/leads", { cache: "no-store" });
    if (leadsResponse.ok) {
      const body = (await leadsResponse.json()) as { leads: LeadRow[] };
      setLeads(body.leads);
    }

    if (payload.user.role === "reviewer" || payload.user.role === "admin") {
      const auditResponse = await fetch("/api/admin/audit", { cache: "no-store" });
      if (auditResponse.ok) {
        const body = (await auditResponse.json()) as { audit: AuditRow[] };
        setAudit(body.audit);
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function saveDraft() {
    if (!draft || !canEdit) return;
    setSaving(true);
    const response = await fetch("/api/admin/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: draft, note: saveNote })
    });
    setSaving(false);

    if (!response.ok) {
      const body = await response.json().catch(() => ({ error: "Saqlashda xatolik" }));
      setStatus(body.error || "Saqlashda xatolik");
      return;
    }

    setStatus("Staging muvaffaqiyatli yangilandi.");
    await loadAll();
  }

  async function publish() {
    if (!canPublish) return;
    setStatus("Productionga chiqarilmoqda...");
    const response = await fetch("/api/admin/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note: publishNote })
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({ error: "Publishda xatolik" }));
      setStatus(body.error || "Publishda xatolik");
      return;
    }
    setStatus("Yangi versiya productionga chiqarildi.");
    await loadAll();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  function updateDraft(fn: (current: SiteContent) => SiteContent) {
    setDraft((current) => {
      if (!current) return current;
      return fn(current);
    });
  }

  if (loading) {
    return <div className="py-16 text-sm text-muted">Yuklanmoqda...</div>;
  }

  if (!data || !draft) {
    return <div className="py-16 text-sm text-red-300">Admin malumoti topilmadi.</div>;
  }

  return (
    <div className="pb-20 pt-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-muted">
            Foydalanuvchi: {data.user.name} ({data.user.role}) - {data.user.email}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={loadAll} className="rounded-full border border-white/15 px-4 py-2 text-sm hover:border-white">
            Yangilash
          </button>
          <button onClick={logout} className="rounded-full border border-white/15 px-4 py-2 text-sm hover:border-white">
            Chiqish
          </button>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <div className="surface rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-accentSoft">Staging</p>
          <p className="mt-2 text-sm text-muted">Versiya: {data.staging.version}</p>
        </div>
        <div className="surface rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-accentSoft">Production</p>
          <p className="mt-2 text-sm text-muted">Versiya: {data.production.version}</p>
        </div>
        <div className="surface rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-accentSoft">Rol</p>
          <p className="mt-2 text-sm text-muted">
            {canEdit ? "Tahrir yoqilgan" : "Faqat korish"}
          </p>
        </div>
        <div className="surface rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-accentSoft">Leadlar</p>
          <p className="mt-2 text-sm text-muted">{leads.length} ta sorov</p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeTab === tab.id
                ? "border border-accent bg-accent/20 text-white"
                : "border border-white/15 bg-white/[0.02] text-muted hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mb-6 grid gap-3 md:grid-cols-[1fr_auto]">
        <TextInput value={saveNote} onChange={setSaveNote} disabled={!canEdit} />
        <button
          disabled={!canEdit || saving}
          onClick={saveDraft}
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saqlanmoqda..." : "Stagingni saqlash"}
        </button>
      </div>

      {activeTab === "general" ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title="Hero" subtitle="Asosiy sahifa hero matnlari">
            <div className="space-y-3">
              <TextInput
                value={draft.hero.badge}
                disabled={!canEdit}
                onChange={(value) => updateDraft((c) => ({ ...c, hero: { ...c.hero, badge: value } }))}
              />
              <TextInput
                value={draft.hero.heading}
                disabled={!canEdit}
                onChange={(value) => updateDraft((c) => ({ ...c, hero: { ...c.hero, heading: value } }))}
              />
              <TextAreaInput
                value={draft.hero.subtitle}
                disabled={!canEdit}
                onChange={(value) => updateDraft((c) => ({ ...c, hero: { ...c.hero, subtitle: value } }))}
              />
              <div className="grid gap-3 md:grid-cols-2">
                <TextInput
                  value={draft.hero.primaryCta}
                  disabled={!canEdit}
                  onChange={(value) => updateDraft((c) => ({ ...c, hero: { ...c.hero, primaryCta: value } }))}
                />
                <TextInput
                  value={draft.hero.secondaryCta}
                  disabled={!canEdit}
                  onChange={(value) => updateDraft((c) => ({ ...c, hero: { ...c.hero, secondaryCta: value } }))}
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Kontakt" subtitle="Barcha aloqa tugmalari shu yerga boglangan">
            <div className="space-y-3">
              <TextInput
                value={draft.contact.telegram}
                disabled={!canEdit}
                onChange={(value) => updateDraft((c) => ({ ...c, contact: { ...c.contact, telegram: value } }))}
              />
              <TextInput
                value={draft.contact.whatsapp}
                disabled={!canEdit}
                onChange={(value) => updateDraft((c) => ({ ...c, contact: { ...c.contact, whatsapp: value } }))}
              />
              <TextInput
                value={draft.contact.phone}
                disabled={!canEdit}
                onChange={(value) => updateDraft((c) => ({ ...c, contact: { ...c.contact, phone: value } }))}
              />
              <TextInput
                value={draft.contact.email}
                disabled={!canEdit}
                onChange={(value) => updateDraft((c) => ({ ...c, contact: { ...c.contact, email: value } }))}
              />
              <TextInput
                value={draft.contact.instagram}
                disabled={!canEdit}
                onChange={(value) => updateDraft((c) => ({ ...c, contact: { ...c.contact, instagram: value } }))}
              />
            </div>
          </SectionCard>

          <SectionCard title="SEO" subtitle="Meta title va description">
            <div className="space-y-3">
              <TextInput
                value={draft.seo.title}
                disabled={!canEdit}
                onChange={(value) => updateDraft((c) => ({ ...c, seo: { ...c.seo, title: value } }))}
              />
              <TextAreaInput
                value={draft.seo.description}
                disabled={!canEdit}
                onChange={(value) => updateDraft((c) => ({ ...c, seo: { ...c.seo, description: value } }))}
              />
              <TextInput
                value={draft.seo.ogTitle}
                disabled={!canEdit}
                onChange={(value) => updateDraft((c) => ({ ...c, seo: { ...c.seo, ogTitle: value } }))}
              />
              <TextAreaInput
                value={draft.seo.ogDescription}
                disabled={!canEdit}
                onChange={(value) => updateDraft((c) => ({ ...c, seo: { ...c.seo, ogDescription: value } }))}
              />
            </div>
          </SectionCard>
        </div>
      ) : null}

      {activeTab === "portfolio" ? (
        <SectionCard title="Portfolio boshqaruvi" subtitle="Qoshish, tahrirlash, ochirish">
          <div className="space-y-4">
            {draft.portfolio.map((item, index) => (
              <div key={`${item.name}-${index}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <TextInput
                    value={item.name}
                    disabled={!canEdit}
                    onChange={(value) =>
                      updateDraft((c) => ({
                        ...c,
                        portfolio: c.portfolio.map((p, i) => (i === index ? { ...p, name: value } : p))
                      }))
                    }
                  />
                  <TextInput
                    value={item.category}
                    disabled={!canEdit}
                    onChange={(value) =>
                      updateDraft((c) => ({
                        ...c,
                        portfolio: c.portfolio.map((p, i) => (i === index ? { ...p, category: value } : p))
                      }))
                    }
                  />
                  <TextInput
                    value={item.tools}
                    disabled={!canEdit}
                    onChange={(value) =>
                      updateDraft((c) => ({
                        ...c,
                        portfolio: c.portfolio.map((p, i) => (i === index ? { ...p, tools: value } : p))
                      }))
                    }
                  />
                  <button
                    disabled={!canEdit}
                    onClick={() =>
                      updateDraft((c) => ({
                        ...c,
                        portfolio: c.portfolio.filter((_, i) => i !== index)
                      }))
                    }
                    className="rounded-xl border border-red-400/40 px-4 py-3 text-sm font-semibold text-red-300 disabled:opacity-50"
                  >
                    Olib tashlash
                  </button>
                  <div className="md:col-span-2">
                    <TextAreaInput
                      value={item.result}
                      disabled={!canEdit}
                      onChange={(value) =>
                        updateDraft((c) => ({
                          ...c,
                          portfolio: c.portfolio.map((p, i) => (i === index ? { ...p, result: value } : p))
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              disabled={!canEdit}
              onClick={() =>
                updateDraft((c) => ({
                  ...c,
                  portfolio: [...c.portfolio, { name: "", category: "", result: "", tools: "" }]
                }))
              }
              className="rounded-full border border-accent px-5 py-2 text-sm font-semibold disabled:opacity-50"
            >
              Yangi portfolio qoshish
            </button>
          </div>
        </SectionCard>
      ) : null}

      {activeTab === "services" ? (
        <SectionCard title="Xizmatlar" subtitle="Service kartalarini boshqarish">
          <div className="space-y-4">
            {draft.services.map((item, index) => (
              <div key={`${item.title}-${index}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="grid gap-3">
                  <TextInput
                    value={item.title}
                    disabled={!canEdit}
                    onChange={(value) =>
                      updateDraft((c) => ({
                        ...c,
                        services: c.services.map((s, i) => (i === index ? { ...s, title: value } : s))
                      }))
                    }
                  />
                  <TextAreaInput
                    value={item.description}
                    disabled={!canEdit}
                    onChange={(value) =>
                      updateDraft((c) => ({
                        ...c,
                        services: c.services.map((s, i) => (i === index ? { ...s, description: value } : s))
                      }))
                    }
                  />
                  <button
                    disabled={!canEdit}
                    onClick={() =>
                      updateDraft((c) => ({
                        ...c,
                        services: c.services.filter((_, i) => i !== index)
                      }))
                    }
                    className="rounded-xl border border-red-400/40 px-4 py-2 text-sm font-semibold text-red-300 disabled:opacity-50"
                  >
                    Olib tashlash
                  </button>
                </div>
              </div>
            ))}
            <button
              disabled={!canEdit}
              onClick={() =>
                updateDraft((c) => ({
                  ...c,
                  services: [...c.services, { title: "", description: "" }]
                }))
              }
              className="rounded-full border border-accent px-5 py-2 text-sm font-semibold disabled:opacity-50"
            >
              Yangi xizmat qoshish
            </button>
          </div>
        </SectionCard>
      ) : null}

      {activeTab === "stats" ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title="Statistikalar">
            <div className="space-y-4">
              {draft.stats.map((item, index) => (
                <div key={`${item.label}-${index}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="grid gap-3 md:grid-cols-3">
                    <TextInput
                      value={item.label}
                      disabled={!canEdit}
                      onChange={(value) =>
                        updateDraft((c) => ({
                          ...c,
                          stats: c.stats.map((s, i) => (i === index ? { ...s, label: value } : s))
                        }))
                      }
                    />
                    <TextInput
                      value={String(item.value)}
                      disabled={!canEdit}
                      onChange={(value) =>
                        updateDraft((c) => ({
                          ...c,
                          stats: c.stats.map((s, i) =>
                            i === index ? { ...s, value: Number(value) || 0 } : s
                          )
                        }))
                      }
                    />
                    <TextInput
                      value={item.suffix}
                      disabled={!canEdit}
                      onChange={(value) =>
                        updateDraft((c) => ({
                          ...c,
                          stats: c.stats.map((s, i) => (i === index ? { ...s, suffix: value } : s))
                        }))
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Why Us punktlari">
            <div className="space-y-3">
              {draft.whyUs.map((item, index) => (
                <div key={`${item}-${index}`} className="grid gap-3 md:grid-cols-[1fr_auto]">
                  <TextInput
                    value={item}
                    disabled={!canEdit}
                    onChange={(value) =>
                      updateDraft((c) => ({
                        ...c,
                        whyUs: c.whyUs.map((w, i) => (i === index ? value : w))
                      }))
                    }
                  />
                  <button
                    disabled={!canEdit}
                    onClick={() =>
                      updateDraft((c) => ({
                        ...c,
                        whyUs: c.whyUs.filter((_, i) => i !== index)
                      }))
                    }
                    className="rounded-xl border border-red-400/40 px-4 py-2 text-sm font-semibold text-red-300 disabled:opacity-50"
                  >
                    Olib tashlash
                  </button>
                </div>
              ))}
              <button
                disabled={!canEdit}
                onClick={() =>
                  updateDraft((c) => ({
                    ...c,
                    whyUs: [...c.whyUs, ""]
                  }))
                }
                className="rounded-full border border-accent px-5 py-2 text-sm font-semibold disabled:opacity-50"
              >
                Punkt qoshish
              </button>
            </div>
          </SectionCard>
        </div>
      ) : null}

      {activeTab === "about" ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title="About bolimi">
            <div className="space-y-3">
              <TextInput
                value={draft.about.kicker}
                disabled={!canEdit}
                onChange={(value) => updateDraft((c) => ({ ...c, about: { ...c.about, kicker: value } }))}
              />
              <TextInput
                value={draft.about.title}
                disabled={!canEdit}
                onChange={(value) => updateDraft((c) => ({ ...c, about: { ...c.about, title: value } }))}
              />
              <TextAreaInput
                value={draft.about.subtitle}
                disabled={!canEdit}
                onChange={(value) => updateDraft((c) => ({ ...c, about: { ...c.about, subtitle: value } }))}
              />
              <TextAreaInput
                value={draft.about.mission}
                disabled={!canEdit}
                onChange={(value) => updateDraft((c) => ({ ...c, about: { ...c.about, mission: value } }))}
              />
              <TextAreaInput
                value={draft.about.approach}
                disabled={!canEdit}
                onChange={(value) => updateDraft((c) => ({ ...c, about: { ...c.about, approach: value } }))}
              />
              <TextAreaInput
                value={draft.about.promise}
                disabled={!canEdit}
                onChange={(value) => updateDraft((c) => ({ ...c, about: { ...c.about, promise: value } }))}
              />
            </div>
          </SectionCard>

          <SectionCard title="Testimonials">
            <div className="space-y-4">
              {draft.testimonials.map((item, index) => (
                <div key={`${item.name}-${index}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="grid gap-3">
                    <TextInput
                      value={item.name}
                      disabled={!canEdit}
                      onChange={(value) =>
                        updateDraft((c) => ({
                          ...c,
                          testimonials: c.testimonials.map((t, i) => (i === index ? { ...t, name: value } : t))
                        }))
                      }
                    />
                    <TextInput
                      value={item.role}
                      disabled={!canEdit}
                      onChange={(value) =>
                        updateDraft((c) => ({
                          ...c,
                          testimonials: c.testimonials.map((t, i) => (i === index ? { ...t, role: value } : t))
                        }))
                      }
                    />
                    <TextAreaInput
                      value={item.quote}
                      disabled={!canEdit}
                      onChange={(value) =>
                        updateDraft((c) => ({
                          ...c,
                          testimonials: c.testimonials.map((t, i) => (i === index ? { ...t, quote: value } : t))
                        }))
                      }
                    />
                    <button
                      disabled={!canEdit}
                      onClick={() =>
                        updateDraft((c) => ({
                          ...c,
                          testimonials: c.testimonials.filter((_, i) => i !== index)
                        }))
                      }
                      className="rounded-xl border border-red-400/40 px-4 py-2 text-sm font-semibold text-red-300 disabled:opacity-50"
                    >
                      Olib tashlash
                    </button>
                  </div>
                </div>
              ))}
              <button
                disabled={!canEdit}
                onClick={() =>
                  updateDraft((c) => ({
                    ...c,
                    testimonials: [...c.testimonials, { name: "", role: "", quote: "" }]
                  }))
                }
                className="rounded-full border border-accent px-5 py-2 text-sm font-semibold disabled:opacity-50"
              >
                Testimonial qoshish
              </button>
            </div>
          </SectionCard>
        </div>
      ) : null}

      {activeTab === "navigation" ? (
        <SectionCard title="Navigatsiya menyusi">
          <div className="space-y-3">
            {draft.nav.map((item, index) => (
              <div key={`${item.href}-${index}`} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                <TextInput
                  value={item.label}
                  disabled={!canEdit}
                  onChange={(value) =>
                    updateDraft((c) => ({
                      ...c,
                      nav: c.nav.map((n, i) => (i === index ? { ...n, label: value } : n))
                    }))
                  }
                />
                <TextInput
                  value={item.href}
                  disabled={!canEdit}
                  onChange={(value) =>
                    updateDraft((c) => ({
                      ...c,
                      nav: c.nav.map((n, i) => (i === index ? { ...n, href: value } : n))
                    }))
                  }
                />
                <button
                  disabled={!canEdit}
                  onClick={() =>
                    updateDraft((c) => ({
                      ...c,
                      nav: c.nav.filter((_, i) => i !== index)
                    }))
                  }
                  className="rounded-xl border border-red-400/40 px-4 py-2 text-sm font-semibold text-red-300 disabled:opacity-50"
                >
                  Olib tashlash
                </button>
              </div>
            ))}
            <button
              disabled={!canEdit}
              onClick={() =>
                updateDraft((c) => ({
                  ...c,
                  nav: [...c.nav, { label: "", href: "/" }]
                }))
              }
              className="rounded-full border border-accent px-5 py-2 text-sm font-semibold disabled:opacity-50"
            >
              Menyu item qoshish
            </button>
          </div>
        </SectionCard>
      ) : null}

      {activeTab === "leads" ? (
        <SectionCard title="Leadlar" subtitle="Contact form orqali tushgan sorovlar">
          <div className="space-y-3">
            {leads.length === 0 ? <p className="text-sm text-muted">Hozircha lead yoq.</p> : null}
            {leads.map((lead) => (
              <article key={lead.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-base font-semibold">{lead.name}</p>
                <p className="mt-1 text-sm text-muted">{lead.businessType}</p>
                <p className="mt-1 text-sm text-muted">{lead.neededService}</p>
                <p className="mt-1 text-sm text-muted">Byudjet: {lead.budget}</p>
                <p className="mt-1 text-sm text-muted">Telefon: {lead.phone}</p>
                <p className="mt-2 text-xs text-muted">{new Date(lead.createdAt).toLocaleString()}</p>
              </article>
            ))}
          </div>
        </SectionCard>
      ) : null}

      {activeTab === "release" ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title="Publish boshqaruvi">
            <p className="text-sm text-muted">Faqat reviewer yoki admin productionga chiqarishi mumkin.</p>
            <div className="mt-4">
              <TextInput value={publishNote} onChange={setPublishNote} disabled={!canPublish} />
            </div>
            <button
              disabled={!canPublish}
              onClick={publish}
              className="mt-4 rounded-full border border-accent px-6 py-3 text-sm font-semibold disabled:opacity-50"
            >
              Productionga chiqarish
            </button>
          </SectionCard>

          <SectionCard title="Audit log">
            <div className="max-h-[460px] space-y-3 overflow-auto pr-1">
              {audit.length === 0 ? <p className="text-sm text-muted">Audit malumoti yoq.</p> : null}
              {audit.map((row) => (
                <div key={row.id} className="rounded-xl border border-white/10 bg-black/20 p-3 text-sm">
                  <p className="text-white">
                    {row.action} - {row.actorEmail} ({row.actorRole})
                  </p>
                  <p className="mt-1 text-xs text-muted">{new Date(row.at).toLocaleString()}</p>
                  <p className="mt-1 text-xs text-muted">{row.details}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      ) : null}

      {status ? <p className="mt-6 text-sm text-muted">{status}</p> : null}
    </div>
  );
}
