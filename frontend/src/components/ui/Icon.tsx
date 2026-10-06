import { LOCKUP, MARK } from '@/lib/logo'

// Line icons on a 24 grid, 1.5 stroke. They support a label; they never replace one.
const ICONS = {
  menu: 'M4 8.5h16M4 15.5h16',
  close: 'M6 6l12 12M18 6 6 18',
  search: 'M11 4.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM16 16l4 4',
  'arrow-right': 'M4.5 12h15M13.5 6l6 6-6 6',
  'arrow-left': 'M19.5 12h-15M10.5 6l-6 6 6 6',
  external: 'M7 17 17 7M9 7h8v8',
  'chevron-down': 'm6 9.5 6 6 6-6',
  'chevron-right': 'm9.5 6 6 6-6 6',
  chat: 'M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5ZM9 9.3c.3 2.8 2.9 5.4 5.7 5.7',
  phone:
    'M6.8 3.5h2.9l1.4 3.9-1.9 1.3a10.6 10.6 0 0 0 6.1 6.1l1.3-1.9 3.9 1.4v2.9a2 2 0 0 1-2 2A15.7 15.7 0 0 1 4.8 5.5a2 2 0 0 1 2-2Z',
  globe: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM3.5 12h17M12 3.5c2.6 2.6 2.6 14.4 0 17M12 3.5c-2.6 2.6-2.6 14.4 0 17',
  directions: 'M12 2.8 21.2 12 12 21.2 2.8 12ZM9 14.5v-3h5.5M12.5 9.2l2.3 2.3-2.3 2.3',
  pin: 'M12 21s6.5-5.6 6.5-11a6.5 6.5 0 0 0-13 0c0 5.4 6.5 11 6.5 11ZM12 7.8a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Z',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM12 7.5V12l3 2',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  plus: 'M12 5v14M5 12h14',
  sliders:
    'M4 7h8.8M17.2 7H20M4 17h2.8M11.2 17H20M15 4.8a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM9 14.8a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Z',
  expand: 'M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5',
  mail: 'M3.5 6.5h17v11h-17ZM4 7l8 6.5L20 7',
  flag: 'M6 21V4.5h11l-2 4 2 4H6',
  verified: 'm12 3 7 2.5V11c0 4.5-3 8-7 9.5-4-1.5-7-5-7-9.5V5.5ZM8.8 12l2.3 2.3 4.2-4.6',
  info: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM12 11v5.5M12 7.7v.3',
  languages: 'M4 5h10v8H8.5L4 16.5ZM14.5 9H20v10.5L16.5 17H11v-3.5',
  card: 'M3.5 6.5h17v11h-17ZM3.5 10.2h17M7 14.5h3',
  parking: 'M6 4h12v16H6ZM10 16V8h2.8a2.4 2.4 0 0 1 0 4.8H10',
  access: 'M12 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM7 9h10M12 9v5M9 21l3-7 3 7',
  // Facilities
  pool: 'M3 16c2 0 2 1.5 4.5 1.5S10 16 12 16s2 1.5 4.5 1.5S19 16 21 16M3 20c2 0 2 1.5 4.5 1.5S10 20 12 20s2 1.5 4.5 1.5S19 20 21 20M8 13V6a2 2 0 0 1 4 0M14 13V6a2 2 0 0 1 4 0M8 9.5h6',
  sauna: 'M5 20.5V10h14v10.5M5 15h14M9 3.5c-1 1.2 1 1.8 0 3M12 3.5c-1 1.2 1 1.8 0 3M15 3.5c-1 1.2 1 1.8 0 3',
  jacuzzi:
    'M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4ZM7 19l-1 2M17 19l1 2M8 6.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM12 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM16 6.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z',
  'private-hammam': 'M4 20.5V12a8 8 0 0 1 16 0v8.5M3 20.5h18M10 20.5V16a2 2 0 0 1 4 0v4.5M12 4V2.5',
  'couples-room':
    'M8 9a2.2 2.2 0 1 0 0-4.4A2.2 2.2 0 0 0 8 9ZM16 9a2.2 2.2 0 1 0 0-4.4A2.2 2.2 0 0 0 16 9ZM3.5 19v-2.5A4.5 4.5 0 0 1 12 14.4a4.5 4.5 0 0 1 8.5 2.1V19',
  gym: 'M7 12h10M6.5 7.5v9M17.5 7.5v9M3.5 9.5v5M20.5 9.5v5',
  outdoor: 'M5 19.5c0-8.5 5-13.5 14-14.5 0 9.5-5 14.5-13 14.5M5 19.5l7.5-7.5',
  'hotel-access': 'M5 20.5V6l7-2.5v17M12 9h7v11.5M3 20.5h18M8 9h1M8 12.5h1M8 16h1M15.5 12.5h1M15.5 16h1',
} as const

export type IconName = keyof typeof ICONS

interface IconProps {
  name: IconName
  className?: string
}

export function Icon({ name, className }: IconProps) {
  return (
    <svg className={className ? `icon ${className}` : 'icon'} aria-hidden="true" focusable="false">
      <use href={`#i-${name}`} />
    </svg>
  )
}

const STAR = 'm12 2.8 2.7 5.9 6.4.7-4.7 4.4 1.3 6.3L12 17l-5.7 3.1 1.3-6.3-4.7-4.4 6.4-.7Z'
const KHATAM = 'M12 2.1 14.9 5H19v4.1l2.9 2.9-2.9 2.9V19h-4.1L12 21.9 9.1 19H5v-4.1L2.1 12 5 9.1V5h4.1Z'

/** Rendered once per page; every <Icon> and mark points into it. */
export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      {Object.entries(ICONS).map(([name, d]) => (
        <symbol key={name} id={`i-${name}`} viewBox="0 0 24 24">
          <path d={d} />
        </symbol>
      ))}
      <symbol id="i-star" viewBox="0 0 24 24">
        <path d={STAR} fill="currentColor" stroke="none" />
      </symbol>
      {/* Five stars as one shape, so a rating is a single clipped image. */}
      <symbol id="i-stars" viewBox="0 0 68 12">
        {[0, 14, 28, 42, 56].map((x) => (
          <use key={x} href="#i-star" x={x} width="12" height="12" />
        ))}
      </symbol>
      {/* The logo lockup, defined once and referenced by the header and the footer. */}
      <symbol id="logo" viewBox={`0 0 ${LOCKUP.width} ${LOCKUP.height}`}>
        <g transform={`translate(0 ${LOCKUP.markY})`} style={{ fill: 'var(--logo-mark, #c9a43b)' }} stroke="none">
          <path fillRule="evenodd" d={MARK.wall} />
          {MARK.ripples.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <path d={LOCKUP.top} fill="currentColor" stroke="none" />
        <path d={LOCKUP.bottom} fill="currentColor" stroke="none" />
      </symbol>
      <symbol id="mark" viewBox={`0 0 ${MARK.width} ${MARK.height}`}>
        <g style={{ fill: 'var(--logo-mark, #c9a43b)' }} stroke="none">
          <path fillRule="evenodd" d={MARK.wall} />
          {MARK.ripples.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      </symbol>
      {/* The doorway from the logo: the unit distinctions are counted in. */}
      <symbol id="m-door" viewBox="6.2 7.6 11.6 17.4">
        <path d={MARK.door} fill="currentColor" stroke="none" />
      </symbol>
      <symbol id="m-khatam" viewBox="0 0 24 24">
        <path d={KHATAM} fill="currentColor" stroke="none" />
      </symbol>
    </svg>
  )
}
