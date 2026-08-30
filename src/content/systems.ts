/**
 * How systems get built, and how automation fits into them.
 *
 * These stages are written to spend their words on nouns. "Queues", "retries",
 * "idempotent", "reconciliation" and "state transitions" are the credential;
 * "systems thinking" is not. Stage three is the one that separates this from
 * CRUD work, so it is the longest and the most specific.
 *
 * Nothing here describes any particular client or private product.
 */

export const systems = {
  heading: "How I build systems.",
  intro:
    "Most of what makes a SaaS product work is not the screen. It is what happens behind it, and what happens after the request is already over.",
  stages: [
    {
      index: "01",
      name: "Design the workflow",
      body: "Map the business process and its state transitions before any schema exists. Which states are legal, which transitions are allowed, what is safe to change later and what can never be lost.",
    },
    {
      index: "02",
      name: "Build the backend",
      body: "REST APIs with clear service boundaries, authentication and authorization, separation between tenants, and the business rules that make the data mean something rather than just store it.",
    },
    {
      index: "03",
      name: "Move work off the request",
      body: "Most real work should not happen while somebody waits. Background jobs, queues and workers, scheduled and recurring processing, retries and failure handling for operations that run long, fail loudly, or must not be lost.",
    },
    {
      index: "04",
      name: "Integrate",
      body: "Third-party APIs and webhook handling, written so that a retried delivery does not charge twice, and reconciliation for the moment an external system and your own disagree about what happened.",
    },
    {
      index: "05",
      name: "Operate",
      body: "Deploy to Linux behind Nginx with SSL, containerise where it earns its place, run it through CI, then monitor it, debug it in production, and fix what the logs actually say rather than what you assumed.",
    },
  ],
} as const;

export const automation = {
  heading: "AI and automation",
  /**
   * Deliberately about the engineering, not about any product.
   *
   * An earlier draft described approval before external actions and activity
   * history. Both are real concepts, but stated next to a founder record they
   * read as a description of that product with the name removed. This version
   * stays on the part that is genuinely mine: how the work is queued, run and
   * returned.
   */
  body: "Most of the useful work an AI system does happens after the conversation ends. The engineering that matters is not the prompt, it is everything around it: turning a request into a durable task, running it against real tools, handling the failures, and getting the result back into the application that asked.",
  openclaw: {
    name: "OpenClaw",
    /**
     * The one piece of context this section was missing. OpenClaw is public
     * and verifiable, so naming it costs nothing; what it must not do is
     * appear anywhere near a private project. It is described here only as
     * something I build and test with.
     */
    body: "OpenClaw is an open-source framework for AI agents that operate real tools rather than only producing text. I use it to build agent-driven workflows: giving an agent a defined task, the tools it is allowed to use, and a backend that decides what happens to the result.",
  },
  flow: ["User or event", "Application", "Task", "Agent", "External tool", "Result", "Application"],
  capabilities: [
    "LLM integration",
    "Agent workflows",
    "Tool orchestration",
    "Automated backend processes",
  ],
} as const;
