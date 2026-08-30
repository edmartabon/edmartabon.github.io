/**
 * Prerender.
 *
 * Runs after both Vite builds. Renders the app to a string with the SSR bundle
 * and injects it into the built index.html. The client then hydrates that same
 * markup rather than discarding it, so there is no blank first paint and no
 * duplicate render.
 */
import { readFile, writeFile, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// fileURLToPath rather than import.meta.dirname, which needs Node 20.11+.
const root = fileURLToPath(new URL("..", import.meta.url));
const templatePath = resolve(root, "dist/index.html");
const ssrEntry = resolve(root, "dist-ssr/entry-server.js");

const { render } = await import(pathToFileURL(ssrEntry).href);
const appHtml = render();

const template = await readFile(templatePath, "utf8");
const marker = '<div id="root"></div>';

if (!template.includes(marker)) {
  throw new Error("prerender: could not find the root element in dist/index.html");
}

await writeFile(
  templatePath,
  template.replace(marker, `<div id="root">${appHtml}</div>`),
  "utf8",
);

// The SSR bundle is a build artefact, not something to publish.
await rm(resolve(root, "dist-ssr"), { recursive: true, force: true });

const bytes = Buffer.byteLength(appHtml, "utf8");
console.log(`prerender: injected ${(bytes / 1024).toFixed(1)} kB of markup into dist/index.html`);
