import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Logo } from '@/components/site/Logo'
import { SearchOverlay } from '@/components/site/SearchOverlay'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { Sheet } from '@/components/ui/Sheet'
import { useHistorySheet } from '@/hooks/use-history-sheet'
import { SITE_LANGUAGES, useLanguage, useT } from '@/hooks/use-language'
import { useRevealed } from '@/hooks/use-revealed'
import { CITIES, cityStats, EXPERIENCES, TOTALS } from '@/lib/data'
import { EASE } from '@/lib/motion'
import { paths } from '@/lib/paths'
import { SITE } from '@/lib/site'
import { cx } from '@/lib/utils'

// ── Header ──────────────────────────────────────────────────────────────────────

export function SiteHeader() {
  const t = useT()
  const menu = useHistorySheet('menu')
  const search = useHistorySheet('search')
  const { pathname } = useLocation()
  const revealed = useRevealed()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [raised, setRaised] = useState(false)
  const [arrived, setArrived] = useState(false)
  const link = ({ isActive }: { isActive: boolean }) => cx('site-header-link', isActive && 'site-header-current')

  // At the top of the homepage the bar lies clear over the photograph, in linen.
  const over = pathname === paths.home && !raised

  // Steps aside on the way down the page, returns on the way up.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setRaised(latest > 24)
    if (Math.abs(latest - previous) > 3) setHidden(latest > 320 && latest > previous)
  })

  return (
    <motion.header
      className={cx('site-header', raised && 'site-header-raised', over && 'site-header-over')}
      initial={{ y: '-120%' }}
      animate={{ y: hidden || !revealed ? '-120%' : '0%' }}
      transition={{ duration: 0.7, ease: EASE, delay: arrived ? 0 : 0.6 }}
      onAnimationComplete={() => {
        if (revealed) setArrived(true)
      }}
      onFocusCapture={() => setHidden(false)}
    >
      {/* Links to the left, the name in the middle, the two actions to the right. */}
      <div className="site-header-bar">
        <button type="button" className="site-header-tool site-header-menu-button" onClick={menu.show} aria-haspopup="dialog">
          <Icon name="menu" />
          <span className="visually-hidden">{t.nav.menu}</span>
        </button>

        <nav className="site-header-nav" aria-label={t.nav.main}>
          <NavLink to={paths.spas()} className={link}>
            {t.nav.discover}
          </NavLink>
          <NavLink to={paths.cities} className={link}>
            {t.nav.cities}
          </NavLink>
          <NavLink to={paths.experiences} className={link}>
            {t.nav.experiences}
          </NavLink>
        </nav>

        <Link to={paths.home} className="site-header-brand">
          <Logo className="site-header-logo" />
        </Link>

        <div className="site-header-tools">
          <LanguageSwitch className="site-header-language" />
          <NavLink to={paths.forSpas} className={(state) => cx(link(state), 'site-header-for-spas')}>
            {t.nav.forSpas}
          </NavLink>
          <button type="button" className="site-header-tool site-header-search-button" onClick={search.show} aria-haspopup="dialog">
            <Icon name="search" />
            <span className="site-header-search-label">{t.nav.search}</span>
          </button>
        </div>
      </div>

      <MobileMenu open={menu.open} onClose={menu.hide} />
      <SearchOverlay open={search.open} onClose={search.hide} />
    </motion.header>
  )
}

// ── Language ────────────────────────────────────────────────────────────────────

function LanguageSwitch({ className }: { className?: string }) {
  const t = useT()
  const { language, setLanguage } = useLanguage()

  return (
    <div className={cx('language-switch', className)} role="group" aria-label={t.nav.language}>
      {SITE_LANGUAGES.map(({ code, name }) => (
        <button
          key={code}
          type="button"
          lang={code}
          className={cx('language-switch-choice', code === language && 'language-switch-current')}
          aria-pressed={code === language}
          onClick={() => setLanguage(code)}
        >
          <span aria-hidden="true">{code.toUpperCase()}</span>
          <span className="visually-hidden">{name}</span>
        </button>
      ))}
    </div>
  )
}

// ── Mobile menu ─────────────────────────────────────────────────────────────────

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

