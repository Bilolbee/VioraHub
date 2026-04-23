"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "@/lib/cms-types";

type NavbarProps = {
  navLinks: NavItem[];
};

export function Navbar({ navLinks }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07070d]/80 backdrop-blur-2xl">
      <div className="container-shell flex h-[74px] items-center justify-between">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-glow" />
          <span className="text-sm font-bold tracking-[0.28em] text-white md:text-base">VIORA HUB</span>
        </Link>
        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-muted hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/contact"
          className="rounded-full border border-accent/50 bg-accent/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-accent hover:bg-accent/40 hover:shadow-glow"
        >
          Loyihani boshlash
        </Link>
      </div>
    </header>
  );
}
