/**
 * The work records.
 *
 * Two separate types on purpose. A FounderRecord has no `stack` field, so the
 * private product cannot grow a technology list by accident during a later
 * edit; the compiler stops it rather than a reviewer having to notice.
 *
 * Ordering is current work first: Harky and VetCliq are both live roles, so a
 * reader going top to bottom meets present-tense work before past work.
 */

export type FounderRecord = {
  index: string;
  name: string;
  role: string;
  status: string;
  product: string;
  contribution: string;
  focus: readonly string[];
  /**
   * Null until harky.ai resolves publicly. A link to a domain that fails to
   * load damages the claim it is attached to more than no link does, and the
   * record reads perfectly well without one.
   */
  url: string | null;
};

export type EngineeringRecord = {
  index: string;
  name: string;
  role: string;
  /** Null where no verified date range exists. Never estimated. */
  period: string | null;
  product: string;
  contribution: string;
  stack: readonly string[];
  url: string | null;
};

export const founderWork: FounderRecord = {
  index: "01",
  name: "Harky.ai",
  role: "Co-founder",
  status: "Currently building",
  product:
    "An AI product that turns the assistants people already pay for into a private digital teammate, able to take on real work inside the applications a business already uses.",
  contribution:
    "I cover product and engineering: deciding what Harky should be, how it should behave, and building it toward something a business can rely on.",
  focus: ["Product development", "Technical direction", "Product strategy"],
  url: null,
};

/**
 * The two engineering records answer different questions on purpose.
 *
 * VetCliq is breadth and responsibility: many practices on one platform, and a
 * lead who owns it from the data model to the release. Dentify is depth inside
 * a single practice's workflow: the records and money of a clinic, and the
 * processing that keeps running after everyone has gone home.
 */
export const engineeringWork: readonly EngineeringRecord[] = [
  {
    index: "02",
    name: "VetCliq",
    role: "Lead Software Developer",
    period: "2025 → Present",
    product:
      "A multi-tenant platform for veterinary practices. Many clinics run on one system, each seeing only its own appointments, patients and books.",
    contribution:
      "I lead it end to end: the tenant-aware backend and data model, the reporting each practice runs its day on, and the release pipeline that keeps it live.",
    stack: ["Laravel", "Node.js", "React", "MySQL", "Docker"],
    url: null,
  },
  {
    index: "03",
    name: "Dentify",
    role: "Full Stack & Backend Engineer",
    period: null,
    product:
      "A dental clinic management platform covering scheduling, patient records, billing and the day to day workflow of a practice.",
    contribution:
      "Owned the API and data model behind scheduling, records and billing, the recurring work that runs outside the request, and the environment it all runs in.",
    stack: ["React", "Laravel", "MySQL", "Docker", "AWS"],
    url: null,
  },
];
