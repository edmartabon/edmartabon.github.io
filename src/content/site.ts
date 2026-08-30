/**
 * Identity and contact.
 *
 * The positioning leads with backend on purpose. The support line names the
 * surfaces rather than the seniority, and puts the frontend last, because that
 * ordering is what the page is arguing.
 */

export const site = {
  name: "Edmart Abon",
  /** Sits directly under the name. Doubles as the current-status line. */
  role: "Co-founder · Product & Engineering at Harky.ai",
  /**
   * The seniority signal. A recruiter filters on career length before they
   * read anything else, and the page previously never stated it. Kept to two
   * facts and no adjectives: how long, and from where.
   *
   * "11+" is the figure from the resume and is conservative; the first role
   * dates from March 2014.
   */
  experience: "11+ years",
  location: "Philippines · Remote",
  /** The one claim the whole page exists to support. */
  lede: "I build SaaS products from backend architecture to production.",
  support:
    "APIs, business logic and data models, background processing and integrations, the product on top, and the servers it all runs on.",
  email: "edmartabon@gmail.com",
  url: "https://edmartabon.github.io/",
  github: "https://github.com/edmartabon",
  /** Generated from resume/resume.html by `npm run resume:build`. */
  resume: "/edmart-abon-resume.pdf",
  /**
   * The name the file takes on the recruiter's disk. The served path is
   * lowercase and hyphenated for the URL; this is what a person reads in a
   * downloads folder three days later.
   */
  resumeFilename: "Edmart Abon - Resume.pdf",
  /** Stated before the click, so nothing about the download is a surprise. */
  resumeMeta: "PDF, 2 pages",
} as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Systems", href: "#systems" },
  { label: "Expertise", href: "#expertise" },
  { label: "About", href: "#about" },
] as const;

export const availability =
  "Open to senior backend, full stack and founding engineer roles, and to product work with founders.";
