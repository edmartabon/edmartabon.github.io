import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import WorkSection from "@/components/WorkSection";
import SystemsSection from "@/components/SystemsSection";
import AutomationSection from "@/components/AutomationSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      {/* Watched by the header to know when it has left the top of the page. */}
      <div id="top-sentinel" aria-hidden className="absolute top-0 h-px w-px" />

      <SiteHeader />

      <main id="main">
        <Hero />
        <WorkSection />
        <SystemsSection />
        <AutomationSection />
        <ExpertiseSection />
        <AboutSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
