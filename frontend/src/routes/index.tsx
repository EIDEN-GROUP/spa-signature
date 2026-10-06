import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { type ReactNode, useRef } from 'react'
import { Link } from 'react-router'
import { SearchForm } from '@/components/site/SearchForm'
import { Seo } from '@/components/site/Seo'
import { RatingInline } from '@/components/site/Stars'
import { ArrowLink, Button } from '@/components/ui/Button'
import { Door } from '@/components/ui/Door'
import { Icon } from '@/components/ui/Icon'
import { Eyebrow, Khatam } from '@/components/ui/Khatam'
import { Reveal, Stagger } from '@/components/ui/Reveal'
import { SplitHeading } from '@/components/ui/SplitHeading'
import { CITIES, cityStats, EXPERIENCES, getSpaById, MONTHLY_PICKS, spasWithExperience, toCard } from '@/lib/data'
import { media, mediaUrl } from '@/lib/media'
import { EASE, fade, rise, stagger, VIEWPORT } from '@/lib/motion'
import { paths } from '@/lib/paths'
import { websiteJsonLd } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { cx, formatDuration, formatMad, plural } from '@/lib/utils'

// ── The homepage ────────────────────────────────────────────────────────────────

export function Home() {
  return (
    <>
      <Seo description={SITE.description} path={paths.home} jsonLd={[websiteJsonLd()]} />
      <Hero />
      <Cities />
      <Experiences />
      <Picks />
      <ForSpas />
      <Closing />
    </>
  )
}

// ── Hero ────────────────────────────────────────────────────────────────────────

