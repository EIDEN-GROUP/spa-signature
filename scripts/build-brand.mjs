// Builds the Spa Maroc Signature identity.
//
// The mark is drawn here by hand: a wall with a pointed horseshoe doorway cut
// through it, standing over its own reflection in still water. Light is what
// you see through the door. The wordmark is set in the two brand typefaces and
// converted to outlines, so the logo is a self-contained SVG that never waits
// for a webfont.
//
//   -> src/components/brand/logo.generated.ts   (paths for the <Logo> component)
//   -> public/brand/*.svg                       (logo files for external use)
//   -> public/*.png, public/favicon.svg         (favicon, touch icon, app icons)
//   -> public/brand/og-default.jpg              (default social card)
//
// Run with `npm run brand`.

import { readFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as fontkit from 'fontkit'
import sharp from 'sharp'
import wawoff2 from 'wawoff2'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const fonts = path.join(root, 'node_modules', '@fontsource-variable')

const COLOR = {
  ink: '#17201B',
  chaux: '#F5F1E8',
  fesDeep: '#0B3328',
  brass: '#96762B', // on light grounds
  brassLight: '#D8BC78', // on dark grounds
}

async function openFont(file) {
  const ttf = Buffer.from(await wawoff2.decompress(await readFile(path.join(fonts, file))))
  return fontkit.create(ttf)
}

const round = (d) => d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n) * 100) / 100))

/** Sets `text` and returns its outline with the origin at the left end of the baseline. */
function outline(font, text, size, tracking = 0) {
  const scale = size / font.unitsPerEm
  const run = font.layout(text)
  let pen = 0
  let d = ''
  run.glyphs.forEach((glyph, i) => {
    const position = run.positions[i]
    d += glyph.path
      .scale(scale, -scale)
      .translate(pen + position.xOffset * scale, -position.yOffset * scale)
      .toSVG()
    pen += position.xAdvance * scale + tracking
  })
  return { d: round(d), width: pen - tracking }
}

const shift = (d, dx, dy) => {
  // Every glyph path from fontkit is absolute, so a translate is a plain offset.
  let isX = true
  return round(
    d.replace(/-?\d+(\.\d+)?/g, (n) => {
      const value = Number(n) + (isX ? dx : dy)
      isX = !isX
      return String(value)
    }),
  )
}

// ── The mark ────────────────────────────────────────────────────────────────
// 24 x 36 grid. The doorway is two arcs of radius 6.9 meeting at a soft point,
// on jambs narrower than the arc: the Maghrebi arch, not the Roman one. It is
// cut out of the wall, so the ground colour shows through as light.
const DOOR = 'M7.2 25V17.83A6.9 6.9 0 0 1 12 7.82A6.9 6.9 0 0 1 16.8 17.83V25Z'
const MARK = {
  width: 24,
  height: 36,
  // Wall and doorway, filled with the even-odd rule.
  wall: `M0 0H24V25H0Z${DOOR}`,
  // The same wall seen in water: three bands, each finer, parted by the door's light.
  ripples: [
    'M0 27h7.2v3.2H0ZM16.8 27H24v3.2h-7.2Z',
    'M0 31.9h7.2v2H0ZM16.8 31.9H24v2h-7.2Z',
    'M0 35h7.2v1H0ZM16.8 35H24v1h-7.2Z',
  ],
  // The doorway on its own: the unit the distinction marks are counted in.
  door: DOOR,
}

