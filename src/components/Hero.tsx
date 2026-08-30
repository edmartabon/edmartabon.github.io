import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";

/**
 * The hero is a document header, not a billboard: name, role, the one claim
 * the page exists to support, and two ways forward. It is deliberately short
 * so the work begins inside the first screen and a half.
 */
export default function Hero() {
  return (
    <section id="top" className="frame pb-16 pt-14 md:pb-24 md:pt-20">
      <div className="animate-rise">
        <h1 className="font-display text-display-sm font-semibold text-ink">{site.name}</h1>

        {/* Role, then career length, then where.
            
            The page previously stated none of the second two, which meant a
            recruiter could not tell a fourth-year engineer from a twelfth-year
            one. It is set in the existing metadata voice and separated by the
            same middot the role line already uses, so it reads as one
            identity block rather than a new element competing with the name. */}
        <p className="meta mt-2.5">{site.role}</p>
        <p className="meta mt-1.5 text-ink-muted">
          {site.experience} <span aria-hidden>·</span> {site.location}
        </p>

        <p className="mt-10 max-w-[19ch] font-display text-display-md font-semibold text-ink sm:max-w-[24ch]">
          {site.lede}
        </p>

        <p className="measure-wide mt-6 text-base leading-relaxed text-ink-secondary md:text-lg">
          {site.support}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href="#harky" className="btn btn-primary group">
            See the work
            <ArrowRight
              size={15}
              aria-hidden
              className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
            />
          </a>
          <a href={`mailto:${site.email}`} className="btn btn-secondary">
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
