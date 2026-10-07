import { motion, type MotionStyle, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { type CSSProperties, type FocusEvent, type ReactNode, useRef, useState } from 'react'
import { Link } from 'react-router'
import { SearchForm } from '@/components/site/SearchForm'
import { Seo } from '@/components/site/Seo'
import { RatingInline } from '@/components/site/Stars'
import { ArrowLink, Button } from '@/components/ui/Button'
import { Door } from '@/components/ui/Door'
import { Icon } from '@/components/ui/Icon'
import { Eyebrow, Khatam } from '@/components/ui/Khatam'
import { Picture } from '@/components/ui/Picture'
import { Reveal, Stagger } from '@/components/ui/Reveal'
import { Rich } from '@/components/ui/Rich'
import { Scene } from '@/components/ui/Scene'
import { SplitHeading } from '@/components/ui/SplitHeading'
import { useT } from '@/hooks/use-language'
import { useRevealed } from '@/hooks/use-revealed'
import { CITIES, cityStats, EXPERIENCES, getSpaById, MONTHLY_PICKS, spasWithExperience, toCard } from '@/lib/data'
import { EASE, fade, rise, unveil } from '@/lib/motion'
import { paths } from '@/lib/paths'
import { websiteJsonLd } from '@/lib/seo'
import type { City } from '@/lib/types'
import { cx, formatDuration } from '@/lib/utils'
import doorArcade from '@/assets/door-arcade.webp'
import doorGate from '@/assets/door-gate.webp'
import heroImg from '@/assets/hero-img.png'

// ── The homepage ────────────────────────────────────────────────────────────────

export function Home() {
  const t = useT()

  return (
    <>
      <Seo description={t.site.description} path={paths.home} jsonLd={[websiteJsonLd(t.site.description, t.code)]} />
      <Hero />
      <Picks />
      <Cities />
      <Experiences />
      <Closing />
      <ForSpas />
    </>
  )
}

// ── Hero ────────────────────────────────────────────────────────────────────────

const DOORWAY = 'inset(20% 38% 0% 38% round 50vw 50vw 0px 0px)'
const OPEN = 'inset(0% 0% 0% 0% round 0vw 0vw 0px 0px)'

function Hero() {
  const t = useT()
  const ref = useRef<HTMLElement>(null)
  const still = useReducedMotion()
  const revealed = useRevealed()
  const [curtain] = useState(!revealed)
  const from = curtain ? 0.5 : 1.3 
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const recede = useTransform(scrollYProgress, [0, 1], [1, 0.93])
  const lift = useTransform(scrollYProgress, [0, 0.7], [0, -110])
  const dim = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} className="home-hero">
      <motion.div className="home-hero-stage" style={still ? undefined : { scale: recede }}>
        <motion.div
          className="home-hero-gate"
          initial={still || curtain ? false : { clipPath: DOORWAY }}
          animate={{ clipPath: OPEN }}
          transition={{ duration: 1.9, ease: [0.72, 0, 0.18, 1], delay: 0.15 }}
        >
          <motion.div className="home-hero-drift" style={still ? undefined : { y: drift }}>
            <motion.picture className="home-hero-picture" initial={still ? false : { scale: 1.3 }} animate={{ scale: revealed ? 1 : 1.3 }} transition={{ duration: 2.8, ease: EASE, delay: 0.15 }}>
              <img src={heroImg} alt={t.hero.imageAlt} decoding="sync" fetchPriority="high" />
            </motion.picture>
          </motion.div>
        </motion.div>

        <div className="container on-dark home-hero-copy">
          <motion.div className="home-hero-words" style={still ? undefined : { y: lift, opacity: dim }}>
            <motion.div initial={still ? false : { opacity: 0, y: 20 }} animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 1, ease: EASE, delay: from }}>
              <Eyebrow className='text-gold'>{t.hero.eyebrow}</Eyebrow>
            </motion.div>
            <SplitHeading as="h1" className="display home-hero-title" delay={from + 0.05} ready={revealed}>
              <Rich text={t.hero.title} />
            </SplitHeading>
          </motion.div>

          <motion.div
            className="home-hero-search"
            initial={still ? false : { opacity: 0, y: 40 }}
            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1.2, ease: EASE, delay: from + 0.25 }}
          >
            <SearchForm fields={['city', 'experience', 'occasion']} submitLabel={t.search.submit} className="home-hero-form" />
          </motion.div>
        </div>

        <motion.div
          className="container on-dark home-hero-foot"
          initial={still ? false : { opacity: 0, y: 24 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 1.2, ease: EASE, delay: from + 0.45 }}
        >
          <ul className="home-hero-trust">
            {t.hero.promises.map((promise) => (
              <li key={promise}>
                <Khatam />
                {promise}
              </li>
            ))}
          </ul>
          <div className="home-hero-actions">
            <Button to={`${paths.home}#home-picks`} arrow>
              {t.hero.picks}
            </Button>
            <ArrowLink to={paths.spas()}>{t.hero.allSpas}</ArrowLink>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ── This month’s picks ──────────────────────────────────────────────────────────