async function build() {
  // One at a time: the WOFF2 decoder is a single WebAssembly instance.
  const serifItalic = await openFont('newsreader/files/newsreader-latin-opsz-italic.woff2')
  const serif = await openFont('newsreader/files/newsreader-latin-opsz-normal.woff2')
  const sans = await openFont('hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2')

  // ── The wordmark ──────────────────────────────────────────────────────────
  const top = outline(sans.getVariation({ wght: 600 }), 'SPA MAROC', 8.2, 2.5)
  const bottom = outline(serifItalic.getVariation({ wght: 400, opsz: 72 }), 'Signature', 27)

  // The mark runs from the cap line of the first line to the descender of the second.
  const gap = 11
  const textX = MARK.width + gap
  const lockup = {
    width: Math.ceil(textX + Math.max(top.width, bottom.width) + 1),
    height: 44,
    markY: 4,
    top: shift(top.d, textX + 1.4, 9.8),
    bottom: shift(bottom.d, textX, 33.2),
  }

  const markPaths = () =>
    `<path fill-rule="evenodd" d="${MARK.wall}"/>` + MARK.ripples.map((d) => `<path d="${d}"/>`).join('')

  const svg = ({ mark, text, withText = true, background, pad = 0 }) => {
    const w = withText ? lockup.width : MARK.width
    const h = withText ? lockup.height : MARK.height
    return [
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${w + pad * 2} ${h + pad * 2}" role="img" aria-label="Spa Maroc Signature">`,
      background ? `<rect x="${-pad}" y="${-pad}" width="${w + pad * 2}" height="${h + pad * 2}" fill="${background}"/>` : '',
      `<g fill="${mark}"${withText ? ` transform="translate(0 ${lockup.markY})"` : ''}>${markPaths()}</g>`,
      withText ? `<path fill="${text}" d="${lockup.top}"/><path fill="${text}" d="${lockup.bottom}"/>` : '',
      `</svg>`,
    ].join('')
  }

  await mkdir(path.join(root, 'public', 'brand'), { recursive: true })
  await mkdir(path.join(root, 'src', 'components', 'brand'), { recursive: true })

  const files = {
    'brand/logo.svg': svg({ mark: COLOR.brass, text: COLOR.ink }),
    'brand/logo-reverse.svg': svg({ mark: COLOR.brassLight, text: COLOR.chaux }),
    'brand/logo-mono.svg': svg({ mark: COLOR.ink, text: COLOR.ink }),
    'brand/mark.svg': svg({ mark: COLOR.brass, withText: false }),
  }

  // Favicon and app icons: the mark on Fès green. Below 32px the two finest
  // ripples are dropped, where they would only blur.
  const icon = (size, { radius = 0.16, inset = 0.2, ripples = 3 } = {}) => {
    const markHeight = ripples === 3 ? 36 : ripples === 1 ? 30.2 : 25
    const scale = ((1 - inset * 2) * size) / markHeight
    const tx = (size - MARK.width * scale) / 2
    const ty = (size - markHeight * scale) / 2
    return [
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">`,
      `<rect width="${size}" height="${size}" rx="${size * radius}" fill="${COLOR.fesDeep}"/>`,
      `<g fill="${COLOR.brassLight}" transform="translate(${round(String(tx))} ${round(String(ty))}) scale(${round(String(scale))})">`,
      `<path fill-rule="evenodd" d="${MARK.wall}"/>`,
      MARK.ripples.slice(0, ripples).map((p) => `<path d="${p}"/>`).join(''),
      `</g></svg>`,
    ].join('')
  }
  files['favicon.svg'] = icon(32, { inset: 0.16, ripples: 1 })

  for (const [name, content] of Object.entries(files)) {
    await writeFile(path.join(root, 'public', name), content)
  }

  const png = (markup, size, file) =>
    sharp(Buffer.from(markup), { density: 216 })
      .resize(size, size)
      .png()
      .toFile(path.join(root, 'public', file))
  await png(icon(180, { radius: 0, inset: 0.2 }), 180, 'apple-touch-icon.png')
  await png(icon(192, { radius: 0.16, inset: 0.2 }), 192, 'icon-192.png')
  await png(icon(512, { radius: 0.16, inset: 0.2 }), 512, 'icon-512.png')
  await png(icon(512, { radius: 0, inset: 0.26 }), 512, 'icon-maskable-512.png')

  // Default social card: the lockup and one line of positioning, all outlined.
  const line = outline(serif.getVariation({ wght: 320, opsz: 72 }), 'The independent guide to the spas of Morocco', 46)
  const motto = outline(sans.getVariation({ wght: 500 }), 'SELECTED BY EDITORS  ·  RATED BY GUESTS  ·  NEVER PAID FOR', 17, 3.4)
  const lockupScale = 3.1
  const og = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">`,
    `<rect width="1200" height="630" fill="${COLOR.fesDeep}"/>`,
    `<g transform="translate(96 108) scale(${lockupScale})">`,
    `<g fill="${COLOR.brassLight}" transform="translate(0 ${lockup.markY})">${markPaths()}</g>`,
    `<path fill="${COLOR.chaux}" d="${lockup.top}"/><path fill="${COLOR.chaux}" d="${lockup.bottom}"/>`,
    `</g>`,
    `<path fill="${COLOR.chaux}" d="${shift(line.d, 96, 410)}"/>`,
    `<rect x="96" y="470" width="1008" height="1" fill="${COLOR.brassLight}" opacity="0.5"/>`,
    `<path fill="${COLOR.brassLight}" d="${shift(motto.d, 96, 526)}"/>`,
    `</svg>`,
  ].join('')
  await sharp(Buffer.from(og)).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(root, 'public', 'brand', 'og-default.jpg'))

  await writeFile(
    path.join(root, 'src', 'components', 'brand', 'logo.generated.ts'),
    `// Generated by scripts/build-brand.mjs. Do not edit by hand; run \`npm run brand\`.

export const MARK = ${JSON.stringify(MARK, null, 2)} as const

export const LOCKUP = ${JSON.stringify(lockup, null, 2)} as const
`,
  )

  console.log(`lockup ${lockup.width}x${lockup.height}  top ${top.width.toFixed(1)}  bottom ${bottom.width.toFixed(1)}`)
  return { svg, icon }
}

