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
The hero fills the first screen: the title is centred over the photograph, the
search is a white bar with a burgundy button under it, and the promises and the two links
sit along the foot of the photograph. It has one photograph and no carousel.
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
- Interface corners use `--radius`. Photographs are framed with the `Door`
  component (`src/components/ui/Door.tsx`), and the cut changes from one
  section to the next so the page is not all doorways: `shape="door"` (an arch
  over straight jambs: the first pick, the “Run a spa?” band),
  `shape="soft"` (a rounded rectangle: the other picks) and `shape="pill"`
  (rounded ends: the closing search). The experiences carousel uses plain
  rounded rectangles. When adding a section, do not repeat the shape of the
  section above it.
- Discover by city does not use `Door`. Each city is a row: its photograph is
  a capsule fixed to one edge of the screen, round at the other end, and the
  rows alternate sides. The names of the city’s quarters travel around the
  capsule on an SVG path (`CityRing` in `src/routes/index.tsx`), a little
  faster while the page scrolls. Facing it: the name, three words in a
  burgundy pill, one line, and an outlined pill that fills on hover. The
  whole row is one link. On a phone the text sits under the capsule. A row
  leaves when it goes off either end of the screen and arrives again from the
  side the page comes back on (`useReplayBothWays`).
- In This month’s picks the second pick sits in a card with a burgundy
  outline, so it reads above the third and the fourth.
- On the sage panel of Explore by experience the title is white; its
  emphasised word, the eyebrow and the controls under the rail are burgundy,
  and the lede is `--color-burgundy-night`.
- A choice among a few options is the `Select` component
  (`src/components/ui/Select.tsx`), never a native `<select>`: a button and a
  list drawn in the page’s own style. The list opens under its field, in two
  columns or upwards when there is little room below, and closes when the
  page scrolls. It answers the arrows, Home and End, Enter, Escape and typing
  the first letters.
- The homepage ends with `BackToTop` (`src/components/site/BackToTop.tsx`): a
  round button at the bottom right that appears after the first screen. The
  ring around it fills as the page scrolls.
- Design the phone first. Every section is composed for a narrow screen and
  then given more room, not the other way round.

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
  then the screen rises like a curtain, alone: no coloured sheet follows it.
  The film (`src/assets/loader.mp4`) plays with its sound when the browser
  allows it and muted otherwise. The sound belongs to the loading step only:
  it fades to silence before the curtain starts to rise, and the rise is
  silent. The page does not scroll and shows no
  scrollbar until it is gone. Whatever opens a page waits for it with
  `useRevealed()`.
- The page is light, with three blocks of burgundy set into it: Explore by
  experience (wine), the “Run a spa?” band (the bright gradient) and the
  footer (night). Do not add a fourth.
  A light section is never left bare: the wall behind the page is drawn in
  `body::before` / `body::after`, and each section adds its own ornament the
  same way.
- Explore by experience is a carousel that plays by itself and loops: a stage
  with one photograph, a rail of the experiences still to come, two arrows and
  a line that fills while the stage waits. On a wide screen the photograph
  takes the whole left side of the panel, edge to edge and top to bottom, and
  the first card of the rail steps onto it; on a phone it is a card above the
  rail. The panel's only ornament is the lantern in `::before`. The line is the clock: when its
  animation ends the next experience comes up, so it stops while the pointer
  is over the stage or the rail, while keyboard focus is inside, and while the
  section is off screen. It can be dragged or swiped. With
  `prefers-reduced-motion` it does not play by itself.
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
