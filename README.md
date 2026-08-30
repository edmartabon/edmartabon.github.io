# edmartabon.github.io

Personal site for Edmart Abon. Full stack and backend engineer, co-founder at Harky.ai.

React 18, TypeScript, Vite, Tailwind. One page, no router, three runtime
dependencies. Deployed to GitHub Pages from `main`.

## Commands

```sh
npm install
npm run dev         # http://localhost:8080
npm run lint
npm run typecheck
npm run test
npm run build       # client build, SSR build, then prerender into dist/index.html
npm run preview
npm run og:build    # regenerate public/og.png after changing the name or positioning
npm run resume:build # render resume/resume.html to public/edmart-abon-resume.pdf
```

## How it is put together

- **Content lives in `src/content/`.** `site.ts` holds identity and contact,
  `work.ts` holds the three project records, `systems.ts` holds the five build
  stages and the automation flow, `profile.ts` holds the expertise groups and
  the about copy. Copy changes should not need a component change.
- **Group order is an argument, not a layout choice.** `expertiseGroups` leads
  with Backend & SaaS and closes with Product & Frontend. Reordering it for
  visual balance undoes the positioning the page is making.
- **OpenClaw is public; its use in any private project is not.** It appears in
  the AI & Automation section and the expertise list, and never inside or
  adjacent to the Harky record. A test enforces this.
- **Harky is a founder record, not an engineering one.** It carries product,
  role and status, and deliberately carries no stack, no services and no
  architecture. Harky is an active private project, so only material already
  published on harky.ai appears here. `src/test/page.test.tsx` enforces that
  boundary, and also fails the build if a stack list appears against Harky or if
  a project links a site that is known to be down.
- **`npm run build` prerenders the page.** Vite builds the client bundle, then
  builds `src/entry-server.tsx`, then `scripts/prerender.mjs` renders the app to
  a string and injects it into `dist/index.html`. The client hydrates that
  markup. Crawlers, link unfurlers, Reader mode and print-to-PDF all get the
  real document rather than an empty root element.
- **Typefaces are self-hosted** from `public/fonts`, latin subset only.
  Instrument Sans carries the whole page; IBM Plex Mono is restricted to
  metadata. They are vendored from the `@fontsource` packages in
  `devDependencies`, so nothing is fetched from a third party at runtime.
- **Theme.** Light by default, dark by system preference, overridable by the
  toggle. An inline script in `index.html` applies the class before first paint,
  and the theme is never held in React state, so the server markup and the first
  client render always match.
- **Motion.** One keyframe animation, the hero load-in. Everything else that
  moves is an interaction state. Content does not animate on scroll.

## Resume

`resume/resume.html` is the source; `npm run resume:build` renders it to
`public/edmart-abon-resume.pdf` with Playwright and the PDF is committed, so the
Pages build needs no browser.

It is deliberately plain underneath the typography: one column, real headings,
real list items, no tables, no text inside images. Two things were changed after
testing the output with `pdftotext`, and both should stay:

- **Static font weights, not the variable files the site uses.** Chromium
  synthesises variable instances when exporting a PDF, which produced a document
  containing no real Instrument Sans program. Static 400 and 600 embed properly.
- **No `&nbsp;` padding around the `|` separators.** The wider gap made text
  extraction split "Remote | June 2025 - Present" into three separate lines, so
  a parser would have lost the dates.

The PDF is `Disallow`ed in `robots.txt` because it carries a phone number. It is
still reachable from the contact section; it just should not be indexed.

## Product images

`public/media/harky-agent-graphic.webp` is published marketing artwork from the
public Harky.ai website. No application screens, customer data, internal
surfaces, or architecture diagrams appear anywhere on this site.

`dentify.ph` and `vetcliq.com` are currently unreachable, so both records carry
`url: null` in `src/content/work.ts`. Set the URL back when the origins return.
