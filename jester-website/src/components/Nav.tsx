"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SERVICES = [
  { label: "Advisory", href: "/advisory" },
  { label: "Workshops", href: "/workshops" },
  { label: "Jester Hat", href: "/jester-hat" },
];

const INSIGHTS = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
];

function isCurrent(pathname: string, href: string) {
  return pathname.startsWith(href);
}

export default function Nav() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/jester-mark.svg"
            alt="Jester mark"
            width={32}
            height={32}
            className="h-8 w-8"
            priority
          />
          <span className="font-display text-lg font-semibold tracking-tight text-cream">
            Jester
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          <div className="dropdown">
            <button
              className={`nav-link ${isCurrent(pathname, "/advisory") || isCurrent(pathname, "/workshops") || isCurrent(pathname, "/jester-hat") ? "text-primary" : ""}`}
              onMouseEnter={() => setOpenDropdown("services")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              Services
              <svg className="ml-1 h-3 w-3 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div
              className="dropdown-content"
              style={openDropdown === "services" ? { opacity: 1, visibility: "visible", transform: "translateY(0)" } : undefined}
              onMouseEnter={() => setOpenDropdown("services")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {SERVICES.map((s) => (
                <Link key={s.href} href={s.href} className="dropdown-item">
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="dropdown">
            <button
              className={`nav-link ${isCurrent(pathname, "/case-studies") || isCurrent(pathname, "/blog") ? "text-primary" : ""}`}
              onMouseEnter={() => setOpenDropdown("insights")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              Insights
              <svg className="ml-1 h-3 w-3 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div
              className="dropdown-content"
              style={openDropdown === "insights" ? { opacity: 1, visibility: "visible", transform: "translateY(0)" } : undefined}
              onMouseEnter={() => setOpenDropdown("insights")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {INSIGHTS.map((s) => (
                <Link key={s.href} href={s.href} className="dropdown-item">
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/methodology" className={`nav-link ${isCurrent(pathname, "/methodology") ? "text-primary" : ""}`}>
            Methodology
          </Link>

          <Link href="/about" className={`nav-link ${isCurrent(pathname, "/about") ? "text-primary" : ""}`}>
            About
          </Link>

          <Link href="/contact" className={`nav-link ${isCurrent(pathname, "/contact") ? "text-primary" : ""}`}>
            Contact
          </Link>
        </nav>

        <div className="hidden lg:block">
          <Link href="/contact" className="btn btn-primary btn-sm">
            Work with Jester
          </Link>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center border border-cream/25 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg className="h-4 w-4 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-cream/15 bg-ink px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-widest text-gold">Services</p>
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="nav-link"
                onClick={() => setMobileOpen(false)}
              >
                {s.label}
              </Link>
            ))}
            <div className="my-2 border-t border-cream/15" />
            <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-widest text-gold">Insights</p>
            {INSIGHTS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="nav-link"
                onClick={() => setMobileOpen(false)}
              >
                {s.label}
              </Link>
            ))}
            <div className="my-2 border-t border-cream/15" />
            <Link href="/methodology" className="nav-link" onClick={() => setMobileOpen(false)}>
              Methodology
            </Link>
            <div className="my-2 border-t border-cream/15" />
            <Link href="/about" className="nav-link" onClick={() => setMobileOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="nav-link" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>
            <Link
              href="/contact"
              className="btn btn-primary mt-3"
              onClick={() => setMobileOpen(false)}
            >
              Work with Jester
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
