import { automation } from "@/content/systems";

/**
 * AI and automation.
 *
 * Kept structurally separate from Selected Work. This section describes the
 * shape of agent-backed automation in general; it says nothing about how any
 * particular product is built, and OpenClaw is never mentioned in the same
 * breath as a client or a private project.
 */
export default function AutomationSection() {
  return (
    <section id="automation" className="border-t border-rule py-16 md:py-24">
      <div className="frame">
        <div className="measure-wide">
          <h2 className="font-display text-display-sm font-semibold text-ink">
            {automation.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-secondary md:text-lg">
            {automation.body}
          </p>
        </div>

        {/* OpenClaw, with the context it was missing.

            It previously appeared only as an uppercase token in the list
            below, which is exactly the badge treatment this section exists to
            avoid. It is public and verifiable, so describing it costs nothing;
            what it must never do is appear beside a private project, which is
            why this paragraph names no product. */}
        <div className="measure-wide mt-8">
          <h3 className="font-display text-xl font-semibold text-ink">
            {automation.openclaw.name}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-ink-secondary">
            {automation.openclaw.body}
          </p>
        </div>

        {/* The one panel on the page. It reads as a figure rather than a card
            because nothing else on the page uses this treatment. */}
        <figure className="mt-10 rounded-lg border border-rule bg-surface px-5 py-5 md:px-7 md:py-6">
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-3">
            {automation.flow.map((node, index) => (
              <li key={`${node}-${index}`} className="flex items-center gap-3">
                <span className="font-mono text-[0.8125rem] leading-none text-ink">{node}</span>
                {index < automation.flow.length - 1 && (
                  <span aria-hidden className="font-mono text-[0.8125rem] leading-none text-ink-muted">
                    &rarr;
                  </span>
                )}
              </li>
            ))}
          </ol>
          <figcaption className="meta mt-5">
            How agent-backed automation is structured
          </figcaption>
        </figure>

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {automation.capabilities.map((item) => (
            <li key={item} className="meta">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
