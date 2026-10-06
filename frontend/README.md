# Spa Maroc Signature · frontend

The website. React 19, TypeScript, Vite, React Router and CSS Modules, with
Lenis, Framer Motion and GSAP for motion.

## Commands

Run these from this folder.

| Command             | What it does                                                    |
| ------------------- | --------------------------------------------------------------- |
| `npm install`       | Install dependencies (first time, and after pulling changes)    |
| `npm run dev`       | Start the site on http://localhost:5173                         |
| `npm run build`     | Type-check, then build the production site into `dist/`         |
| `npm run preview`   | Serve the production build locally                              |
| `npm run typecheck` | Type-check only                                                 |
| `npm run lint`      | Lint with oxlint                                                |
| `npm run media`     | Rebuild `public/media` from the photographs in `media-src/`     |
| `npm run brand`     | Rebuild the logo, favicon and app icons                         |

## Folder structure

```
frontend/
├── public/              Served as it is
│   ├── brand/           Logo files                        (made by `npm run brand`)
│   └── media/           One .webp per photograph          (made by `npm run media`)
├── media-src/           Original photographs, and sources.json: where each one came from
├── scripts/             The Node scripts behind `npm run media` and `npm run brand`
├── src/
│   ├── main.tsx         Entry point and the list of routes
│   ├── pages/           One file per route
│   ├── components/
│   │   ├── layout/      Page shell: header, footer, mobile menu, SEO tags
│   │   ├── home/        The sections of the homepage
│   │   ├── spa/         Spa card, gallery, opening hours, contact actions
│   │   ├── search/      Search overlay
│   │   ├── motion/      Animation building blocks: smooth scroll, reveals, door-shaped photographs
│   │   ├── brand/       Logo and distinction marks
│   │   └── ui/          Small generic pieces: button, icon, picture, sheet, rating
│   ├── data/            Content: cities, experiences, spas, photograph descriptions
│   ├── domain/          TypeScript types shared by the whole app
│   ├── lib/             Logic without UI: search, filters, routes, formatting, SEO, hooks
│   └── styles/          Design tokens (colours, type, spacing, radius) and base styles
├── index.html           The page Vite loads `src/main.tsx` into
├── package.json
├── tsconfig.json
├── vite.config.ts
└── .oxlintrc.json       Lint rules
```

A component and its styles sit side by side: `Button.tsx` and `Button.module.css`.

## Where things go

| I want to add…            | Put it in…                                                                          |
| ------------------------- | ----------------------------------------------------------------------------------- |
| A page                    | `src/pages/`, then its route in `src/main.tsx` and its address in `src/lib/routes.ts` |
| A section of one page     | `src/components/<page>/`                                                            |
| A piece used on many pages | `src/components/ui/`                                                               |
| A colour, size or spacing | `src/styles/tokens.css`, then use the variable                                      |
| A photograph              | See “Photographs” below                                                             |
| Content (a spa, a city)   | `src/data/`                                                                         |

## Photographs

Each photograph exists once in `public/media` and is used for one thing only.

1. Save the original in `media-src/`.
2. Add it to `media-src/sources.json` under a name of the form `<kind>-<name>`,
   with its file name and the address it came from. The kind is one of `hero`,
   `city`, `exp`, `spa`, `door` or `decor`, and sets how large the file is served.
3. Run `npm run media`. The photograph is written to `public/media/<kind>-<name>.webp`.
4. Describe it in `src/data/media.ts` (this becomes the alt text).

Components crop with CSS. If the subject is off-centre, set its focal point in
`scripts/build-media.mjs`.

## Working with the backend

The content in `src/data/` is demonstration data. Components read most of it
through the functions in `src/data/index.ts`, so that file is where API calls
will take over from the static files once the backend exists.
