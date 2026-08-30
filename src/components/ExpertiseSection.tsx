import { expertiseGroups } from "@/content/profile";

/**
 * Text only. No logo wall, no marquee, no icons.
 *
 * The order of the groups is the point: backend first, product and frontend
 * last. Reordering them for visual balance would undo the argument.
 */
export default function ExpertiseSection() {
  return (
    <section id="expertise" className="border-t border-rule py-16 md:py-24">
      <div className="frame">
        <h2 className="font-display text-display-sm font-semibold text-ink">Expertise</h2>

        <dl className="mt-10 divide-y divide-rule border-y border-rule">
          {expertiseGroups.map((group) => (
            <div
              key={group.name}
              className="grid gap-2 py-5 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-8"
            >
              <dt className="meta pt-0.5">{group.name}</dt>
              <dd>
                <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-ink-secondary">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
