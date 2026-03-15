"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const projects = [
  {
    title: "Meridian Dashboard",
    description:
      "A real-time analytics dashboard for monitoring SaaS metrics. Features live data visualization, custom report builders, and team collaboration tools.",
    technologies: ["Next.js", "TypeScript", "D3.js", "Supabase"],
    website: "#",
    github: "#",
  },
  {
    title: "Aether Commerce",
    description:
      "Full-stack e-commerce platform with headless CMS integration, dynamic inventory management, and a frictionless checkout experience.",
    technologies: ["React", "Node.js", "Stripe", "PostgreSQL"],
    website: "#",
    github: null,
  },
  {
    title: "Nimbus Notes",
    description:
      "A minimal, keyboard-first note-taking app with markdown support, nested folders, and end-to-end encryption for privacy-conscious users.",
    technologies: ["Vue.js", "Firebase", "Tailwind CSS", "Crypto API"],
    website: null,
    github: "#",
  },
  {
    title: "Pulse Fitness",
    description:
      "Mobile-first fitness tracker with custom workout builders, progress analytics, and social features for accountability and community.",
    technologies: ["React Native", "Express", "MongoDB", "Chart.js"],
    website: "#",
    github: "#",
  },
  {
    title: "Terraform Studio",
    description:
      "Visual infrastructure-as-code editor that lets teams design cloud architecture through an intuitive drag-and-drop interface.",
    technologies: ["Next.js", "Go", "AWS SDK", "WebSocket"],
    website: "#",
    github: null,
  },
];

const TOTAL = projects.length;
// [real] [clone] — forward-only infinite loop, starts at 0
const loopedProjects = [...projects, ...projects];

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

