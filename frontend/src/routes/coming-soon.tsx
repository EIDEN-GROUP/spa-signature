import { Seo } from '@/components/site/Seo'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Khatam'
import { Reveal } from '@/components/ui/Reveal'
import { paths } from '@/lib/paths'

/** Stands in for every page that is not built yet, so no link leads nowhere. */
export function ComingSoon() {
  return (
    <section className="container coming-soon">
      <Seo title="Coming soon" description="This part of the guide is on its way." path={paths.home} noindex />
      <Reveal className="coming-soon-text">
        <Eyebrow>On its way</Eyebrow>
        <h1 className="h1">
          This door opens <em>soon</em>.
        </h1>
        <p className="lede">We are still preparing this part of the guide. The homepage is ready to explore.</p>
        <Button to={paths.home} variant="primary" icon="arrow-left">
          Back to the homepage
        </Button>
      </Reveal>
    </section>
  )
}
