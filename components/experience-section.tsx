"use client";

import { useEffect, useState } from "react";

const experiences = [
  {
    period: "2024 — Present",
    role: "Senior Full-Stack Developer",
    company: "Company Name",
    description:
      "Leading the development of scalable web applications, architecting front-end systems, and mentoring junior developers. Driving adoption of modern tooling and performance-first practices across the engineering org.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "AWS"],
  },
  {
    period: "2023 — 2024",
    role: "Full-Stack Developer",
    company: "Company Name",
    description:
      "Built and shipped customer-facing products from concept to production. Collaborated closely with design to implement pixel-perfect interfaces while maintaining robust back-end services.",
    technologies: ["React", "Node.js", "MongoDB", "Docker"],
  },
  {
    period: "2022 — 2023",
    role: "Frontend Developer",
    company: "Company Name",
    description:
      "Developed responsive, accessible interfaces for a SaaS platform serving thousands of daily users. Reduced page load times by 40% through code splitting and optimization strategies.",
    technologies: ["Vue.js", "Tailwind CSS", "GraphQL", "Figma"],
  },
  {
    period: "2021 — 2022",
    role: "Junior Developer",
    company: "Company Name",
    description:
      "Started my professional journey building internal tools and contributing to client projects. Learned the fundamentals of shipping production code in a fast-paced agency environment.",
    technologies: ["JavaScript", "React", "CSS", "Firebase"],
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

function ExperienceContent({
  experience,
  align,
}: {
  experience: (typeof experiences)[0];
  align: "left" | "right";
}) {
  return (
    <div className={align === "left" ? "md:text-right" : "md:text-left"}>
      <h3 className="font-serif italic text-[1.2rem] sm:text-[1.45rem] tracking-tighter text-foreground leading-[1.2] mb-1">
        {experience.role}
      </h3>

      <span className="block text-[0.8rem] font-medium uppercase tracking-[0.12em] text-foreground/40 mb-4">
        {experience.company}
      </span>

      <p className={`text-[0.9rem] leading-[1.75] text-foreground/45 max-w-md mb-5 ${align === "left" ? "md:ml-auto" : ""}`}>
        {experience.description}
      </p>

      <div className={`flex flex-wrap gap-2 ${align === "left" ? "md:justify-end" : ""}`}>
        {experience.technologies.map((tech) => (
          <span
            key={tech}
            className="text-[0.65rem] font-medium uppercase tracking-widest text-gold/40 border border-gold/15 rounded-full px-3 py-1"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

function TimelineEntry({
  experience,
  index,
  isLast,
}: {
  experience: (typeof experiences)[0];
  index: number;
  isLast: boolean;
}) {
  const [entryRef, entryVisible] = useScrollReveal(0.2);
  const isEven = index % 2 === 0;

  return (
    <div ref={entryRef} className="relative grid grid-cols-[1fr] md:grid-cols-[1fr_40px_1fr] gap-0">
      {/* Left column */}
      <div
        className={`hidden md:block pb-20 pr-8 transition-all duration-700 ease-out ${
          entryVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: `${150 + index * 80}ms` }}
      >
        {isEven ? (
          <div className="flex items-start justify-end pt-2">
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-foreground/30 whitespace-nowrap">
              {experience.period}
            </span>
          </div>
        ) : (
          <ExperienceContent experience={experience} align="left" />
        )}
      </div>

      {/* Timeline spine — center */}
      <div className="hidden md:flex flex-col items-center">
        <div
          className={`relative z-10 mt-[6px] transition-all duration-500 ease-out ${
            entryVisible ? "scale-100" : "scale-0"
          }`}
          style={{ transitionDelay: `${100 + index * 80}ms` }}
        >
          <div className="h-[9px] w-[9px] rounded-full border-[1.5px] border-gold/40 bg-background" />
        </div>
        {!isLast && (
          <div
            className={`w-px flex-1 origin-top transition-all duration-1000 ease-out ${
              entryVisible
                ? "scale-y-100 bg-gold/15"
                : "scale-y-0 bg-transparent"
            }`}
            style={{ transitionDelay: `${200 + index * 80}ms` }}
          />
        )}
      </div>

      {/* Right column */}
      <div
        className={`hidden md:block pb-20 pl-8 transition-all duration-700 ease-out ${
          entryVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: `${150 + index * 80}ms` }}
      >
        {isEven ? (
          <ExperienceContent experience={experience} align="right" />
        ) : (
          <div className="flex items-start pt-2">
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-foreground/30 whitespace-nowrap">
              {experience.period}
            </span>
          </div>
        )}
      </div>

      {/* Mobile layout — stacked */}
      <div
        className={`md:hidden pb-14 transition-all duration-700 ease-out ${
          entryVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: `${150 + index * 80}ms` }}
      >
        <span className="block text-[0.65rem] font-medium uppercase tracking-[0.2em] text-foreground/30 mb-3">
          {experience.period}
        </span>
        <ExperienceContent experience={experience} align="right" />
      </div>
    </div>
  );
}

export function ExperienceSection() {
  const [headingRef, headingVisible] = useScrollReveal(0.2);

  return (
    <section id="experience" className="relative pt-48 sm:pt-64 pb-16 sm:pb-20 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Section label + heading — centered */}
        <div ref={headingRef} className="mb-20 sm:mb-28 text-center">
          <div
            className={`flex items-center justify-center gap-3 mb-6 transition-all duration-700 ease-out ${
              headingVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="h-px w-8 bg-gold/30" />
            <span className="text-[0.65rem] sm:text-[0.7rem] font-medium uppercase tracking-[0.25em] text-gold/60">
              Experience
            </span>
            <div className="h-px w-8 bg-gold/30" />
          </div>

          <h2
            className={`font-serif italic text-[clamp(1.9rem,5vw,3.8rem)] leading-[1.2] tracking-tighter text-foreground transition-all duration-700 ease-out ${
              headingVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            Where I&apos;ve been{" "}
            <span className="text-gold/50">&</span>{" "}
            <span className="text-gold/50">what I&apos;ve built</span>
          </h2>
        </div>

        {/* Timeline */}
        <div>
          {experiences.map((exp, i) => (
            <TimelineEntry
              key={exp.period}
              experience={exp}
              index={i}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