export function ProjectsSection() {
  const [headingRef, headingVisible] = useScrollReveal(0.2);
  const [carouselRef, carouselVisible] = useScrollReveal(0.1);

  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragMoved, setHasDragMoved] = useState(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0 });
  const jumping = useRef(false);

  const getStride = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 552; // 520 + 32 gap
    const card = el.querySelector<HTMLElement>("[data-project-card]");
    return (card?.offsetWidth ?? 520) + 32;
  }, []);

  // Start at scroll position 0 — first card flush with left edge
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = 0;
  }, []);

  // On scroll: track active card + forward loop reset
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      if (jumping.current) return;

      const stride = getStride();
      const setWidth = TOTAL * stride;
      const padLeft = parseFloat(getComputedStyle(el).paddingLeft);

      // Determine active
      const cards = el.querySelectorAll<HTMLElement>("[data-project-card]");
      const scrollPos = el.scrollLeft;
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const d = Math.abs(card.offsetLeft - scrollPos - padLeft);
        if (d < minDist) {
          minDist = d;
          closest = i;
        }
      });
      const real = closest % TOTAL;
      setActiveIndex(real);
      if (real > 0) setHasScrolled(true);

      // If scrolled into clone set, jump back to real set
      if (el.scrollLeft >= setWidth) {
        jumping.current = true;
        el.style.scrollBehavior = "auto";
        el.scrollLeft -= setWidth;
        el.style.scrollBehavior = "";
        requestAnimationFrame(() => {
          jumping.current = false;
        });
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [getStride]);

  // Resize: reset to first card
  useEffect(() => {
    const handler = () => {
      const el = trackRef.current;
      if (!el) return;
      el.style.scrollBehavior = "auto";
      el.scrollLeft = 0;
      el.style.scrollBehavior = "";
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const stride = getStride();

    if (direction === "left" && activeIndex === 0 && hasScrolled) {
      // At card 1 after looping — jump to clone card 1, then scroll left to card 5
      jumping.current = true;
      el.style.scrollBehavior = "auto";
      el.scrollLeft = TOTAL * stride;
      el.style.scrollBehavior = "";
      requestAnimationFrame(() => {
        jumping.current = false;
        el.scrollBy({ left: -stride, behavior: "smooth" });
      });
    } else {
      el.scrollBy({
        left: direction === "left" ? -stride : stride,
        behavior: "smooth",
      });
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    setIsDragging(true);
    setHasDragMoved(false);
    dragState.current = {
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
    };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 3) setHasDragMoved(true);
    el.scrollLeft = dragState.current.scrollLeft - dx;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    trackRef.current?.releasePointerCapture(e.pointerId);
  };

  return (
    <section id="work" className="relative pt-8 sm:pt-12 pb-16 sm:pb-24">
      {/* Heading — matches About section pattern */}
      <div className="mx-auto max-w-6xl px-6">
        <div ref={headingRef} className="mb-16 sm:mb-24">
          <div
            className={`flex items-center gap-3 mb-6 transition-all duration-700 ease-out ${
              headingVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="h-px w-8 bg-foreground/20" />
            <span className="text-[0.65rem] sm:text-[0.7rem] font-medium uppercase tracking-[0.25em] text-foreground/40">
              Projects
            </span>
          </div>

          <div className="flex items-end justify-between gap-8">
            <h2
              className={`font-serif text-[clamp(2.2rem,6vw,4.5rem)] italic leading-[1.05] tracking-tight text-foreground max-w-3xl transition-all duration-700 ease-out ${
                headingVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "150ms" }}
            >
              Selected <span className="text-foreground/50">works</span>
            </h2>

            {/* Arrows — large screens only, aligned with heading */}
            <div
              className={`hidden sm:flex items-center gap-3 mb-2 transition-all duration-700 ease-out ${
                headingVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "250ms" }}
            >
              <button
                onClick={() => scroll("left")}
                disabled={activeIndex === 0 && !hasScrolled}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 text-foreground/40 transition-all hover:border-foreground/25 hover:text-foreground/70 disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
                aria-label="Previous project"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5m0 0l7 7M5 12l7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 text-foreground/40 transition-all hover:border-foreground/25 hover:text-foreground/70 cursor-pointer"
                aria-label="Next project"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m0 0l-7-7M19 12l-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className={`relative transition-all duration-700 ease-out ${
          carouselVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={`flex gap-8 overflow-x-auto px-6 sm:px-[calc((100vw-72rem)/2+1.5rem)] snap-x snap-mandatory scroll-pl-6 sm:scroll-pl-[calc((100vw-72rem)/2+1.5rem)] ${
            isDragging ? "cursor-grabbing select-none" : "cursor-grab"
          }`}
          style={{
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            msOverflowStyle: "none",
          }}
        >
          {loopedProjects.map((project, i) => {
            const realIndex = i % TOTAL;
            const num = String(realIndex + 1).padStart(2, "0");
            const isActive = realIndex === activeIndex;

            return (
              <div
                key={`${project.title}-${i}`}
                data-project-card
                className={`group relative shrink-0 w-[85vw] sm:w-[520px] snap-start transition-all duration-700 ease-out ${
                  carouselVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{
                  pointerEvents:
                    hasDragMoved && isDragging ? "none" : "auto",
                }}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl border transition-all duration-500 project-card-hover ${
                    isActive
                      ? "border-foreground/10 scale-100"
                      : "border-foreground/4 scale-[0.97] opacity-60"
                  }`}
                >
                  {/* Image area */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-foreground/3">
                    <div className="absolute inset-0 bg-linear-to-br from-foreground/2 via-transparent to-foreground/4" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-serif italic text-[clamp(7rem,18vw,12rem)] leading-none text-foreground/4 select-none transition-all duration-700 group-hover:text-foreground/[0.07] group-hover:scale-105">
                        {num}
                      </span>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-12 h-px bg-foreground/8 group-hover:w-20 transition-all duration-500" />
                    <div className="absolute top-0 left-0 w-px h-12 bg-foreground/8 group-hover:h-20 transition-all duration-500" />
                    <div className="absolute bottom-0 right-0 w-12 h-px bg-foreground/8 group-hover:w-20 transition-all duration-500" />
                    <div className="absolute bottom-0 right-0 w-px h-12 bg-foreground/8 group-hover:h-20 transition-all duration-500" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="text-foreground/15">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                        <span className="text-[0.55rem] uppercase tracking-[0.2em] text-foreground/15">Preview</span>
                      </div>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 h-16 bg-linear-to-t from-background/80 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative p-7 sm:p-8 -mt-6">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="font-mono text-[0.6rem] text-foreground/20 tracking-widest">{num}</span>
                      <div className="h-px flex-1 bg-foreground/6 group-hover:bg-foreground/12 transition-colors duration-500" />
                    </div>

                    <h3 className="font-serif text-[1.35rem] sm:text-[1.5rem] italic tracking-tight text-foreground leading-[1.15] mb-3">
                      {project.title}
                    </h3>

                    <p className="text-[0.85rem] leading-[1.75] text-foreground/35 mb-6 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 mb-7">
                      {project.technologies.map((tech, ti) => (
                        <span key={tech} className="flex items-center gap-1.5">
                          <span className="text-[0.6rem] uppercase tracking-[0.15em] text-foreground/25 group-hover:text-foreground/40 transition-colors duration-300">
                            {tech}
                          </span>
                          {ti < project.technologies.length - 1 && (
                            <span className="text-foreground/10">/</span>
                          )}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      {project.website && (
                        <a
                          href={project.website}
                          onClick={(e) => {
                            if (hasDragMoved) e.preventDefault();
                          }}
                          className="group/btn inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-5 text-background text-[0.7rem] font-medium uppercase tracking-[0.12em] transition-all hover:shadow-lg hover:shadow-foreground/10"
                        >
                          <span>View Project</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/btn:translate-x-0.5">
                            <path d="M7 17L17 7M17 7H7M17 7v10" />
                          </svg>
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          onClick={(e) => {
                            if (hasDragMoved) e.preventDefault();
                          }}
                          className="group/btn inline-flex h-9 items-center gap-2 rounded-full border border-foreground/10 px-5 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-foreground/50 transition-all hover:border-foreground/25 hover:text-foreground/80"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="opacity-60">
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                          </svg>
                          <span>Source</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fade edge — right only */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-background to-transparent" />
      </div>

      {/* Dots — small screens only, centered */}
      <div className="flex sm:hidden items-center justify-center gap-2 mt-8 px-6">
        {projects.map((_, i) => (
          <div
            key={i}
            className={`transition-all duration-400 rounded-full ${
              i === activeIndex
                ? "w-6 h-1.5 bg-foreground/30"
                : "w-1.5 h-1.5 bg-foreground/10"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