const PICKS = MONTHLY_PICKS.items.flatMap((item) => {
  const spa = getSpaById(item.spaId)
  return spa ? [{ spa, card: toCard(spa), whyNow: item.whyNow }] : []
})

function Picks() {
  const t = useT()
  const [lead, ...others] = PICKS
  if (!lead) return null

  return (
    <section className="section home-picks" aria-labelledby="home-picks">
      <Scene className="container">
        <Intro
          id="home-picks"
          eyebrow={`${t.picks.month} ${MONTHLY_PICKS.year}`}
          title={t.picks.title}
          lede={t.picks.lede}
          action={<ArrowLink to={paths.spas()}>{t.hero.allSpas}</ArrowLink>}
        />

        <div className="home-picks-grid">
          <Stagger as="article" className="home-picks-lead" gap={0.14}>
            <div className="home-picks-frame">
              <Door media={lead.card.image} ratio={4 / 3} drift={5} decorative />
              <motion.p className="home-picks-seal" variants={fade}>
                <b>N° 1</b>
                <span>{t.picks.seal}</span>
              </motion.p>
            </div>
            <motion.div className="home-picks-lead-body" variants={rise}>
              <h3 className="home-picks-lead-name">
                <Link to={paths.spa(lead.card.slug)} className="home-picks-cover">
                  {lead.card.name}
                </Link>
              </h3>
              <p className="home-picks-place">
                {lead.card.neighbourhoodName}, {t.cities.byId[lead.spa.cityId].name}{' '}
                <span>· {t.spaTypes[lead.spa.type].name}</span>
              </p>
              <RatingInline rating={lead.card.rating} showLabel />
              <p className="voice home-picks-why">{t.picks.why[lead.spa.id] ?? lead.whyNow}</p>
              <div className="home-picks-foot">
                <p className="home-picks-facts">
                  {t.picks.signature[lead.spa.id] ?? lead.card.signature.name} · {formatDuration(lead.card.signature.durationMin)}
                </p>
                <span className="home-picks-cta" aria-hidden="true">
                  {t.picks.view}
                  <span className="home-go">
                    <Icon name="arrow-right" />
                  </span>
                </span>
              </div>
            </motion.div>
          </Stagger>

          <Stagger as="ol" className="home-picks-list" gap={0.12} delay={0.15}>
            {others.map(({ spa, card, whyNow }, index) => (
              <motion.li key={spa.id} className="home-picks-row" variants={rise}>
                <Door media={card.leadImage} shape="soft" ratio={1} drift={4} decorative className="home-picks-thumb" />
                <div className="home-picks-row-body">
                  <p className="home-picks-pick">N° {index + 2}</p>
                  <h3 className="home-picks-name">
                    <Link to={paths.spa(card.slug)} className="home-picks-cover">
                      {card.name}
                    </Link>
                  </h3>
                  <p className="home-picks-place">
                    {card.neighbourhoodName}, {t.cities.byId[spa.cityId].name}
                  </p>
                  <p className="voice home-picks-note">{t.picks.why[spa.id] ?? whyNow}</p>
                  <RatingInline rating={card.rating} />
                </div>
              </motion.li>
            ))}
          </Stagger>
        </div>
      </Scene>
    </section>
  )
}

// ── Discover by city ────────────────────────────────────────────────────────────

function Cities() {
  const t = useT()

  return (
    <section className="section home-cities" aria-labelledby="home-cities">
      <Scene>
        <div className="container">
          <Intro
            id="home-cities"
            eyebrow={t.cities.eyebrow}
            title={t.cities.title}
            lede={t.cities.lede}
            action={<ArrowLink to={paths.cities}>{t.cities.all}</ArrowLink>}
            className="home-intro-centred"
          />
        </div>

        <Stagger as="ul" className="home-cities-row" gap={0.11}>
          {CITIES.map((city, index) => (
            <CityDoor key={city.id} city={city} index={index} />
          ))}
        </Stagger>
      </Scene>
    </section>
  )
}

