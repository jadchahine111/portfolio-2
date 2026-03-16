"use client";

import { useEffect, useRef, useState, FormEvent } from "react";

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

const socials = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "https://x.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export function ContactSection() {
  const heading = useScrollReveal(0.2);
  const content = useScrollReveal(0.1);
  const formReveal = useScrollReveal(0.1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section
      id="contact"
      className="relative pt-16 sm:pt-24 pb-16 sm:pb-20 px-6 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl">
        {/* Divider */}
        <div
          className={`h-px w-full bg-foreground/[0.08] mb-16 sm:mb-24 transition-all duration-1000 ease-out origin-left ${
            heading.visible ? "scale-x-100" : "scale-x-0"
          }`}
        />

        {/* Section label + heading */}
        <div ref={heading.ref} className="mb-20 sm:mb-28">
          <div
            className={`flex items-center gap-3 mb-6 transition-all duration-700 ease-out ${
              heading.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="h-px w-8 bg-foreground/20" />
            <span className="text-[0.65rem] sm:text-[0.7rem] font-medium uppercase tracking-[0.25em] text-foreground/40">
              Contact
            </span>
          </div>

          <h2
            className={`font-serif italic text-[clamp(1.9rem,5vw,3.8rem)] leading-[1.2] tracking-tighter text-foreground max-w-3xl transition-all duration-700 ease-out ${
              heading.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            Let&apos;s build something{" "}
            <span className="text-foreground/50">together</span>
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          {/* Left column — info */}
          <div ref={content.ref} className="lg:col-span-4">
            <p
              className={`text-[0.95rem] leading-[1.8] text-foreground/45 mb-10 transition-all duration-700 ease-out ${
                content.visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              Have a project in mind, a question, or just want to connect? I&apos;m
              always open to discussing new opportunities and ideas. Drop me a
              message and I&apos;ll get back to you promptly.
            </p>

            {/* Email */}
            <div
              className={`mb-10 transition-all duration-700 ease-out ${
                content.visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "120ms" }}
            >
              <span className="block text-[0.65rem] font-medium uppercase tracking-[0.25em] text-foreground/30 mb-3">
                Email
              </span>
              <a
                href="mailto:hello@jadchahine.com"
                className="group inline-flex items-center gap-2 text-[0.95rem] text-foreground/70 transition-colors hover:text-foreground"
              >
                hello@jadchahine.com
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-300"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>

            {/* Socials */}
            <div
              className={`transition-all duration-700 ease-out ${
                content.visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "240ms" }}
            >
              <span className="block text-[0.65rem] font-medium uppercase tracking-[0.25em] text-foreground/30 mb-4">
                Elsewhere
              </span>
              <div className="flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-foreground/[0.08] text-foreground/35 transition-all duration-300 hover:border-foreground/20 hover:text-foreground/70 hover:scale-105"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div
              className={`mt-12 inline-flex items-center gap-2.5 rounded-full border border-foreground/[0.06] px-4 py-2 transition-all duration-700 ease-out ${
                content.visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "360ms" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-foreground/40">
                Available for projects
              </span>
            </div>
          </div>

          {/* Right column — form */}
          <div ref={formReveal.ref} className="lg:col-span-7 lg:col-start-6">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Name field */}
              <div
                className={`relative transition-all duration-700 ease-out ${
                  formReveal.visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <label
                  htmlFor="contact-name"
                  className={`block text-[0.65rem] font-medium uppercase tracking-[0.25em] mb-3 transition-colors duration-300 ${
                    focusedField === "name"
                      ? "text-foreground/60"
                      : "text-foreground/25"
                  }`}
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your name"
                  className="w-full bg-transparent border-0 border-b border-foreground/[0.08] pb-3 text-[0.95rem] text-foreground/80 placeholder:text-foreground/15 outline-none transition-all duration-300 focus:border-foreground/25"
                />
                <div
                  className={`absolute bottom-0 left-0 h-px bg-foreground/40 transition-all duration-500 ease-out ${
                    focusedField === "name" ? "w-full" : "w-0"
                  }`}
                />
              </div>

              {/* Email field */}
              <div
                className={`relative transition-all duration-700 ease-out ${
                  formReveal.visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                <label
                  htmlFor="contact-email"
                  className={`block text-[0.65rem] font-medium uppercase tracking-[0.25em] mb-3 transition-colors duration-300 ${
                    focusedField === "email"
                      ? "text-foreground/60"
                      : "text-foreground/25"
                  }`}
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="your@email.com"
                  className="w-full bg-transparent border-0 border-b border-foreground/[0.08] pb-3 text-[0.95rem] text-foreground/80 placeholder:text-foreground/15 outline-none transition-all duration-300 focus:border-foreground/25"
                />
                <div
                  className={`absolute bottom-0 left-0 h-px bg-foreground/40 transition-all duration-500 ease-out ${
                    focusedField === "email" ? "w-full" : "w-0"
                  }`}
                />
              </div>

              {/* Message field */}
              <div
                className={`relative transition-all duration-700 ease-out ${
                  formReveal.visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <label
                  htmlFor="contact-message"
                  className={`block text-[0.65rem] font-medium uppercase tracking-[0.25em] mb-3 transition-colors duration-300 ${
                    focusedField === "message"
                      ? "text-foreground/60"
                      : "text-foreground/25"
                  }`}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Tell me about your project..."
                  className="block w-full bg-transparent border-0 border-b border-foreground/[0.08] pb-3 text-[0.95rem] text-foreground/80 placeholder:text-foreground/15 outline-none transition-all duration-300 focus:border-foreground/25 resize-none"
                />
                <div
                  className={`absolute bottom-0 left-0 h-px bg-foreground/40 transition-all duration-500 ease-out ${
                    focusedField === "message" ? "w-full" : "w-0"
                  }`}
                />
              </div>

              {/* Submit button */}
              <div
                className={`flex items-center justify-between pt-2 transition-all duration-700 ease-out ${
                  formReveal.visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                <button
                  type="submit"
                  disabled={submitted}
                  className="group relative inline-flex h-12 items-center justify-center gap-3 overflow-hidden rounded-full bg-foreground px-8 text-background text-[0.8rem] font-medium uppercase tracking-[0.15em] transition-all hover:shadow-lg hover:shadow-foreground/10 disabled:opacity-60 cursor-pointer"
                >
                  <span className="relative z-10">
                    {submitted ? "Message Sent" : "Send Message"}
                  </span>
                  {!submitted ? (
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
                  ) : (
                    <svg
                      className="relative z-10 w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  )}
                  <span className="absolute inset-0 bg-foreground/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>

                <span className="hidden sm:block text-[0.7rem] text-foreground/20 tracking-wide">
                  I&apos;ll respond within 24 hours
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
