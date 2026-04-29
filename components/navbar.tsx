"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "@/lib/cms-types";

type NavbarProps = {
  navLinks: NavItem[];
};

export function Navbar({ navLinks }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a12]/80 backdrop-blur-2xl">
      <div className="container-shell flex h-[78px] items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="relative inline-flex h-3 w-3">
            <span className="absolute inset-0 rounded-full bg-accent opacity-60 blur-sm" />
            <span className="relative h-3 w-3 rounded-full bg-accent" />
          </span>
          <span className="text-sm font-extrabold tracking-[0.22em] text-white md:text-base">VIORA HUB</span>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] p-1.5 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active
                    ? "bg-white/12 text-white"
                    : "text-muted hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="btn-primary hidden md:inline-flex">
            Loyihani boshlash
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex rounded-full border border-white/15 p-2 text-white md:hidden"
            aria-label="Menyuni ochish"
          >
            <span className="block h-5 w-5 text-sm font-semibold">{open ? "Yop" : "Men"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="container-shell pb-4 md:hidden">
          <div className="premium-panel rounded-2xl p-3">
            <div className="grid gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-3 py-2 text-sm ${
                    pathname === link.href ? "bg-white/12 text-white" : "text-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary mt-1 w-full">
                Loyihani boshlash
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
