import Link from "next/link";
import { ContactConfig } from "@/lib/cms-types";

type ContactConfidenceProps = {
  contact: ContactConfig;
};

export function ContactConfidence({ contact }: ContactConfidenceProps) {
  return (
    <aside className="rounded-2xl border border-white/[0.06] bg-[#0d0d0d] p-7 md:p-9">
      <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">Aloqa</p>
      <h3 className="mt-3 text-[28px] font-semibold leading-tight tracking-[-0.025em] text-white md:text-[32px]">
        24 soat ichida javob beramiz.
      </h3>
      <p className="mt-3 text-[15px] leading-[1.7] text-white/45">
        Brief yuboringan, jamoamiz texnik yechim, taxminiy muddat va birinchi sprintni yuboradi.
      </p>

      <div className="mt-7 grid gap-2.5">
        <Link
          href={contact.telegram}
          target="_blank"
          rel="noreferrer"
          data-magnetic
          className="group flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-4 transition-all duration-300 hover:border-accent/40"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(190,242,100,0.08)", border: "1px solid rgba(190,242,100,0.2)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <path d="M22 2L11 13" />
                <path d="M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </span>
            <div>
              <p className="text-[14px] font-medium text-white">Telegram</p>
              <p className="text-[12px] text-white/40">{contact.telegram.replace("https://t.me/", "@")}</p>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>

        <Link
          href={`mailto:${contact.email}`}
          data-magnetic
          className="group flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-4 transition-all duration-300 hover:border-accent/40"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(190,242,100,0.08)", border: "1px solid rgba(190,242,100,0.2)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </span>
            <div>
              <p className="text-[14px] font-medium text-white">Email</p>
              <p className="text-[12px] text-white/40">{contact.email}</p>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>

      <div className="mt-8 flex items-start gap-3 rounded-xl border border-accent/15 bg-accent/[0.04] p-4">
        <span className="mt-[7px] block h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
        <p className="text-[13px] leading-[1.65] text-white/65">
          Har loyiha uchun KPI va javobgarlik zonalari yozma tarzda kelishiladi.
        </p>
      </div>
    </aside>
  );
}
