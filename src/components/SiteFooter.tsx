import { site } from "@/content/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-rule py-9">
      <div className="frame flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="meta normal-case tracking-normal">
          {site.name}. Built with React, TypeScript and Tailwind.
        </p>
        <p className="meta">{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
