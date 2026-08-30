/**
 * Builds the Open Graph card at public/og.png.
 *
 * Run with `npm run og:build` after changing the name, role or positioning
 * line. It is committed to the repository so the Pages build stays a plain
 * static build with no browser dependency.
 */
import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const root = fileURLToPath(new URL("..", import.meta.url));
const publicDir = join(root, "public");

const NAME = "Edmart Abon";
const ROLE = "Full Stack & Backend Engineer · Co-founder at Harky.ai";
const LEDE = "I build SaaS products from backend architecture to production.";
const URL_LABEL = "edmartabon.github.io";

const card = `<!doctype html>
<html><head><meta charset="utf-8"><style>
  @font-face { font-family:"Instrument Sans"; src:url("/fonts/instrument-sans-latin.woff2") format("woff2"); font-weight:400 700; }
  @font-face { font-family:"IBM Plex Mono"; src:url("/fonts/plex-mono-latin-400.woff2") format("woff2"); font-weight:400; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1200px; height:630px; background:#faf9f7; color:#191715;
         font-family:"Instrument Sans",sans-serif; display:flex; flex-direction:column;
         justify-content:space-between; padding:76px 80px; }
  .name { font-size:34px; font-weight:600; letter-spacing:-0.02em; }
  .role { font-family:"IBM Plex Mono",monospace; font-size:16px; letter-spacing:0.08em;
          text-transform:uppercase; color:#6b6560; margin-top:12px; }
  .lede { font-size:70px; font-weight:600; line-height:1.04; letter-spacing:-0.032em; max-width:20ch; }
  .foot { display:flex; justify-content:space-between; align-items:flex-end;
          border-top:1px solid #e2ded7; padding-top:22px;
          font-family:"IBM Plex Mono",monospace; font-size:15px; letter-spacing:0.08em;
          text-transform:uppercase; color:#6b6560; }
</style></head><body>
  <div><div class="name">${NAME}</div><div class="role">${ROLE}</div></div>
  <div class="lede">${LEDE}</div>
  <div class="foot"><span>${URL_LABEL}</span><span>APIs · Queues · Integrations · Production</span></div>
</body></html>`;

const types = { ".woff2": "font/woff2", ".html": "text/html; charset=utf-8" };

const server = createServer(async (req, res) => {
  if (req.url === "/og.html") {
    res.writeHead(200, { "content-type": types[".html"] });
    return res.end(card);
  }
  try {
    const body = await readFile(join(publicDir, decodeURIComponent(req.url ?? "")));
    res.writeHead(200, { "content-type": types[extname(req.url ?? "")] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
});

await new Promise((done) => server.listen(4599, done));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:4599/og.html", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot({ type: "png" });
await writeFile(join(publicDir, "og.png"), png);
await browser.close();
server.close();

console.log(`og: wrote public/og.png (${(png.byteLength / 1024).toFixed(1)} kB)`);
