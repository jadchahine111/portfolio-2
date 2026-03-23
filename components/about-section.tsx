"use client";

import { useEffect, useState } from "react";

const stats = [
  { value: "4+", label: "Years Experience" },
  { value: "30+", label: "Projects Delivered" },
  { value: "15+", label: "Technologies" },
];

const philosophyItems = [
  {
    number: "01",
    title: "Design-first thinking",
    description:
      "Every line of code starts with intent. I believe the best products emerge when engineering decisions are guided by empathy and aesthetics.",
  },
  {
    number: "02",
    title: "Relentless refinement",
    description:
      "The difference between good and exceptional lives in the details — the micro-interaction, the pixel-perfect alignment, the thoughtful transition.",
  },
  {
    number: "03",
    title: "Purposeful simplicity",
    description:
      "Complexity is easy. Simplicity requires discipline. I strip away the unnecessary until only what matters remains.",
  },
];

function useScrollReveal(threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, threshold]);

  return [setNode, visible] as const;
}

export function AboutSection() {
  const [headingRef, headingVisible] = useScrollReveal(0.2);
  const [introRef, introVisible] = useScrollReveal(0.15);
  const [statsRef, statsVisible] = useScrollReveal(0.2);
  const [philosophyRef, philosophyVisible] = useScrollReveal(0.1);

  return (
    <section id="about" className="relative pt-16 sm:pt-24 pb-48 sm:pb-64 px-6 overflow-hidden">

      <div className="relative mx-auto max-w-6xl">
        {/* Section label + heading */}
        <div ref={headingRef} className="mb-20 sm:mb-28">
          <div
            className={`flex items-center gap-3 mb-6 transition-all duration-700 ease-out ${headingVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
              }`}
          >
            <div className="h-px w-8 bg-gold/30" />
            <span className="text-[0.65rem] sm:text-[0.7rem] font-medium uppercase tracking-[0.25em] text-gold/60">
              About
            </span>
          </div>

          <h2
            className={`font-serif italic text-[clamp(1.9rem,5vw,3.8rem)] leading-[1.2] tracking-tighter text-foreground max-w-3xl transition-all duration-700 ease-out ${headingVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
              }`}
            style={{ transitionDelay: "150ms" }}
          >
            Building at the intersection of{" "}
            <span className="text-gold/60">code</span> &{" "}
            <span className="text-gold/60">craft</span>
          </h2>
        </div>

        {/* Two-column intro */}
        <div
          ref={introRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-24 sm:mb-32"
        >
          {/* Left column — large intro text */}
          <div className="lg:col-span-5">
            <p
              className={`text-[1.1rem] sm:text-[1.25rem] leading-[1.7] text-foreground/70 transition-all duration-700 ease-out ${introVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
                }`}
            >
              I&apos;m Jad — a full-stack developer based in crafting
              digital products that balance technical rigor with visual
              refinement.
            </p>
          </div>

          {/* Right column — detailed text */}
          <div className="lg:col-span-6 lg:col-start-7 space-y-6">
            <p
              className={`text-[0.95rem] leading-[1.8] text-foreground/45 transition-all duration-700 ease-out ${introVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: "120ms" }}
            >
              With a background spanning front-end interfaces to back-end
              architecture, I approach each project as an opportunity to
              solve real problems through elegant engineering. I care deeply
              about performance, accessibility, and the small details that
              elevate an experience from functional to memorable.
            </p>
            <p
              className={`text-[0.95rem] leading-[1.8] text-foreground/45 transition-all duration-700 ease-out ${introVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: "240ms" }}
            >
              When I&apos;m not writing code, you&apos;ll find me exploring
              new design trends, contributing to open-source projects, or
              experimenting with creative coding and generative art.
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div ref={statsRef} className="mb-24 sm:mb-32">
          <div
            className={`h-px w-full bg-gold/15 mb-10 transition-all duration-1000 ease-out origin-left ${statsVisible ? "scale-x-100" : "scale-x-0"
              }`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center sm:text-left transition-all duration-700 ease-out ${statsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
                  }`}
                style={{ transitionDelay: `${200 + i * 120}ms` }}
              >
                <span className="block font-serif italic text-[clamp(2.1rem,4.5vw,3rem)] leading-[1.1] tracking-tighter text-foreground">
                  {stat.value}
                </span>
                <span className="mt-2 block text-[0.7rem] font-medium uppercase tracking-[0.2em] text-foreground/35">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
          <div
            className={`h-px w-full bg-gold/15 mt-10 transition-all duration-1000 ease-out origin-right ${statsVisible ? "scale-x-100" : "scale-x-0"
              }`}
            style={{ transitionDelay: "300ms" }}
          />
        </div>

        {/* Philosophy / approach */}
        <div ref={philosophyRef}>
          <div
            className={`flex items-center gap-3 mb-14 transition-all duration-700 ease-out ${philosophyVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
              }`}
          >
            <div className="h-px w-8 bg-gold/30" />
            <span className="text-[0.65rem] sm:text-[0.7rem] font-medium uppercase tracking-[0.25em] text-gold/60">
              Approach
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-10">
            {philosophyItems.map((item, i) => (
              <div
                key={item.number}
                className={`group transition-all duration-700 ease-out ${philosophyVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${150 + i * 130}ms` }}
              >
                <span className="block text-[0.7rem] font-mono text-gold/35 mb-4">
                  {item.number}
                </span>
                <h3 className="font-serif italic text-[1.2rem] sm:text-[1.35rem] tracking-tighter text-foreground mb-4 leading-[1.2]">
                  {item.title}
                </h3>
                <p className="text-[0.9rem] leading-[1.75] text-foreground/40">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
