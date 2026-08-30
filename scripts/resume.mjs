/**
 * Renders resume/resume.html to public/edmart-abon-resume.pdf.
 *
 * Run with `npm run resume:build` after editing the HTML. The PDF is committed,
 * so the Pages build stays a plain static build with no browser dependency.
 *
 * The output is deliberately plain: one column, real headings, real list items,
 * no tables and no text inside images, so an applicant tracking system reads it
 * in the same order a person does.
 */
import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const root = fileURLToPath(new URL("..", import.meta.url));
const types = { ".html": "text/html; charset=utf-8", ".woff2": "font/woff2" };

const server = createServer(async (req, res) => {
  const url = (req.url ?? "/").split("?")[0];
  const file = join(root, "resume", url === "/" ? "resume.html" : url);
  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
});

await new Promise((done) => server.listen(4700, done));

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("http://localhost:4700/", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

const pdf = await page.pdf({
  format: "Letter",
  printBackground: true,
  margin: { top: "0.55in", right: "0.6in", bottom: "0.55in", left: "0.6in" },
});

await writeFile(join(root, "public", "edmart-abon-resume.pdf"), pdf);
await browser.close();
server.close();

console.log(`resume: wrote public/edmart-abon-resume.pdf (${(pdf.byteLength / 1024).toFixed(1)} kB)`);
