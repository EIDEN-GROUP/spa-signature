// Builds the responsive media library.
//
//   media-src/*.webp  ->  public/media/<id>-<width>.{avif,webp}
//                     ->  public/media/og/<id>.jpg            (1200x630 social cards)
//                     ->  src/data/media.generated.ts         (dimensions, widths, tone)
//
// Every asset is an art-directed crop of a source photograph, so a card never
// downloads pixels it is going to hide. Run with `npm run media` whenever a
// source photograph or a crop changes; the output is committed.

import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(root, 'media-src')
const OUT = path.join(root, 'public', 'media')
const MANIFEST = path.join(root, 'src', 'data', 'media.generated.ts')

const WIDTHS = [360, 540, 720, 960, 1280, 1600]

/** Source photographs. `grade` tames the orange cast the brief asks us to avoid. */
const SOURCES = {
  basin: { file: '01-hammam-basin.webp', grade: { saturation: 0.74, brightness: 1.02 } },
  towel: { file: '02-warm-towel.webp' },
  brass: { file: '03-brass-bowls.webp' },
  courtyard: { file: '04-courtyard-pool.webp', grade: { saturation: 0.92 } },
  redhammam: { file: '05-red-hammam.webp' },
  facial: { file: '07-facial-brush.webp' },
  oils: { file: '08-argan-oils.webp' },
  clay: { file: '09-rhassoul-clay.webp' },
  tea: { file: '10-mint-tea.webp' },
}

/** id -> [source, x, y, width, height] in source pixels, plus whether a social card is cut. */
const ASSETS = {
  // A courtyard pool under carved plaster
  'courtyard-tall': ['courtyard', 0, 0, 802, 1200, { og: true }],
  'courtyard-45': ['courtyard', 0, 150, 802, 1002],
  'courtyard-43': ['courtyard', 0, 300, 802, 601],
  'courtyard-water': ['courtyard', 0, 398, 802, 802],

  // A red zellige hammam chamber
  'redhammam-45': ['redhammam', 0, 0, 800, 997, { og: true }],
  'redhammam-43': ['redhammam', 0, 215, 800, 600],
  'redhammam-niche': ['redhammam', 100, 150, 600, 600],

  // A stone basin, brass taps
  'basin-32': ['basin', 0, 0, 1650, 1100, { og: true }],
  'basin-45': ['basin', 500, 0, 880, 1100],
  'basin-ledge-43': ['basin', 570, 290, 1080, 810],
  'basin-taps-45': ['basin', 0, 40, 660, 825, { og: true }],
  'basin-taps-43': ['basin', 0, 60, 660, 495],

  // Hammered brass on dark marble
  'brass-34': ['brass', 0, 0, 1440, 1920, { og: true }],
  'brass-bowls-43': ['brass', 300, 1230, 920, 690],
  'brass-pail-45': ['brass', 140, 40, 1000, 1250, { og: true }],
  'brass-pail-43': ['brass', 140, 100, 1000, 750],
  'brass-tray-11': ['brass', 0, 790, 900, 900, { og: true }],

  // A warm towel, practised hands
  'towel-34': ['towel', 0, 0, 1440, 1920, { og: true }],
  'towel-43': ['towel', 0, 800, 1440, 1080],
  'towel-hands-11': ['towel', 0, 900, 1020, 1020],

  // A facial, brush and daylight
  'facial-45': ['facial', 0, 0, 1080, 1350, { og: true }],
  'facial-43': ['facial', 0, 390, 1080, 810],

  // Linen and fringe on a treatment table
  'oils-fringe-45': ['oils', 0, 1000, 736, 920, { og: true }],
  'oils-fringe-43': ['oils', 0, 1000, 736, 552],
  'oils-linen-43': ['oils', 800, 250, 640, 480, { og: true }],

  // Rhassoul clay, raw, ground and mixed
  'clay-34': ['clay', 0, 0, 1440, 1920, { og: true }],
  'clay-43': ['clay', 300, 330, 1140, 855],
  'clay-paste-11': ['clay', 560, 1040, 880, 880, { og: true }],
  'clay-flakes-45': ['clay', 0, 560, 720, 900],
  'clay-stones-11': ['clay', 0, 0, 760, 760],

  // Verbena, mint, a silver teapot
  'tea-34': ['tea', 0, 0, 1440, 1920, { og: true }],
  'tea-43': ['tea', 0, 620, 1440, 1080],
  'tea-glasses-11': ['tea', 700, 900, 740, 740, { og: true }],
  'tea-pot-45': ['tea', 60, 700, 760, 950],
}

const hex = (n) => Math.round(n).toString(16).padStart(2, '0')

function pipeline(sourceKey, x, y, width, height) {
  const source = SOURCES[sourceKey]
  let image = sharp(path.join(SRC, source.file)).extract({ left: x, top: y, width, height })
  if (source.grade) image = image.modulate(source.grade)
  return image
}

async function build() {
  await rm(OUT, { recursive: true, force: true })
  await mkdir(path.join(OUT, 'og'), { recursive: true })

  const manifest = {}
  let bytes = 0
  let files = 0

  for (const [id, [sourceKey, x, y, width, height, options = {}]] of Object.entries(ASSETS)) {
    // Never upscale: keep the steps below the crop width, then the crop itself.
    const widths = WIDTHS.filter((w) => w <= width * 0.92)
    widths.push(Math.min(width, WIDTHS.at(-1)))

    for (const w of widths) {
      const base = pipeline(sourceKey, x, y, width, height).resize({ width: w })
      const [avif, webp] = await Promise.all([
        base.clone().avif({ quality: 52, effort: 5 }).toFile(path.join(OUT, `${id}-${w}.avif`)),
        base.clone().webp({ quality: 76, effort: 5 }).toFile(path.join(OUT, `${id}-${w}.webp`)),
      ])
      bytes += avif.size + webp.size
      files += 2
    }

    if (options.og) {
      const og = await pipeline(sourceKey, x, y, width, height)
        .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
        .jpeg({ quality: 78, mozjpeg: true })
        .toFile(path.join(OUT, 'og', `${id}.jpg`))
      bytes += og.size
      files += 1
    }

    // Average tone: painted behind the image while it loads, so nothing flashes.
    const { data } = await pipeline(sourceKey, x, y, width, height)
      .resize(1, 1, { fit: 'fill' })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })

    manifest[id] = {
      width,
      height,
      widths,
      tone: `#${hex(data[0])}${hex(data[1])}${hex(data[2])}`,
      og: Boolean(options.og),
    }
    console.log(`${id.padEnd(18)} ${String(width).padStart(4)}x${String(height).padEnd(4)} ${widths.join(' ')}`)
  }

  const body = Object.entries(manifest)
    .map(([id, m]) => `  '${id}': { width: ${m.width}, height: ${m.height}, widths: [${m.widths.join(', ')}], tone: '${m.tone}', og: ${m.og} },`)
    .join('\n')

  await writeFile(
    MANIFEST,
    `// Generated by scripts/build-media.mjs. Do not edit by hand; run \`npm run media\`.\n\nexport const MEDIA_FILES = {\n${body}\n} as const\n\nexport type MediaId = keyof typeof MEDIA_FILES\n`,
  )

  console.log(`\n${Object.keys(manifest).length} assets, ${files} files, ${(bytes / 1024 / 1024).toFixed(1)} MB`)
}

build().catch((error) => {
  console.error(error)
  process.exit(1)
})