/** One door of the arcade. Neighbours slide in opposite directions as the page scrolls. */
function CityDoor({ city, index }: { city: City; index: number }) {
  const t = useT()
  const ref = useRef<HTMLLIElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const reach = index % 2 ? 30 : -30
  const shift = useTransform(scrollYProgress, [0, 1], [`${reach}px`, `${-reach}px`])
  const stats = cityStats(city.id)
  const words = t.cities.byId[city.id]

  return (
    <motion.li ref={ref} className="home-cities-item" variants={rise} style={{ '--shift': shift } as MotionStyle}>
      <Link to={paths.city(city.slug)} className="home-cities-link">
        <Door media={{ ...city.image, alt: words.alt }} />
        <span className="home-cities-text">
          <span className="home-cities-name">
            {words.name}
            <Icon name="arrow-right" />
          </span>
          <span className="home-cities-meta">
            {t.format.spas(stats.count)}
          </span>
        </span>
      </Link>
    </motion.li>
  )
}

// ── Explore by experience ───────────────────────────────────────────────────────

function Experiences() {
  const t = useT()
  const still = useReducedMotion()
  const panel = useRef<HTMLDivElement>(null)
  const seen = useInView(panel, { amount: 0.3 })
  const dragged = useRef(false)
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [held, setHeld] = useState(false)
  const count = EXPERIENCES.length
  const current = ((step % count) + count) % count
  const number = (index: number) => String(index + 1).padStart(2, '0')

  const go = (by: number) => {
    setDir(by)
    setStep((value) => value + by)
  }

  const swipe = {
    onPanStart: () => {
      dragged.current = false
    },
    onPan: (_: unknown, info: { offset: { x: number } }) => {
      if (Math.abs(info.offset.x) > 10) dragged.current = true
    },
    onPanEnd: (_: unknown, info: { offset: { x: number; y: number } }) => {
      const { x, y } = info.offset
      window.setTimeout(() => {
        dragged.current = false
      }, 60)
      if (Math.abs(x) >= 40 && Math.abs(x) > Math.abs(y)) go(x < 0 ? 1 : -1)
    },
  }

  const hold = {
    onPointerEnter: () => setHeld(true),
    onPointerLeave: () => setHeld(false),
    onFocus: (event: FocusEvent<HTMLElement>) => {
      if (event.target.matches(':focus-visible')) setHeld(true)
    },
    onBlur: () => setHeld(false),
  }

  return (
    <section className="home-experiences" aria-labelledby="home-experiences">
      <Scene panel>
        <div ref={panel} className="on-dark home-experiences-panel">
          <div className="container home-experiences-inner">
            <Intro
              id="home-experiences"
              eyebrow={t.experiences.eyebrow}
              title={t.experiences.title}
              lede={t.experiences.lede}
              className="home-experiences-intro"
            />

            <Stagger className="home-experiences-frame">
              <motion.div className="home-experiences-stage" variants={unveil} {...swipe} {...hold}>
                {EXPERIENCES.map((experience, index) => {
                  const words = t.experiences.byId[experience.id]
                  const shown = index === current
                  return (
                    <Link
                      key={experience.id}
                      to={paths.experience(experience.slug)}
                      className={cx('home-experiences-slide', shown && 'home-experiences-shown')}
                      inert={!shown}
                      draggable={false}
                      onClick={(event) => {
                        if (dragged.current) event.preventDefault()
                      }}
                    >
                      <Picture media={experience.image} decorative className="home-experiences-shot" />
                      <span className="home-experiences-caption">
                        <span className="home-experiences-number" aria-hidden="true">
                          {number(index)}
                        </span>
                        <span className="home-experiences-name">{words.name}</span>
                        <span className="voice home-experiences-words">{t.format.quote(words.words)}</span>
                        <span className="home-experiences-meta">
                          <span className="home-experiences-count">{t.format.spas(spasWithExperience(experience.id).length)}</span>
                          <span className="home-go">
                            <Icon name="arrow-right" />
                          </span>
                        </span>
                      </span>
                    </Link>
                  )
                })}
              </motion.div>
            </Stagger>

            <Reveal className="home-experiences-rail" delay={0.15}>
              <motion.ul className="home-experiences-cards" aria-label={t.experiences.choose} {...swipe} {...hold}>
                {EXPERIENCES.map((experience, index) => {
                  const ahead = (index - current + count) % count
                  const slot = ahead - 1
                  const wrapped = dir > 0 ? slot >= count - 1 - dir : slot <= -dir - 2
                  return (
                    <li
                      key={experience.id}
                      className={cx(
                        'home-experiences-card',
                        slot < 0 && 'home-experiences-away',
                        wrapped && 'home-experiences-wrapped',
                      )}
                      style={{ '--slot': slot } as CSSProperties}
                      inert={slot < 0}
                    >
                      <button
                        type="button"
                        className="home-experiences-pick"
                        onClick={() => {
                          if (!dragged.current) go(ahead > count / 2 ? ahead - count : ahead)
                        }}
                      >
                        <Picture media={experience.image} decorative />
                        <span className="home-experiences-pick-number" aria-hidden="true">
                          {number(index)}
                        </span>
                        <span className="home-experiences-pick-name">{t.experiences.byId[experience.id].name}</span>
                      </button>
                    </li>
                  )
                })}
              </motion.ul>
            </Reveal>

            <Reveal className="home-experiences-foot" delay={0.25}>
              <div className="home-experiences-controls">
                <button type="button" className="home-go" onClick={() => go(-1)} aria-label={t.experiences.previous}>
                  <Icon name="arrow-left" />
                </button>
                <button type="button" className="home-go" onClick={() => go(1)} aria-label={t.experiences.next}>
                  <Icon name="arrow-right" />
                </button>
                <span className="home-experiences-progress" aria-hidden="true">
                  {still ? null : (
                    <span
                      key={step}
                      className="home-experiences-fill"
                      style={{ animationPlayState: seen && !held ? 'running' : 'paused' }}
                      onAnimationEnd={() => go(1)}
                    />
                  )}
                </span>
                <span className="home-experiences-index" aria-hidden="true">
                  <b>{number(current)}</b> / {number(count - 1)}
                </span>
              </div>
              <Link to={paths.experiences} className="home-experiences-all">
                <span>{t.experiences.all}</span>
                <span className="home-experiences-all-line" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </Scene>
    </section>
  )
}

