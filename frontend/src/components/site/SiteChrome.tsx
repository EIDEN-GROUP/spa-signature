import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { Logo } from '@/components/site/Logo'
import { SearchOverlay } from '@/components/site/SearchOverlay'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { Sheet } from '@/components/ui/Sheet'
import { useHistorySheet } from '@/hooks/use-history-sheet'
import { CITIES, cityStats, EXPERIENCES, TOTALS } from '@/lib/data'
import { EASE } from '@/lib/motion'
import { paths } from '@/lib/paths'
import { SITE } from '@/lib/site'
import { cx } from '@/lib/utils'

// ── Header ──────────────────────────────────────────────────────────────────────

const MAIN_NAV = [
  { to: paths.spas(), label: 'Discover' },
  { to: paths.cities, label: 'Cities' },
  { to: paths.experiences, label: 'Experiences' },
]

export function SiteHeader() {
  const menu = useHistorySheet('menu')
  const search = useHistorySheet('search')
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [raised, setRaised] = useState(false)
  const link = ({ isActive }: { isActive: boolean }) => cx('site-header-link', isActive && 'site-header-current')

  // Steps aside on the way down the page, returns on the way up.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setRaised(latest > 8)
    if (Math.abs(latest - previous) > 3) setHidden(latest > 320 && latest > previous)
  })

  return (
    <motion.header
      className={cx('site-header', raised && 'site-header-raised')}
      initial={{ y: '-100%' }}
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.55, ease: EASE }}
      onFocusCapture={() => setHidden(false)}
    >
      <div className="container site-header-bar">
        <button type="button" className="site-header-tool site-header-menu-button" onClick={menu.show} aria-haspopup="dialog">
          <Icon name="menu" />
          <span className="visually-hidden">Menu</span>
        </button>

        <Link to={paths.home} className="site-header-brand">
          <Logo className="site-header-logo" />
        </Link>

        <nav className="site-header-nav" aria-label="Main">
          {MAIN_NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={link}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header-tools">
          <button type="button" className="site-header-tool site-header-search-button" onClick={search.show} aria-haspopup="dialog">
            <Icon name="search" />
            <span className="visually-hidden">Search</span>
          </button>
          <Button to={paths.forSpas} className="site-header-for-spas">
            For spas
          </Button>
        </div>
      </div>

      <MobileMenu open={menu.open} onClose={menu.hide} />
      <SearchOverlay open={search.open} onClose={search.hide} />
    </motion.header>
  )
}

// ── Mobile menu ─────────────────────────────────────────────────────────────────

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <Sheet open={open} onClose={onClose} title="Menu" variant="cover" hideTitle>
      <nav className="mobile-menu" aria-label="Menu">
        <ul className="mobile-menu-primary">
          <li>
            <Link to={paths.spas()} replace>
              <span>All spas</span>
              <span className="mobile-menu-count">{TOTALS.spas}</span>
            </Link>
          </li>
          <li>
            <Link to={paths.cities} replace>
              <span>Cities</span>
              <Icon name="arrow-right" />
            </Link>
          </li>
          <li>
            <Link to={paths.experiences} replace>
              <span>Experiences</span>
              <Icon name="arrow-right" />
            </Link>
          </li>
        </ul>

        <div className="mobile-menu-columns">
          <section aria-labelledby="menu-cities">
            <h3 id="menu-cities" className="label">
              By city
            </h3>
            <ul>
              {CITIES.map((city) => (
                <li key={city.id}>
                  <Link to={paths.city(city.slug)} replace>
                    {city.name}
                    <span className="mobile-menu-small">{cityStats(city.id).count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="menu-experiences">
            <h3 id="menu-experiences" className="label">
              By experience
            </h3>
            <ul>
              {EXPERIENCES.map((experience) => (
                <li key={experience.id}>
                  <Link to={paths.experience(experience.slug)} replace>
                    {experience.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <ul className="mobile-menu-secondary">
          <li>
            <Link to={paths.forSpas} replace>
              For spas
            </Link>
          </li>
        </ul>

        <p className="mobile-menu-motto">Selected by editors. Rated by guests. Never paid for.</p>
      </nav>
    </Sheet>
  )
}

// ── Footer ──────────────────────────────────────────────────────────────────────

export function SiteFooter() {
  return (
    <footer className="on-dark site-footer">
      <Reveal className="container site-footer-top">
        <div className="site-footer-brand">
          <Logo className="site-footer-logo" />
          <p className="site-footer-motto" lang="fr">
            La sélection se mérite.
            <br />
            La visibilité s’achète.
          </p>
          <p className="site-footer-gloss">Selection is earned. Visibility is bought. The two never touch.</p>
        </div>

        <nav className="site-footer-links" aria-label="Footer">
          <section aria-labelledby="footer-discover">
            <h2 id="footer-discover" className="label">
              Discover
            </h2>
            <ul>
              <li>
                <Link to={paths.spas()}>All spas</Link>
              </li>
              <li>
                <Link to={`${paths.home}#home-picks`}>This month’s picks</Link>
              </li>
              <li>
                <Link to={paths.spas({ types: ['traditional-hammam'] })}>Traditional hammams</Link>
              </li>
            </ul>
          </section>
          <section aria-labelledby="footer-cities">
            <h2 id="footer-cities" className="label">
              Cities
            </h2>
            <ul>
              {CITIES.map((city) => (
                <li key={city.id}>
                  <Link to={paths.city(city.slug)}>{city.name}</Link>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="footer-experiences">
            <h2 id="footer-experiences" className="label">
              Experiences
            </h2>
            <ul>
              {EXPERIENCES.map((experience) => (
                <li key={experience.id}>
                  <Link to={paths.experience(experience.slug)}>{experience.name}</Link>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="footer-about">
            <h2 id="footer-about" className="label">
              About
            </h2>
            <ul>
              <li>
                <Link to={paths.forSpas}>For spas</Link>
              </li>
              <li>
                <a href={`mailto:${SITE.email.editors}`}>Write to the editors</a>
              </li>
              <li>
                <a href={`mailto:${SITE.email.corrections}?subject=${encodeURIComponent('Correction')}`}>Report an error</a>
              </li>
            </ul>
          </section>
        </nav>
      </Reveal>

      <div className="container site-footer-base">
        <p>
          © {SITE.edition} {SITE.name} · {SITE.publisher}
        </p>
        <p>Demonstration edition: the spas, ratings and prices shown are illustrative.</p>
      </div>
    </footer>
  )
}
