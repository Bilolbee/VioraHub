import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-borderSubtle">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold tracking-[0.2em]">VIORA HUB</p>
          <p className="mt-3 max-w-sm text-sm text-muted">
            Ambitsiyali bizneslar uchun premium sayt, bot va osish tizimlari.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium text-white">Tezkor havolalar</p>
          <div className="flex flex-col gap-2 text-sm text-muted">
            <Link href="/portfolio" className="hover:text-white">
              Portfolio
            </Link>
            <Link href="/services" className="hover:text-white">
              Xizmatlar
            </Link>
            <Link href="/about" className="hover:text-white">
              Biz haqimizda
            </Link>
          </div>
        </div>
        <div className="text-sm text-muted">
          <p>Telegram: @viorahub</p>
          <p className="mt-2">Instagram: @viorahub</p>
          <p className="mt-2">Telefon: +998 90 000 00 00</p>
          <p className="mt-2">Email: team@viorahub.com</p>
        </div>
      </div>
    </footer>
  );
}
