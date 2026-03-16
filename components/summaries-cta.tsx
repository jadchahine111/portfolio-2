"use client";

import { useEffect, useRef, useState } from "react";

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

const topRow = [
  { label: "Data Structures", code: "CS201" },
  { label: "Algorithms", code: "CS301" },
  { label: "Operating Systems", code: "CS305" },
  { label: "Database Systems", code: "CS310" },
  { label: "Computer Networks", code: "CS320" },
];

const bottomRow = [
  { label: "Discrete Mathematics", code: "MA210" },
  { label: "Software Engineering", code: "CS401" },
  { label: "Computer Architecture", code: "CS250" },
  { label: "Web Development", code: "CS360" },
  { label: "Linear Algebra", code: "MA220" },
];

function Marquee({
  items,
  reverse = false,
  visible,
}: {
  items: { label: string; code: string }[];
  reverse?: boolean;
  visible: boolean;
}) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 sm:w-32 bg-gradient-to-r from-[color-mix(in_srgb,var(--foreground)_1.5%,var(--background))] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 sm:w-32 bg-gradient-to-l from-[color-mix(in_srgb,var(--foreground)_1.5%,var(--background))] to-transparent" />

      <div
        className={`flex w-max gap-3 sm:gap-4 transition-opacity duration-1000 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          animation: visible
            ? `${reverse ? "marqueeReverse" : "marquee"} 35s linear infinite`
            : "none",
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="topic-card group relative flex-shrink-0 flex items-stretch overflow-hidden rounded-[0.5rem] border border-foreground/[0.06] transition-all duration-500 hover:border-foreground/[0.14]"
          >
            {/* Left accent border */}
            <div className="w-[3px] flex-shrink-0 bg-foreground/[0.06] group-hover:bg-foreground/30 transition-colors duration-500" />

            <div className="flex items-center gap-3 sm:gap-4 py-2.5 sm:py-3 pl-3 sm:pl-4 pr-5 sm:pr-6">
              {/* Course code */}
              <span className="font-mono text-[0.6rem] sm:text-[0.65rem] text-foreground/20 group-hover:text-foreground/40 tracking-[0.08em] uppercase transition-colors duration-500 whitespace-nowrap">
                {item.code}
              </span>

              {/* Separator slash */}
              <span className="text-foreground/[0.08] group-hover:text-foreground/20 text-[0.75rem] transition-colors duration-500 select-none">/</span>

              {/* Course name */}
              <span className="text-[0.8rem] sm:text-[0.85rem] text-foreground/30 group-hover:text-foreground/65 transition-colors duration-500 whitespace-nowrap tracking-[0.04em] uppercase font-medium">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SummariesCTA() {
  const section = useScrollReveal(0.15);
  const content = useScrollReveal(0.1);
  const marqueeReveal = useScrollReveal(0.05);

  return (
    <section className="relative pt-4 sm:pt-8 pb-20 sm:pb-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div
          ref={section.ref}
          className="relative rounded-2xl border border-foreground/[0.08] overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-foreground/[0.015]" />
          {/* Subtle dot grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle, var(--foreground) 0.5px, transparent 0.5px)`,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-16 h-px bg-foreground/[0.12]" />
          <div className="absolute top-0 left-0 w-px h-16 bg-foreground/[0.12]" />
          <div className="absolute bottom-0 right-0 w-16 h-px bg-foreground/[0.12]" />
          <div className="absolute bottom-0 right-0 w-px h-16 bg-foreground/[0.12]" />

          {/* Top content — centered text + buttons */}
          <div
            ref={content.ref}
            className="relative px-8 sm:px-12 lg:px-16 pt-10 sm:pt-14 lg:pt-16 pb-10 sm:pb-14"
          >
            <div className="max-w-2xl mx-auto text-center">
              <div
                className={`flex items-center justify-center gap-3 mb-6 transition-all duration-700 ease-out ${
                  content.visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div className="h-px w-8 bg-foreground/20" />
                <span className="text-[0.65rem] sm:text-[0.7rem] font-medium uppercase tracking-[0.25em] text-foreground/40">
                  Free Resource
                </span>
                <div className="h-px w-8 bg-foreground/20" />
              </div>

              <h2
                className={`font-serif italic text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[1.1] tracking-tighter text-foreground mb-5 transition-all duration-700 ease-out ${
                  content.visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                Lebanese University{" "}
                <span className="text-foreground/50">Summaries</span>
              </h2>

              <p
                className={`text-[0.9rem] sm:text-[0.95rem] leading-[1.8] text-foreground/40 max-w-lg mx-auto mb-8 transition-all duration-700 ease-out ${
                  content.visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                Comprehensive study notes and summaries for Computer Science
                courses at the Lebanese University. Distilled from lectures,
                textbooks, and hands-on experience — built to help you study
                smarter.
              </p>

              {/* CTA buttons */}
              <div
                className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ease-out ${
                  content.visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                <a
                  href="#"
                  className="group relative inline-flex h-12 w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-full bg-foreground px-8 text-background text-[0.8rem] font-medium uppercase tracking-[0.15em] transition-all hover:shadow-lg hover:shadow-foreground/10"
                >
                  <span className="relative z-10">Browse Summaries</span>
                  <svg
                    className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1"
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
                  <span className="absolute inset-0 bg-foreground/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>

              </div>
            </div>
          </div>

          {/* Divider before marquee */}
          <div className="mx-8 sm:mx-12 lg:mx-16 h-px bg-foreground/[0.06]" />

          {/* Marquee area — bleeds to card edges */}
          <div
            ref={marqueeReveal.ref}
            className="relative py-8 sm:py-10 flex flex-col gap-3 sm:gap-4"
          >
            <Marquee items={topRow} visible={marqueeReveal.visible} />
            <Marquee
              items={bottomRow}
              reverse
              visible={marqueeReveal.visible}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