// ── Closing search ──────────────────────────────────────────────────────────────

function Closing() {
  const t = useT()

  return (
    <section className="section home-closing" aria-labelledby="home-closing">
      <Scene className="container">
        <div className="home-closing-grid">
          <div className="home-closing-text">
            <Reveal>
              <Eyebrow>{t.closing.eyebrow}</Eyebrow>
            </Reveal>
            <SplitHeading id="home-closing" className="display home-closing-title">
              <Rich text={t.closing.title} />
            </SplitHeading>
            <Reveal delay={0.15}>
              <p className="lede">{t.closing.lede}</p>
            </Reveal>
            <Reveal delay={0.25} className="home-closing-form">
              <SearchForm fields={['city', 'experience']} submitLabel={t.search.submitSpas} showCount />
            </Reveal>
          </div>

          <Stagger className="home-closing-doors" gap={0.2}>
            <Door
              media={{ src: doorArcade, alt: t.closing.arcadeAlt, focus: '64% 50%' }}
              shape="pill"
              ratio={5 / 8}
              drift={7}
              className="home-closing-tall"
            />
          </Stagger>
        </div>
      </Scene>
    </section>
  )
}

// ── Run a spa? ──────────────────────────────────────────────────────────────────

function ForSpas() {
  const t = useT()

  return (
    <section className="home-for-spas" aria-labelledby="home-for-spas">
      <Scene panel className="container">
        <Stagger className="on-dark home-for-spas-band" gap={0.14}>
          <motion.div className="home-for-spas-text" variants={rise}>
            <Eyebrow>{t.forSpas.eyebrow}</Eyebrow>
            <h2 id="home-for-spas" className="home-for-spas-title">
              <Rich text={t.forSpas.title} />
            </h2>
            <p className="home-for-spas-line">{t.forSpas.line}</p>
            <Button to={paths.forSpas} variant="primary" arrow className="home-for-spas-cta">
              {t.forSpas.cta}
            </Button>
          </motion.div>
          <div className="home-for-spas-door">
            <Door media={{ src: doorGate, alt: t.forSpas.doorAlt }} drift={5} />
          </div>
        </Stagger>
      </Scene>
    </section>
  )
}

// ── Section intro ───────────────────────────────────────────────────────────────

interface IntroProps {
  id: string
  eyebrow: string
  title: string
  lede?: string
  action?: ReactNode
  className?: string
}

function Intro({ id, eyebrow, title, lede, action, className }: IntroProps) {
  return (
    <header className={cx('home-intro', className)}>
      <div className="home-intro-titles">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <SplitHeading id={id} className="h2">
          <Rich text={title} />
        </SplitHeading>
        {lede ? (
          <Reveal delay={0.12}>
            <p className="lede">{lede}</p>
          </Reveal>
        ) : null}
      </div>
      {action ? (
        <Reveal delay={0.2} className="home-intro-action">
          {action}
        </Reveal>
      ) : null}
    </header>
  )
}
