"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      login: String(formData.get("login") || ""),
      password: String(formData.get("password") || "")
    };

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setLoading(false);

    if (!response.ok) {
      const body = await response.json().catch(() => ({ error: "Kirish muvaffaqiyatsiz" }));
      setError(body.error || "Kirish muvaffaqiyatsiz");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="relative mx-auto flex min-h-[78vh] max-w-6xl items-center justify-center py-16">
      <div className="pointer-events-none absolute -top-16 right-4 h-64 w-64 rounded-full opacity-60" style={{ background: "radial-gradient(circle, rgba(109,40,217,0.3) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="pointer-events-none absolute -bottom-20 left-2 h-60 w-60 rounded-full opacity-50" style={{ background: "radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 70%)", filter: "blur(55px)" }} />

      <div className="grid w-full gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="premium-panel hidden rounded-[32px] p-10 lg:block">
          <p className="badge-pill">CTRLLAB Control</p>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-white">
            <span>Enterprise</span>
            <span className="mt-1 block text-gradient">Admin Workflow</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-[1.9] text-white/45">
            Kontent boshqaruvi, stagingdan productionga publish, audit nazorati va lead pipeline bitta panelda.
          </p>

          <div className="mt-8 space-y-3 text-sm text-white/45">
            <p className="premium-panel-soft rounded-xl px-4 py-3">Editor: kontentni tahrirlaydi</p>
            <p className="premium-panel-soft rounded-xl px-4 py-3">Reviewer/Admin: productionga chiqaradi</p>
            <p className="premium-panel-soft rounded-xl px-4 py-3">Audit: barcha harakatlar loglanadi</p>
          </div>
        </section>

        <section className="premium-panel rounded-[32px] p-8 md:p-10">
          <h2 className="text-3xl font-bold text-white">Admin panelga kirish</h2>
          <p className="mt-3 text-sm text-white/45">Login ma&apos;lumotlarini kiriting va boshqaruv paneliga o&apos;ting.</p>
          <form onSubmit={onSubmit} className="mt-7 space-y-4">
            <label className="block text-xs font-medium uppercase tracking-[0.14em] text-white/40">
              Login
              <input required name="login" type="text" className="admin-input mt-2 normal-case tracking-normal" />
            </label>
            <label className="block text-xs font-medium uppercase tracking-[0.14em] text-white/40">
              Parol
              <input required name="password" type="password" className="admin-input mt-2 normal-case tracking-normal" />
            </label>
            <button disabled={loading} type="submit" className="btn-primary w-full">
              {loading ? "Kirilmoqda..." : "Kirish"}
            </button>
            {error ? (
              <div className="rounded-xl border border-red-400/35 bg-red-500/10 px-4 py-3 text-sm text-red-400/80">{error}</div>
            ) : null}
          </form>
        </section>
      </div>
    </div>
  );
}
