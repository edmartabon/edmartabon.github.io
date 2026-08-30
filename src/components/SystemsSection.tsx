import { systems } from "@/content/systems";

/**
 * The five stages, drawn as a path.
 *
 * The rail down the index column is the diagram: nodes, a connecting line, and
 * labels. It is built from type and a one pixel rule rather than an SVG, so it
 * survives dark mode, print, and a 375px screen without a second
 * implementation.
 *
 * The row is a grid with `items-baseline` so the browser sits the small mono
 * index on the same baseline as the much larger heading beside it. Pinning the
 * index to the top of the row instead left it 11px high, which read as a
 * misalignment because it was one.
 *
 * The rows carry no hover state on purpose. They are not interactive, and
 * hover feedback on something that cannot be clicked is a false affordance.
 */
export default function SystemsSection() {
  return (
    <section id="systems" className="border-t border-rule py-16 md:py-24">
      <div className="frame">
        <div className="measure-wide">
          <h2 className="font-display text-display-sm font-semibold text-ink">{systems.heading}</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-secondary md:text-lg">
            {systems.intro}
          </p>
        </div>

        <ol className="mt-12">
          {systems.stages.map((stage, index) => {
            const isLast = index === systems.stages.length - 1;
            return (
              <li
                key={stage.index}
                className="relative grid grid-cols-[1.5rem_minmax(0,1fr)] items-baseline gap-x-4 md:gap-x-8"
              >
                <span className="meta text-center">{stage.index}</span>

                {/* The connecting line, centred under the index. It starts
                    below the numeral and runs to the foot of the row, so the
                    rows join into one continuous path. */}
                {!isLast && (
                  <span aria-hidden className="absolute bottom-0 left-3 top-7 w-px bg-rule" />
                )}

                <div
                  className={`${isLast ? "" : "pb-10"} md:grid md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-x-10`}
                >
                  <h3 className="font-display text-xl font-semibold leading-snug text-ink">
                    {stage.name}
                  </h3>
                  <p className="measure-wide mt-2 text-base leading-relaxed text-ink-secondary md:mt-0">
                    {stage.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
