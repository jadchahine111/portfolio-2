"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    // Observe hero section to clear active state
    const hero = document.querySelector("section:first-of-type");
    if (hero) {
      const heroObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection("");
          }
        },
        { rootMargin: "-50% 0px -50% 0px" }
      );
      heroObserver.observe(hero);
      observers.push(heroObserver);
    }

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-50% 0px -50% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.06)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo / Name */}
            <Link
              href="/"
              className="group relative flex items-baseline gap-1.5"
              onClick={() => setMobileOpen(false)}
            >
              <span className="font-serif text-[1.35rem] italic tracking-tight text-foreground transition-opacity group-hover:opacity-70">
                Jad
              </span>
              <span className="text-[0.8rem] font-medium uppercase tracking-[0.2em] text-foreground/70 transition-opacity group-hover:opacity-70">
                Chahine
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative px-4 py-2 text-[0.8rem] font-medium uppercase tracking-[0.15em] transition-colors hover:text-foreground group ${
                      isActive ? "text-foreground" : "text-foreground/60"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-1 left-4 right-4 h-px bg-foreground transition-transform origin-left duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right side: theme toggle + mobile hamburger */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-foreground/[0.06] cursor-pointer"
                aria-label="Toggle theme"
              >
                {mounted ? (
                  <div className="relative w-[18px] h-[18px]">
                    {/* Sun */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`absolute inset-0 w-[18px] h-[18px] text-foreground/80 transition-all duration-300 ${
                        isDark
                          ? "rotate-0 scale-100 opacity-100"
                          : "-rotate-90 scale-0 opacity-0"
                      }`}
                    >
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                    {/* Moon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`absolute inset-0 w-[18px] h-[18px] text-foreground/80 transition-all duration-300 ${
                        isDark
                          ? "rotate-90 scale-0 opacity-0"
                          : "rotate-0 scale-100 opacity-100"
                      }`}
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-[18px] h-[18px]" />
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-foreground/[0.06] cursor-pointer md:hidden"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                <div className="relative w-[18px] h-[14px]">
                  <span
                    className={`absolute left-0 right-0 h-[1.5px] bg-foreground/80 rounded-full transition-all duration-300 ${
                      mobileOpen
                        ? "top-1/2 -translate-y-1/2 rotate-45"
                        : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-foreground/80 rounded-full transition-all duration-300 ${
                      mobileOpen ? "opacity-0 scale-x-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 right-0 h-[1.5px] bg-foreground/80 rounded-full transition-all duration-300 ${
                      mobileOpen
                        ? "top-1/2 -translate-y-1/2 -rotate-45"
                        : "bottom-0"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl" />
          <div
            ref={menuRef}
            className="relative flex flex-col justify-center h-full px-8 menu-enter"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item, i) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="menu-item-enter group flex items-center gap-4 py-3"
                  style={{ animationDelay: `${80 + i * 60}ms` }}
                >
                  <span className="text-[0.7rem] font-mono text-foreground/30 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-[2.2rem] italic text-foreground/90 transition-colors group-hover:text-foreground tracking-tight">
                    {item.label}
                  </span>
                  <span className="flex-1 h-px bg-foreground/[0.06] mx-4" />
                  <svg
                    className="w-4 h-4 text-foreground/20 transition-all group-hover:text-foreground/60 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </Link>
              ))}
            </nav>

            {/* Bottom info on mobile */}
            <div
              className="menu-item-enter absolute bottom-12 left-8 right-8 flex items-center justify-between border-t border-foreground/[0.06] pt-6"
              style={{ animationDelay: `${80 + navItems.length * 60 + 40}ms` }}
            >
              <span className="text-[0.7rem] uppercase tracking-[0.2em] text-foreground/30">
                Portfolio 2026
              </span>
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="text-[0.7rem] uppercase tracking-[0.2em] text-foreground/50 hover:text-foreground transition-colors cursor-pointer"
              >
                {mounted ? (isDark ? "Light mode" : "Dark mode") : ""}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16" />
    </>
  );
}
