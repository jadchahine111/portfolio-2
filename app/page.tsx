import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { ExperienceSection } from "@/components/experience-section";
import { ContactSection } from "@/components/contact-section";
import { SummariesCTA } from "@/components/summaries-cta";

export default function Home() {
  return (
    <main>
      <div>
        <HeroSection />
        <AboutSection />
      </div>

      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      {/* <SummariesCTA /> */}
    </main>
  );
}
