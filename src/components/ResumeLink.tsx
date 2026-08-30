import { ArrowDownToLine } from "lucide-react";
import { site } from "@/content/site";

type Props = {
  className?: string;
  /** Overridden where the surrounding context does not already say "résumé". */
  label?: string;
  onClick?: () => void;
};

/**
 * The résumé download.
 *
 * `download` rather than `target="_blank"`. A recruiter shortlisting people is
 * collecting files, not opening tabs, and the attribute renames the file on the
 * way out so it lands in their downloads folder under a person's name instead
 * of a URL slug. It only works because the PDF is served same-origin.
 *
 * The arrow points down rather than out because that is what the link does. An
 * up-right arrow here would promise a new tab and deliver a download instead.
 * The format and length go to assistive technology for the same reason: nothing
 * about the click should be a surprise.
 */
export default function ResumeLink({ className = "", label = "Résumé", onClick }: Props) {
  return (
    <a href={site.resume} download={site.resumeFilename} onClick={onClick} className={className}>
      {label}
      <ArrowDownToLine size={14} aria-hidden className="shrink-0" />
      <span className="sr-only">, {site.resumeMeta}, downloads</span>
    </a>
  );
}
