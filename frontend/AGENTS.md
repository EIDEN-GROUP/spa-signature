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
with search, Discover by city, Explore by experience, This month’s picks, the
“Run a spa?” band, and the closing search. “Signature Selection”, “Signature
Method”, “Guides” and “Explore Morocco” were removed on purpose: do not add
them back, or link to them from the header or footer.

## Styling

- CSS Modules, one per component, next to the component.
- Colours, type sizes, spacing, radius and easing come from
  `src/styles/tokens.css`. Do not write a raw colour or size in a component.
- Gold (`--color-dhahab`) is for the logo mark and editorial picks only, always
  flat. Actions are Fès green. Mint marks a selected state.
- Interface corners use `--radius`. Photographs are framed as doorways with the
  `Door` component (`src/components/motion/Door.tsx`), not with a plain rounded box.

## Photographs

- One file per photograph in `public/media`. No extra sizes, formats or crops.
- A photograph is used for one thing: never reuse one for a second city, spa or section.
- `public/media` and `src/data/media.generated.ts` are generated. Change the
  source in `media-src/` and run `npm run media`.

## Motion

- Lenis drives page scroll (`SmoothScroll`).
- Framer Motion animates sections and photographs (`Reveal`, `Stagger`, `Door`).
- GSAP animates text (`SplitHeading`).
- Everything must still read correctly with `prefers-reduced-motion`.

## Code

- TypeScript, no semicolons, single quotes, two spaces.
- Shared types live in `src/domain/types.ts`. Addresses of pages live in
  `src/lib/routes.ts`: link with `paths.*`, never a hand-written URL.
- Do not edit `*.generated.ts` files by hand.
