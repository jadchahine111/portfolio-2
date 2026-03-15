"use client";

import { useEffect, useState } from "react";

export function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex flex-col min-h-0 sm:min-h-[calc(100vh-4rem)] items-center justify-start pt-24 pb-16 sm:justify-center sm:pt-0 sm:pb-0 overflow-hidden px-6">

      {/* Center content */}
      <div className="relative flex flex-col items-center text-center max-w-4xl">
        {/* Eyebrow */}
        <div
          className={`flex items-center gap-3 mb-8 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="h-px w-6 bg-foreground/25" />
          <span className="text-[0.65rem] sm:text-[0.7rem] font-medium uppercase tracking-[0.25em] text-foreground/40">
            Full-Stack Developer
          </span>
          <div className="h-px w-6 bg-foreground/25" />
        </div>

        {/* Main headline */}
        <h1>
          <span
            className={`block font-serif text-[clamp(3rem,9vw,6rem)] italic leading-[1] tracking-tight text-foreground transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            Crafting digital
          </span>
          <span
            className={`block font-serif text-[clamp(3rem,9vw,6rem)] italic leading-[1] tracking-tight text-foreground transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "480ms" }}
          >
            experiences that
          </span>
          <span
            className={`inline-block transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "610ms" }}
          >
            <span className="font-serif text-[clamp(3rem,9vw,6rem)] italic leading-[1] tracking-tight text-foreground">
              feel{" "}
            </span>
            <span className="relative">
              <span className="text-[clamp(3rem,9vw,6rem)] font-light leading-[1] tracking-tight text-foreground/70">
                alive
              </span>
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-foreground/20 transition-all duration-1000 ease-out ${
                  visible ? "w-full" : "w-0"
                }`}
                style={{ transitionDelay: "1100ms" }}
              />
            </span>
          </span>
        </h1>

        {/* Description */}
        <p
          className={`mt-8 max-w-md text-[0.95rem] sm:text-[1.05rem] leading-[1.75] text-foreground/45 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "750ms" }}
        >
          I design and build thoughtful interfaces, blending clean code
          with refined aesthetics to create products people genuinely enjoy
          using.
        </p>


        {/* CTA row */}
        <div
          className={`mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "980ms" }}
        >
          <a
            href="#work"
            className="group relative inline-flex h-12 w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-full bg-foreground px-8 text-background text-[0.8rem] font-medium uppercase tracking-[0.15em] transition-all hover:shadow-lg hover:shadow-foreground/10"
          >
            <span className="relative z-10">View Work</span>
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

          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-[0.8rem] font-medium uppercase tracking-[0.15em] text-foreground/50 transition-colors hover:text-foreground"
          >
            Get in touch
            <span className="h-px w-5 bg-current transition-all group-hover:w-8" />
          </a>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div
        className={`sm:absolute sm:bottom-8 sm:left-1/2 sm:-translate-x-1/2 mt-16 sm:mt-0 flex flex-col items-center gap-3 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "1300ms" }}
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-foreground/25">
          Scroll
        </span>
        <div className="relative h-10 w-px overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-foreground/15 animate-[scrollLine_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
