import { Seo } from '@/components/site/Seo'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Khatam'
import { Reveal } from '@/components/ui/Reveal'
import { Rich } from '@/components/ui/Rich'
import { useT } from '@/hooks/use-language'
import { paths } from '@/lib/paths'

/** Stands in for every page that is not built yet, so no link leads nowhere. */
export function ComingSoon() {
  const t = useT()

  return (
    <section className="container coming-soon">
      <Seo title={t.comingSoon.title} description={t.comingSoon.description} path={paths.home} noindex />
      <Reveal className="coming-soon-text">
        <Eyebrow>{t.comingSoon.eyebrow}</Eyebrow>
        <h1 className="h1">
          <Rich text={t.comingSoon.heading} />
        </h1>
        <p className="lede">{t.comingSoon.lede}</p>
        <Button to={paths.home} variant="primary" icon="arrow-left">
          {t.comingSoon.back}
        </Button>
      </Reveal>
    </section>
  )
}
