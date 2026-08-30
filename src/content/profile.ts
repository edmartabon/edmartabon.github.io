/**
 * Expertise and about copy.
 *
 * The groups are ordered deliberately. Backend leads, product and frontend
 * closes. The ordering is the argument, so it should not be rearranged for
 * visual convenience.
 */

export const expertiseGroups = [
  {
    name: "Backend & SaaS",
    items: [
      "Laravel",
      "PHP",
      "REST API architecture",
      "Multi-tenant SaaS",
      "Authentication & authorization",
      "Business logic",
      "Jobs & queues",
      "Scheduling",
      "Webhooks",
    ],
  },
  {
    name: "Data",
    items: ["PostgreSQL", "MySQL", "Data modeling", "Transactions", "Migrations", "Reporting"],
  },
  {
    name: "Infrastructure & Operations",
    items: [
      "Linux",
      "Nginx",
      "Docker",
      "CI/CD",
      "Cloud deployment",
      "Production operations",
    ],
  },
  {
    name: "AI & Automation",
    items: [
      "OpenClaw",
      "LLM integration",
      "AI agents",
      "Tool integration",
      "Automated processes",
    ],
  },
  {
    name: "Product & Frontend",
    items: ["React", "TypeScript", "Vue", "Nuxt", "Product UI", "API integration"],
  },
] as const;

export const about = {
  heading: "About",
  paragraphs: [
    "I’m a full stack engineer who works mostly on the server side, and co-founder of Harky.ai, where I work across product, engineering and technical direction.",
    "Before Harky I built and operated clinic management platforms for dental and veterinary practices. Scheduling, patient records, billing and the recurring work a practice depends on, from the data model through to the servers it ran on. Running software that a business opens every morning teaches you which decisions you get to change later and which ones you do not.",
    "I care about clean boundaries, work that keeps moving after the request has returned, and systems that stay correct when nobody is watching them.",
  ],
} as const;
