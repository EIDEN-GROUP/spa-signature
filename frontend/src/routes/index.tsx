import { motion, type MotionStyle, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { type CSSProperties, type ReactNode, useRef, useState } from 'react'
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
  const from = curtain ? 0.5 : 1.3 // seconds before the words start to arrive
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
            <motion.picture
              className="home-hero-picture"
              initial={still ? false : { scale: 1.3 }}
              animate={{ scale: revealed ? 1 : 1.3 }}
              transition={{ duration: 2.8, ease: EASE, delay: 0.15 }}
            >
              <img src={heroImg} alt={t.hero.imageAlt} decoding="sync" fetchPriority="high" />
            </motion.picture>
          </motion.div>
        </motion.div>

        <motion.div className="container on-dark home-hero-copy" style={still ? undefined : { y: lift, opacity: dim }}>
          <motion.div
            initial={still ? false : { opacity: 0, y: 20 }}
            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, ease: EASE, delay: from }}
          >
            <Eyebrow className='text-gold'>{t.hero.eyebrow}</Eyebrow>
          </motion.div>
          <SplitHeading as="h1" className="display home-hero-title" delay={from + 0.05} ready={revealed}>
            <Rich text={t.hero.title} />
          </SplitHeading>
        </motion.div>
      </motion.div>

      <motion.div
        className="container home-hero-below"
        initial={still ? false : { opacity: 0, y: 56 }}
        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 56 }}
        transition={{ duration: 1.2, ease: EASE, delay: from + 0.25 }}
      >
        <SearchForm fields={['city', 'experience', 'occasion']} submitLabel={t.search.submit} className="home-hero-form" />
        <div className="home-hero-foot">
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
        </div>
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
                <Door media={card.leadImage} ratio={4 / 5} drift={4} decorative className="home-picks-thumb" />
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
  // The row under the pointer, or holding focus, shows its photograph in the doorway.
  const [current, setCurrent] = useState(0)

  return (
    <section className="home-experiences" aria-labelledby="home-experiences">
      <Scene panel>
        <div className="on-dark home-experiences-panel">
          <div className="container home-experiences-inner">
            <div className="home-experiences-aside">
              <Intro
                id="home-experiences"
                eyebrow={t.experiences.eyebrow}
                title={t.experiences.title}
                lede={t.experiences.lede}
                action={<ArrowLink to={paths.experiences}>{t.experiences.all}</ArrowLink>}
              />
              <Stagger className="home-experiences-preview">
                <motion.div className="door" style={{ '--ratio': 4 / 5 } as CSSProperties} variants={unveil} aria-hidden="true">
                  {EXPERIENCES.map((experience, index) => (
                    <Picture
                      key={experience.id}
                      media={experience.image}
                      decorative
                      className={cx('door-picture', 'home-experiences-shot', index === current && 'home-experiences-shown')}
                    />
                  ))}
                </motion.div>
              </Stagger>
            </div>

            <Stagger as="ul" className="home-experiences-list" gap={0.07}>
              {EXPERIENCES.map((experience, index) => (
                <motion.li
                  key={experience.id}
                  className={cx('home-experiences-item', index === current && 'home-experiences-current')}
                  variants={rise}
                >
                  <Link
                    to={paths.experience(experience.slug)}
                    className="home-experiences-link"
                    onMouseEnter={() => setCurrent(index)}
                    onFocus={() => setCurrent(index)}
                  >
                    <Door media={experience.image} drift={4} decorative className="home-experiences-thumb" />
                    <span className="home-experiences-index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="home-experiences-body">
                      <span className="home-experiences-name">{t.experiences.byId[experience.id].name}</span>
                      <span className="voice home-experiences-words">{t.format.quote(t.experiences.byId[experience.id].words)}</span>
                      <span className="home-experiences-count">{t.format.spas(spasWithExperience(experience.id).length)}</span>
                    </span>
                    <span className="home-go">
                      <Icon name="arrow-right" />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </Stagger>
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
            <Door media={{ src: doorArcade, alt: t.closing.arcadeAlt, focus: '64% 50%' }} drift={7} className="home-closing-tall" />
            <motion.div className="home-closing-small" variants={fade}>
              <Door media={{ src: doorGate, alt: t.closing.gateAlt }} drift={-5} />
            </motion.div>
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
        <Stagger className="home-for-spas-band" gap={0.12}>
          <motion.div className="home-for-spas-text" variants={rise}>
            <Eyebrow>{t.forSpas.eyebrow}</Eyebrow>
            <h2 id="home-for-spas" className="home-for-spas-title">
              <Rich text={t.forSpas.title} />
            </h2>
            <p className="home-for-spas-line">{t.forSpas.line}</p>
          </motion.div>
          <motion.div className="home-for-spas-action" variants={rise}>
            <Button to={paths.forSpas} variant="primary" arrow>
              {t.forSpas.cta}
            </Button>
          </motion.div>
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
  /** A link out of the section, set beside the title on wide screens. */
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
