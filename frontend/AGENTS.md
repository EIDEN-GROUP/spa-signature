# Working in this codebase

Notes for anyone changing the frontend, human or AI. The folder structure and
commands are in [README.md](README.md); this file is the rules.

## Before you finish

```bash
npm run typecheck
npm run lint
npm run build
```

All three must pass.

## Scope of version 1

The site is about spas only. The homepage has these sections, in order: hero
with search, This month’s picks, Discover by city, Explore by experience, the
closing search, and the “Run a spa?” band. The order follows where attention
falls on the page: the search in the first screen, the only section with real
spas to compare straight after it, the two ways to browse, a second search for
whoever reaches the end, and spa owners last. Keep it when adding to the page.
“Signature Selection”, “Signature Method”, “Guides” and “Explore Morocco” were
removed on purpose: do not add them back, or link to them from the header or
footer.

## Styling

- One stylesheet, `src/styles.css`: tokens first, then one section per
  component. Colours, type sizes, spacing, radius and easing come from the
  tokens. Do not write a raw colour or size in a rule.
- Two colours lead, and the rest of the palette is made from them. Burgundy
  (`--color-burgundy`, #821911) acts: the filled action of a view, links, the
  emphasised word of a title, the logo mark, the editors’ picks. Its darker
  shades are the dark grounds. Sage (`--color-sage`, #B2BDA3) rests: bands,
  outlines, selected states, and the accent on dark grounds. The page itself
  is sage thinned almost to white. Large surfaces and filled actions take one
  of the `--gradient-*` tokens, not the flat colour. No olive, clay or mint:
  those palettes were replaced.
- Gold (`--color-gold`, #C28F1A) is for one thing: the first of the month’s
  picks. Always flat.
- Titles are set in Aeonik (`--font-title`). The files in `src/assets/fonts`
  are the foundry’s trial fonts: basic letters and figures only, and not
  licensed for a live site. Replace them with the licensed fonts before
  launch. The serif (`--font-serif`) is kept for the editors’ voice.
- Nothing is set in italic, not even `<em>`: emphasis is a change of colour.
- The scrollbar is a slim grey pill on a clear track that turns burgundy under
  the pointer. `body` is `100vw` wide so the page does not move when it appears.
- Interface corners use `--radius`. Photographs are framed as doorways with the
  `Door` component (`src/components/ui/Door.tsx`), not with a plain rounded box.

## Photographs

- One file per photograph in `src/assets`. No extra sizes, formats or crops.
- A photograph is used for one thing: never reuse one for a second city, spa or section.
- A photograph is imported by its path in the file that uses it,
  `import photo from '@/assets/name.webp'`, and passed as `src` to `<img>` or
  as `{ src, alt, focus }` to `Door` / `Picture`. There is no registry of
  images, no list of sources and no generated file: do not add one.

## Motion

- Lenis drives page scroll (`SmoothScroll`).
- Framer Motion animates sections and photographs (`Reveal`, `Stagger`, `Door`).
  They arrive each time the page scrolls down to them and leave when they drop
  back below the fold. `Scene` ties a whole section to the scroll: it fades and
  draws back as it leaves through the top of the screen.
- GSAP animates text (`SplitHeading`).
- The first arrival opens with `Loader`: a short film under a black veil,
  then the screen rises like a curtain. The page does not scroll and shows no
  scrollbar until it is gone. Whatever opens a page waits for it with
  `useRevealed()`.
- The page is light. One section may be dark (today: Explore by experience).
  A light section is never left bare: the wall behind the page is drawn in
  `body::before` / `body::after`, and each section adds its own ornament the
  same way.
- Everything must still read correctly with `prefers-reduced-motion`.

## Language

- The site opens in French; English is the second language. The visitor
  switches with FR / EN in the header (in the menu on a phone) and the choice
  is kept in `localStorage`. Both languages share the same addresses.
- Every word a visitor can read comes from `src/locales/fr.ts` and
  `src/locales/en.ts`, which have the same keys. A component reads them with
  `const t = useT()`. Do not write a visible string, an `alt` or an
  `aria-label` in a component.
- In a title, `*stars*` mark the words set in colour and a line break in the
  text is a line break on the page: render it with `<Rich text={…} />`.
- Names of cities, experiences, spa types and the like are in the dictionaries
  under their id (`t.cities.byId[city.id].name`). The long content in
  `src/lib/data.ts`, `spas.ts` and `guides.ts`, for pages that are not built
  yet, is still in English only.

## Code

- TypeScript, no semicolons, single quotes, two spaces.
- Shared types live in `src/lib/types.ts`. Addresses of pages live in
  `src/lib/paths.ts`: link with `paths.*`, never a hand-written URL.
