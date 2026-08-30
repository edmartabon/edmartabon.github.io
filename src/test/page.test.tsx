import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import App from "@/App";
import { engineeringWork, founderWork } from "@/content/work";
import { site } from "@/content/site";
import { automation } from "@/content/systems";


/** Concatenates the rendered text with real separators between elements. */
function visibleText(root: HTMLElement): string {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const parts: string[] = [];
  let node = walker.nextNode();
  while (node) {
    const value = node.nodeValue?.trim();
    if (value) parts.push(value);
    node = walker.nextNode();
  }
  return parts.join(" ");
}

describe("portfolio page", () => {
  it("puts the name, the role and the positioning claim in the first screen", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(site.name);
    expect(screen.getByText(site.role)).toBeInTheDocument();
    expect(screen.getByText(site.lede)).toBeInTheDocument();
  });

  it("orders the work with Harky first and gives it the most weight", () => {
    render(<App />);
    const names = screen
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);
    expect(names.slice(0, 3)).toEqual([
      founderWork.name,
      engineeringWork[0].name,
      engineeringWork[1].name,
    ]);
  });

  it("presents the founder role rather than a developer title", () => {
    render(<App />);
    expect(screen.getAllByText(/Co-founder/).length).toBeGreaterThan(0);
    expect(screen.queryByText(/full stack & devops developer/i)).not.toBeInTheDocument();
  });

  it("publishes no implementation detail for the private product", () => {
    const { container } = render(<App />);
    const text = visibleText(container);

    // The Harky record is a founder record. Anything describing how the
    // product is built belongs to the private repositories, not to a public
    // page. This guard exists because that boundary is easy to erode by
    // accident during a later copy edit.
    const confidential = [
      /control plane/i,
      /runtime gateway/i,
      /host agent/i,
      /operator console/i,
      /tenanc/i,
      /Ed25519/i,
      /JWT/i,
      // "reconciliation" on its own is a generic integration concept and is
      // wanted on the page. What must not appear is the specific shape of a
      // private convergence design.
      /reconciliation (pass|sweep|loop)/i,
      /desired state/i,
      /converge/i,
      /credential/i,
      /container per tenant/i,
    ];
    for (const pattern of confidential) {
      expect(text, `confidential detail matched ${pattern}`).not.toMatch(pattern);
    }
  });

  it("uses the correct name everywhere", () => {
    const { container } = render(<App />);
    const text = visibleText(container);
    expect(text).toContain("Edmart Abon");
    expect(text).not.toMatch(/Ed Martabon/);
  });

  it("keeps OpenClaw out of the Harky record", () => {
    render(<App />);
    // OpenClaw itself is public and belongs in the automation section. Which
    // private projects use it is not public, so the two must never appear
    // together.
    const record = screen
      .getByRole("heading", { level: 3, name: founderWork.name })
      .closest("article");
    expect(record).not.toBeNull();
    expect(visibleText(record as HTMLElement)).not.toMatch(/OpenClaw/i);
  });

  it("leads its expertise ordering with backend rather than frontend", () => {
    render(<App />);
    const groups = screen
      .getByRole("heading", { level: 2, name: "Expertise" })
      .closest("section")!
      .querySelectorAll("dt");
    const names = [...groups].map((node) => node.textContent);
    expect(names[0]).toBe("Backend & SaaS");
    expect(names[names.length - 1]).toBe("Product & Frontend");
  });

  it("says what happens after the request returns", () => {
    const { container } = render(<App />);
    const text = visibleText(container);
    // The nouns that separate a systems engineer from a CRUD developer. If a
    // copy edit removes them, the positioning quietly collapses.
    for (const noun of [/queues?/i, /background jobs/i, /scheduled/i, /retries/i, /webhook/i]) {
      expect(text, `backend evidence missing: ${noun}`).toMatch(noun);
    }
  });

  it("shows no technology list against Harky", () => {
    render(<App />);
    const harkyHeading = screen.getByRole("heading", { level: 3, name: founderWork.name });
    const record = harkyHeading.closest("article");
    expect(record).not.toBeNull();
    const text = visibleText(record as HTMLElement);
    for (const pattern of [/Laravel/i, /\bGo\b/, /Docker/i, /React/i, /PostgreSQL/i, /MySQL/i]) {
      expect(text, `stack leaked into the Harky record: ${pattern}`).not.toMatch(pattern);
    }
  });

  it("links no project whose site is known to be down", () => {
    render(<App />);
    // This previously iterated engineeringWork only, so founderWork.url was
    // never checked and a link to a domain that does not resolve shipped past
    // a green suite. Every record is checked now.
    for (const project of [founderWork, ...engineeringWork]) {
      if (project.url === null) {
        expect(
          screen.queryByRole("link", { name: new RegExp(project.name, "i") }),
          `${project.name} has no url but renders a link`,
        ).not.toBeInTheDocument();
      }
    }
  });

  it("renders no external link that has not been checked", () => {
    const { container } = render(<App />);
    const external = [...container.querySelectorAll("a[href^='http']")].map((a) =>
      a.getAttribute("href"),
    );
    // GitHub is the only outbound destination confirmed to resolve.
    expect(external).toEqual([site.github]);
  });

  it("exposes one main landmark and a skip link that targets it", () => {
    render(<App />);
    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "main");
    expect(screen.getByRole("link", { name: /skip to content/i })).toHaveAttribute("href", "#main");
  });

  it("keeps every nav item pointed at a section that exists", () => {
    const { container } = render(<App />);
    const links = within(screen.getAllByRole("navigation")[0]).getAllByRole("link");
    for (const link of links) {
      const id = link.getAttribute("href")?.slice(1);
      if (!id) continue;
      expect(container.querySelector(`#${id}`), `missing section #${id}`).not.toBeNull();
    }
  });

  it("gives every image real alternative text", () => {
    const { container } = render(<App />);
    // The page currently ships no raster images at all. This still guards the
    // moment one comes back.
    for (const image of container.querySelectorAll("img")) {
      expect(image.getAttribute("alt")?.length ?? 0).toBeGreaterThan(20);
    }
  });

  it("carries no artwork inside the Harky record", () => {
    render(<App />);
    const record = screen
      .getByRole("heading", { level: 3, name: founderWork.name })
      .closest("article")!;
    // The graphic that used to sit here named the model providers, the
    // application integrations and the approval behaviour. The record is built
    // from type now, so nothing can arrive in it that was not written by hand.
    expect(record.querySelector("img")).toBeNull();
  });

  it("claims nothing about traction that cannot be verified", () => {
    // textContent concatenates across elements, which silently destroys word
    // boundaries ("providerCustomers"). Walk the text nodes and join with
    // spaces so \b means what it looks like it means.
    const { container } = render(<App />);
    const text = visibleText(container);

    for (const forbidden of [
      /trusted by/i,
      /used by/i,
      /\d[\d,]*\+? (customers|users|teams|companies)/i,
      /uptime/i,
      /\brevenue\b/i,
      /\b(thousands|millions) of\b/i,
      /in production (since|at)/i,
    ]) {
      expect(text, `unverifiable claim matched ${forbidden}`).not.toMatch(forbidden);
    }
  });

  it("offers the resume as a real download, not a link to a viewer", () => {
    render(<App />);
    const links = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href") === site.resume);

    // One in the sticky header so it is always reachable, one in contact.
    expect(links.length, "resume should be linked more than once").toBeGreaterThan(1);

    for (const link of links) {
      // `download` is what makes this save a file instead of opening a tab,
      // and what renames it on the way to the recruiter's disk.
      expect(link).toHaveAttribute("download", site.resumeFilename);
      expect(link).not.toHaveAttribute("target");
    }
  });

  it("states how long the career has been", () => {
    render(<App />);
    // Seniority was the largest positioning gap in the audit: the page could
    // not distinguish a fourth-year engineer from a twelfth-year one.
    expect(screen.getByText(new RegExp(site.experience.replace("+", "\\+")))).toBeInTheDocument();
  });

  it("gives OpenClaw context rather than listing it as a bare token", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { level: 3, name: automation.openclaw.name });
    const section = heading.closest("section");
    expect(section).not.toBeNull();
    // A sentence, not a chip.
    expect(visibleText(section as HTMLElement)).toMatch(/open-source framework for AI agents/i);
  });

  it("keeps the automation section clear of the private product", () => {
    render(<App />);
    const section = screen
      .getByRole("heading", { level: 2, name: automation.heading })
      .closest("section")!;
    const text = visibleText(section);
    expect(text).not.toMatch(/Harky/i);
    // The vocabulary that previously let a reader bridge this section and the
    // founder record. Generic automation copy does not need any of it.
    for (const echo of [/human approval/i, /audit history/i, /before external actions/i]) {
      expect(text, `automation copy echoes the private product: ${echo}`).not.toMatch(echo);
    }
  });

  it("puts current work above past work", () => {
    render(<App />);
    const names = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(names.slice(0, 3)).toEqual(["Harky.ai", "VetCliq", "Dentify"]);
  });

  it("shows a date range only where one is verified", () => {
    render(<App />);
    for (const project of engineeringWork) {
      if (project.period) {
        expect(screen.getByText(project.period)).toBeInTheDocument();
      }
    }
    // Dentify has no confirmed range, so nothing is estimated in its place.
    expect(engineeringWork.find((p) => p.name === "Dentify")?.period).toBeNull();
  });

  it("ships no em-dashes", () => {
    const { container } = render(<App />);
    expect(visibleText(container)).not.toMatch(/[\u2014\u2013]/);
  });

  it("uses typographic apostrophes rather than straight quotes", () => {
    const { container } = render(<App />);
    expect(visibleText(container)).not.toMatch(/[A-Za-z]'[A-Za-z]/);
  });
});