const { svg, icon } = await build()

// `--preview <file.png>` renders a review sheet for a quick visual check.
const previewAt = process.argv.indexOf('--preview')
if (previewAt > -1) {
  const out = process.argv[previewAt + 1]
  const tile = (markup, width) => sharp(Buffer.from(markup), { density: 300 }).resize({ width }).png().toBuffer()
  const sheet = sharp({ create: { width: 1500, height: 900, channels: 3, background: COLOR.chaux } })
  const dark = await sharp({ create: { width: 750, height: 900, channels: 3, background: COLOR.fesDeep } }).png().toBuffer()
  await sheet
    .composite([
      { input: dark, left: 750, top: 0 },
      { input: await tile(svg({ mark: COLOR.brass, text: COLOR.ink }), 560), left: 90, top: 90 },
      { input: await tile(svg({ mark: COLOR.brassLight, text: COLOR.chaux }), 560), left: 840, top: 90 },
      { input: await tile(svg({ mark: COLOR.brass, text: COLOR.ink }), 150), left: 90, top: 380 },
      { input: await tile(svg({ mark: COLOR.ink, text: COLOR.ink }), 150), left: 300, top: 380 },
      { input: await tile(svg({ mark: COLOR.brassLight, text: COLOR.chaux }), 150), left: 840, top: 380 },
      { input: await tile(svg({ mark: COLOR.brass, withText: false }), 200), left: 90, top: 520 },
      { input: await tile(svg({ mark: COLOR.brass, withText: false }), 28), left: 400, top: 560 },
      { input: await tile(svg({ mark: COLOR.brass, withText: false }), 16), left: 460, top: 570 },
      { input: await tile(icon(32, { inset: 0.16, ripples: 1 }), 32), left: 520, top: 566 },
      { input: await tile(icon(32, { inset: 0.16, ripples: 1 }), 16), left: 580, top: 574 },
      { input: await tile(icon(192), 192), left: 840, top: 560 },
      { input: await tile(svg({ mark: COLOR.brassLight, withText: false }), 200), left: 1120, top: 520 },
    ])
    .png()
    .toFile(out)
  console.log('preview ->', out)
}
