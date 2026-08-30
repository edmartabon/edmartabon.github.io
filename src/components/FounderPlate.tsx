import { founderWork } from "@/content/work";

/**
 * The Harky panel.
 *
 * It replaces a marketing graphic that named the model providers, the
 * application integrations and the approval and audit behaviour. None of that
 * belongs on a public page about a private product, so the whole image is
 * gone rather than cropped.
 *
 * What stands in its place is built from type and one hairline rule, which
 * solves three problems at once that an image could not:
 *
 *   - it discloses exactly what the copy beside it discloses, and nothing
 *     arrives here that was not written by hand;
 *   - it is theme-native. There is no bright rectangle to sit on a dark page,
 *     because the surface, the rule and the ink are the same tokens the rest
 *     of the page uses;
 *   - it stays legible at 375px, because it is text that reflows rather than
 *     artwork that shrinks.
 *
 * The content is the status and the two role facts. Both are lifted out of
 * the reading column rather than repeated, so the panel adds information
 * instead of decorating it.
 */
export default function FounderPlate() {
  return (
    <aside
      aria-label="Harky.ai role summary"
      className="rounded-lg border border-rule bg-surface p-6 md:p-7"
    >
      {/* The one status indicator on the page, and the only use of the live
          token. It marks a real state, so it earns the dot. */}
      <p className="flex items-center gap-2.5 text-base text-ink">
        <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-live" />
        {founderWork.status}
      </p>

      <hr className="my-6 border-0 border-t border-rule" />

      <dl className="space-y-5">
        <div>
          <dt className="meta">Role</dt>
          <dd className="mt-1.5 text-base text-ink">{founderWork.role}</dd>
        </div>
        <div>
          <dt className="meta">Focus</dt>
          <dd className="mt-1.5">
            <ul className="space-y-1">
              {founderWork.focus.map((item) => (
                <li key={item} className="text-base text-ink-secondary">
                  {item}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </aside>
  );
}
