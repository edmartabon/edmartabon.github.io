import FounderPlate from "@/components/FounderPlate";
import { engineeringWork, founderWork } from "@/content/work";

/**
 * One grid for all three records.
 *
 * The founder record used to run on its own columns (roughly 498px | 558px)
 * while the engineering records ran on 240px | 816px. The left edges lined up,
 * so every container measured as centred, but the reading column jumped 258px
 * to the left between record 01 and record 02. That is what made three parts
 * of one document read as separate cards.
 *
 * Now every record is `metadata | content`, so the reading column starts at
 * the same x from the top of the section to the bottom. Harky still leads,
 * but on the axes that do not disturb the grid: a larger title, more copy,
 * and a panel inside its own content column.
 */
const RECORD = "grid gap-x-12 gap-y-5 py-10 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] xl:gap-x-16 md:py-12";

/** Index, name, role, and the date range where one is verified. */
function RecordMeta({
  index,
  name,
  role,
  period,
  large = false,
}: {
  index: string;
  name: string;
  role: string;
  period?: string | null;
  large?: boolean;
}) {
  return (
    <div>
      <p className="meta">{index}</p>
      <h3
        className={`mt-2 font-display font-semibold text-ink ${
          large ? "text-2xl md:text-3xl" : "text-xl"
        }`}
      >
        {name}
      </h3>
      <p className="meta mt-2">{role}</p>
      {period && <p className="meta mt-1.5 text-ink-muted">{period}</p>}
    </div>
  );
}

export default function WorkSection() {
  return (
    <section id="work" className="border-t border-rule py-16 md:py-24">
      <div className="frame">
        <h2 className="font-display text-display-sm font-semibold text-ink">Selected work</h2>

        <ol className="mt-12 divide-y divide-rule border-y border-rule">
          {/* 01 - founder record */}
          <li id="harky">
            <article className={RECORD}>
              <RecordMeta
                index={founderWork.index}
                name={founderWork.name}
                role={founderWork.role}
                large
              />

              <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] xl:gap-x-12">
                <div>
                  <p className="measure-wide text-lg leading-relaxed text-ink">
                    {founderWork.product}
                  </p>
                  <p className="measure-wide mt-4 text-base leading-relaxed text-ink-secondary">
                    {founderWork.contribution}
                  </p>
                </div>

                {/* Stacks under the copy until there is room beside it. The
                    panel never sets the reading column's width. */}
                <div className="mt-8 xl:mt-0">
                  <FounderPlate />
                </div>
              </div>
            </article>
          </li>

          {/* 02, 03 - engineering records */}
          {engineeringWork.map((project) => (
            <li key={project.name}>
              <article className={RECORD}>
                <RecordMeta
                  index={project.index}
                  name={project.name}
                  role={project.role}
                  period={project.period}
                />

                <div>
                  <p className="measure-wide text-base leading-relaxed text-ink">
                    {project.product}
                  </p>
                  <p className="measure-wide mt-2.5 text-base leading-relaxed text-ink-secondary">
                    {project.contribution}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
                    {project.stack.map((item) => (
                      <li key={item} className="font-mono text-[0.75rem] text-ink-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
