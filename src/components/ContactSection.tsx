import { ArrowUpRight } from "lucide-react";
import ResumeLink from "@/components/ResumeLink";
import { CopyEmail } from "@/components/SiteHeader";
import { availability, site } from "@/content/site";

export default function ContactSection() {
  return (
    <section id="contact" className="border-t border-rule py-16 md:py-24">
      <div className="frame">
        <div className="measure-wide">
          <h2 className="font-display text-display-sm font-semibold text-ink">
            Let’s talk about what you’re building.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-secondary md:text-lg">
            {availability}
          </p>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href={`mailto:${site.email}`} className="btn btn-primary">
            {site.email}
          </a>
          <CopyEmail />
          {/* Sits with the buttons rather than trailing the row as a text
              link. Someone reading a hiring page wants the file, and the
              weight of the control should match how often it is the reason
              they scrolled this far. */}
          <ResumeLink label="Download résumé" className="btn btn-secondary" />
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link group inline-flex min-h-[2.75rem] items-center gap-1.5 px-1 text-sm"
          >
            GitHub
            <ArrowUpRight
              size={14}
              aria-hidden
              className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
