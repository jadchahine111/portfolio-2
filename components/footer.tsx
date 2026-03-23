"use client";

import Link from "next/link";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "https://x.com",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative px-6 pb-10 pt-16 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        {/* Top divider */}
        <div className="h-px w-full bg-gold/15" />

        {/* Main footer content */}
        <div className="grid grid-cols-2 gap-10 pt-14 sm:grid-cols-12 sm:gap-8 lg:pt-16">
          {/* Column 1 — Logo + tagline */}
          <div className="col-span-2 sm:col-span-5 lg:col-span-5">
            <Link
              href="/"
              className="group inline-flex items-baseline gap-1.5"
            >
              <span className="font-serif italic text-[1.2rem] tracking-tighter text-gold-gradient transition-opacity group-hover:opacity-70">
                Jad
              </span>
              <span className="text-[0.8rem] font-medium uppercase tracking-[0.2em] text-foreground/70 transition-opacity group-hover:opacity-70">
                Chahine
              </span>
            </Link>
            <p className="mt-5 max-w-[16rem] text-[0.85rem] leading-[1.7] text-foreground/30">
              Crafting digital experiences with precision, empathy, and an
              obsessive eye for detail.
            </p>
          </div>

          {/* Column 2 — Navigation */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <span className="mb-5 block text-[0.65rem] font-medium uppercase tracking-[0.25em] text-foreground/25">
              Navigation
            </span>
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group inline-flex items-center gap-2 text-[0.8rem] text-foreground/40 transition-colors hover:text-foreground/80"
                >
                  <span className="h-px w-0 bg-foreground/40 transition-all duration-300 group-hover:w-3" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 — Resources */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <span className="mb-5 block text-[0.65rem] font-medium uppercase tracking-[0.25em] text-foreground/25">
              Resources
            </span>
            <nav className="flex flex-col gap-3">
              <Link
                href="#"
                className="group inline-flex items-center gap-2 text-[0.8rem] text-foreground/40 transition-colors hover:text-foreground/80"
              >
                <span className="h-px w-0 bg-foreground/40 transition-all duration-300 group-hover:w-3" />
                LU Summaries
              </Link>
            </nav>
          </div>

          {/* Column 4 — Connect */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-3">
            <span className="mb-5 block text-[0.65rem] font-medium uppercase tracking-[0.25em] text-foreground/25">
              Connect
            </span>
            <div className="flex items-center gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/15 text-foreground/30 transition-all duration-300 hover:border-gold/30 hover:text-gold hover:scale-105"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="group mt-8 inline-flex items-center gap-2.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-foreground/20 transition-colors hover:text-foreground/50 cursor-pointer"
            >
              Back to top
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:-translate-y-1"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center text-center justify-between gap-4 border-t border-gold/10 pt-6 sm:flex-row sm:items-center sm:text-left lg:mt-20">
          <span className="text-[0.65rem] tracking-wide text-foreground/20">
            &copy; 2026 Jad Chahine. All rights reserved.
          </span>
          <span className="text-[0.6rem] font-mono tracking-wide text-foreground/15">
            Designed &amp; built with care
          </span>
        </div>
      </div>
    </footer>
  );
}