function MobileMenu({ open, onClose }: MobileMenuProps) {
  const t = useT()

  return (
    <Sheet open={open} onClose={onClose} title={t.nav.menu} variant="cover" hideTitle>
      <nav className="mobile-menu" aria-label={t.nav.menu}>
        <ul className="mobile-menu-primary">
          <li>
            <Link to={paths.spas()} replace>
              <span>{t.menu.allSpas}</span>
              <span className="mobile-menu-count">{TOTALS.spas}</span>
            </Link>
          </li>
          <li>
            <Link to={paths.cities} replace>
              <span>{t.nav.cities}</span>
              <Icon name="arrow-right" />
            </Link>
          </li>
          <li>
            <Link to={paths.experiences} replace>
              <span>{t.nav.experiences}</span>
              <Icon name="arrow-right" />
            </Link>
          </li>
        </ul>

        <div className="mobile-menu-columns">
          <section aria-labelledby="menu-cities">
            <h3 id="menu-cities" className="label">
              {t.menu.byCity}
            </h3>
            <ul>
              {CITIES.map((city) => (
                <li key={city.id}>
                  <Link to={paths.city(city.slug)} replace>
                    {t.cities.byId[city.id].name}
                    <span className="mobile-menu-small">{cityStats(city.id).count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="menu-experiences">
            <h3 id="menu-experiences" className="label">
              {t.menu.byExperience}
            </h3>
            <ul>
              {EXPERIENCES.map((experience) => (
                <li key={experience.id}>
                  <Link to={paths.experience(experience.slug)} replace>
                    {t.experiences.byId[experience.id].name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <ul className="mobile-menu-secondary">
          <li>
            <Link to={paths.forSpas} replace>
              {t.nav.forSpas}
            </Link>
          </li>
          <li>
            <LanguageSwitch />
          </li>
        </ul>

        <p className="mobile-menu-motto">{t.menu.motto}</p>
      </nav>
    </Sheet>
  )
}

// ── Footer ──────────────────────────────────────────────────────────────────────

export function SiteFooter() {
  const t = useT()

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
          <p className="site-footer-gloss">{t.footer.gloss}</p>
        </div>

        <nav className="site-footer-links" aria-label={t.footer.label}>
          <section aria-labelledby="footer-discover">
            <h2 id="footer-discover" className="label">
              {t.footer.discover}
            </h2>
            <ul>
              <li>
                <Link to={paths.spas()}>{t.footer.allSpas}</Link>
              </li>
              <li>
                <Link to={`${paths.home}#home-picks`}>{t.footer.picks}</Link>
              </li>
              <li>
                <Link to={paths.spas({ types: ['traditional-hammam'] })}>{t.footer.hammams}</Link>
              </li>
            </ul>
          </section>
          <section aria-labelledby="footer-cities">
            <h2 id="footer-cities" className="label">
              {t.footer.cities}
            </h2>
            <ul>
              {CITIES.map((city) => (
                <li key={city.id}>
                  <Link to={paths.city(city.slug)}>{t.cities.byId[city.id].name}</Link>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="footer-experiences">
            <h2 id="footer-experiences" className="label">
              {t.footer.experiences}
            </h2>
            <ul>
              {EXPERIENCES.map((experience) => (
                <li key={experience.id}>
                  <Link to={paths.experience(experience.slug)}>{t.experiences.byId[experience.id].name}</Link>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="footer-about">
            <h2 id="footer-about" className="label">
              {t.footer.about}
            </h2>
            <ul>
              <li>
                <Link to={paths.forSpas}>{t.footer.forSpas}</Link>
              </li>
              <li>
                <a href={`mailto:${SITE.email.editors}`}>{t.footer.write}</a>
              </li>
              <li>
                <a href={`mailto:${SITE.email.corrections}?subject=${encodeURIComponent(t.footer.correction)}`}>{t.footer.report}</a>
              </li>
            </ul>
          </section>
        </nav>
      </Reveal>

      <div className="container site-footer-base">
        <p>
          © {SITE.edition} {SITE.name} · {SITE.publisher}
        </p>
        <p>{t.footer.demo}</p>
      </div>
    </footer>
  )
}