const PHOTO = media('hero-palmeraie')
const PROMISES = ['Selected by editors', 'Rated by guests', 'Never paid for']
const DOORWAY = 'inset(24% 37% 0% 37% round 50vw 50vw 0px 0px)'
const OPEN = 'inset(0% 0% 0% 0% round 0vw 0vw 0px 0px)'

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const still = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section ref={ref} className="home-hero">
      <div className="container home-hero-inner">
        <motion.div className="home-hero-gate" initial={still ? false : { clipPath: DOORWAY }} animate={{ clipPath: OPEN }} transition={{ duration: 1.8, ease: [0.72, 0, 0.18, 1], delay: 0.1 }}>
          <motion.div className="home-hero-drift" style={still ? undefined : { y }}>
            <motion.picture className="home-hero-picture" initial={still ? false : { scale: 1.28 }} animate={{ scale: 1 }} transition={{ duration: 2.6, ease: EASE, delay: 0.1 }}>
              <img src={mediaUrl(PHOTO.id)} alt={PHOTO.alt} decoding="sync" fetchPriority="high" />
            </motion.picture>
          </motion.div>
        </motion.div>

        <motion.div className="home-hero-card" initial={still ? false : { opacity: 0, y: 56 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: EASE, delay: 0.9 }} >
          <Eyebrow>The guide to spas in Morocco</Eyebrow>
          <SplitHeading as="h1" className="h1 home-hero-title" delay={1.05}>
            Find your <em>perfect spa</em> in Morocco
          </SplitHeading>
          <SearchForm fields={['city', 'experience', 'budget', 'occasion']} submitLabel="Search" className="home-hero-form" />
          <ul className="home-hero-trust">
            {PROMISES.map((promise) => (
              <li key={promise}>
                <Khatam />
                {promise}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

// ── Discover by city ────────────────────────────────────────────────────────────

function Cities() {
  return (
    <section className="section home-cities" aria-labelledby="home-cities">
      <div className="container">
        <Intro
          id="home-cities"
          eyebrow="Five cities"
          title={
            <>
              Discover by <em>city</em>
            </>
          }
          lede="Every city bathes differently. Start with the one you are going to."
          action={<ArrowLink to={paths.cities}>All cities</ArrowLink>}
        />
      </div>

      <Stagger as="ul" className="home-cities-row" gap={0.11}>
        {CITIES.map((city) => {
          const stats = cityStats(city.id)
          return (
            <motion.li key={city.id} className="home-cities-item" variants={rise}>
              <Link to={paths.city(city.slug)} className="home-cities-link">
                <Door media={city.image} />
                <span className="home-cities-text">
                  <span className="home-cities-name">
                    {city.name}
                    <Icon name="arrow-right" />
                  </span>
                  <span className="home-cities-meta">
                    {plural(stats.count, 'spa')} · from {formatMad(stats.priceFrom)}
                  </span>
                </span>
              </Link>
            </motion.li>
          )
        })}
      </Stagger>
    </section>
  )
}

// ── Explore by experience ───────────────────────────────────────────────────────

function Experiences() {
  return (
    <section className="home-experiences" aria-labelledby="home-experiences">
      <div className="container home-experiences-inner">
        <Intro
          id="home-experiences"
          eyebrow="Six ways in"
          title={
            <>
              Explore by <em>experience</em>
            </>
          }
          lede="Start from what you want, in your own words."
          action={<ArrowLink to={paths.experiences}>All experiences</ArrowLink>}
        />

        <Stagger as="ul" className="home-experiences-list" gap={0.07}>
          {EXPERIENCES.map((experience) => (
            <motion.li key={experience.id} className="home-experiences-item" variants={rise}>
              <Link to={paths.experience(experience.slug)} className="home-experiences-link">
                <Door media={experience.image} drift={4} decorative className="home-experiences-thumb" />
                <span className="home-experiences-body">
                  <span className="home-experiences-name">{experience.name}</span>
                  <span className="voice home-experiences-words">“{experience.inTheirWords}”</span>
                  <span className="home-experiences-count">{plural(spasWithExperience(experience.id).length, 'spa')}</span>
                </span>
                <span className="home-experiences-go">
                  <Icon name="arrow-right" />
                </span>
              </Link>
            </motion.li>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

// ── This month’s picks ──────────────────────────────────────────────────────────

const PICKS = MONTHLY_PICKS.items.flatMap((item) => {
  const spa = getSpaById(item.spaId)
  return spa ? [{ spa: toCard(spa), whyNow: item.whyNow }] : []
})

function Picks() {
  const [lead, ...others] = PICKS
  if (!lead) return null

  return (
    <section className="section" aria-labelledby="home-picks">
      <div className="container">
        <Intro
          id="home-picks"
          eyebrow={`${MONTHLY_PICKS.month} ${MONTHLY_PICKS.year}`}
          title={
            <>
              This month’s <em>picks</em>
            </>
          }
          lede="The addresses our editors would book right now. They change every month and are never sold."
          action={<ArrowLink to={paths.spas()}>All spas</ArrowLink>}
        />

        <div className="home-picks-grid">
          <motion.article
            className="home-picks-lead"
            variants={stagger(0.14)}
            initial="hidden"
            whileInView="shown"
            viewport={VIEWPORT}
          >
            <Door media={lead.spa.image} ratio={4 / 3} drift={5} decorative />
            <motion.div className="home-picks-lead-body" variants={rise}>
              <p className="home-picks-pick">
                N° 1 <span>·</span> {MONTHLY_PICKS.month} picks
              </p>
              <h3 className="home-picks-lead-name">
                <Link to={paths.spa(lead.spa.slug)} className="home-picks-cover">
                  {lead.spa.name}
                </Link>
              </h3>
              <p className="home-picks-place">
                {lead.spa.neighbourhoodName}, {lead.spa.cityName} <span>· {lead.spa.typeLabel}</span>
              </p>
              <RatingInline rating={lead.spa.rating} showLabel />
              <p className="voice home-picks-why">{lead.whyNow}</p>
              <div className="home-picks-foot">
                <p className="home-picks-facts">
                  {lead.spa.signature.name} · {formatDuration(lead.spa.signature.durationMin)} · from{' '}
                  <b>{formatMad(lead.spa.priceFrom)}</b>
                </p>
                <span className="home-picks-cta" aria-hidden="true">
                  View spa
                  <Icon name="arrow-right" />
                </span>
              </div>
            </motion.div>
          </motion.article>

          <Stagger as="ol" className="home-picks-list" gap={0.12} delay={0.15}>
            {others.map(({ spa, whyNow }, index) => (
              <motion.li key={spa.id} className="home-picks-row" variants={rise}>
                <Door media={spa.leadImage} ratio={4 / 5} drift={4} decorative className="home-picks-thumb" />
                <div className="home-picks-row-body">
                  <p className="home-picks-pick">N° {index + 2}</p>
                  <h3 className="home-picks-name">
                    <Link to={paths.spa(spa.slug)} className="home-picks-cover">
                      {spa.name}
                    </Link>
                  </h3>
                  <p className="home-picks-place">
                    {spa.neighbourhoodName}, {spa.cityName}
                  </p>
                  <p className="voice home-picks-note">{whyNow}</p>
                  <RatingInline rating={spa.rating} />
                </div>
              </motion.li>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}

// ── Run a spa? ──────────────────────────────────────────────────────────────────

function ForSpas() {
  return (
    <section className="home-for-spas" aria-labelledby="home-for-spas">
      <div className="container">
        <motion.div
          className="on-dark home-for-spas-band"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="shown"
          viewport={VIEWPORT}
        >
          <motion.div className="home-for-spas-text" variants={rise}>
            <Eyebrow>For spa owners</Eyebrow>
            <h2 id="home-for-spas" className="home-for-spas-title">
              Run a spa? Be found by people <em>choosing one</em>.
            </h2>
            <p className="home-for-spas-line">Visibility, content and demand reports. Selection stays editorial.</p>
          </motion.div>
          <motion.div className="home-for-spas-action" variants={rise}>
            <Button to={paths.forSpas} variant="primary" arrow>
              For spas
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Closing search ──────────────────────────────────────────────────────────────

const ARCADE = media('door-arcade')
const GATE = media('door-gate')

function Closing() {
  return (
    <section className="section home-closing" aria-labelledby="home-closing">
      <div className="container home-closing-grid">
        <div className="home-closing-text">
          <Reveal>
            <Eyebrow>Still deciding</Eyebrow>
          </Reveal>
          <SplitHeading id="home-closing" className="display home-closing-title">
            Not sure yet? <em>Start with a city.</em>
          </SplitHeading>
          <Reveal delay={0.15}>
            <p className="lede">Tell us where you will be. We will show you who is worth the visit.</p>
          </Reveal>
          <Reveal delay={0.25} className="home-closing-form">
            <SearchForm fields={['city', 'experience']} submitLabel="Search spas" showCount />
          </Reveal>
        </div>

        <motion.div className="home-closing-doors" variants={stagger(0.2)} initial="hidden" whileInView="shown" viewport={VIEWPORT}>
          <Door media={ARCADE} drift={7} className="home-closing-tall" />
          <motion.div className="home-closing-small" variants={fade}>
            <Door media={GATE} drift={-5} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Section intro ───────────────────────────────────────────────────────────────

interface IntroProps {
  id: string
  eyebrow: string
  title: ReactNode
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
          {title}
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
