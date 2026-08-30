import { about } from "@/content/profile";

export default function AboutSection() {
  return (
    <section id="about" className="border-t border-rule py-16 md:py-24">
      <div className="frame">
        <div className="measure-wide">
          <h2 className="meta">{about.heading}</h2>
          <div className="mt-5 flex flex-col gap-5">
            {about.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 24)}
                className={
                  index === 0
                    ? "font-display text-2xl font-semibold leading-snug text-ink md:text-[1.75rem]"
                    : "text-base leading-relaxed text-ink-secondary md:text-lg"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
