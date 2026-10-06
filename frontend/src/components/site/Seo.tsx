import { absoluteUrl, type JsonLd } from '@/lib/seo'
import { SITE } from '@/lib/site'

interface SeoProps {
  title?: string
  description: string
  path: string
  image?: string | null
  type?: 'website' | 'article'
  noindex?: boolean
  jsonLd?: JsonLd[]
}

export function Seo({ title, description, path, image, type = 'website', noindex = false, jsonLd = [] }: SeoProps) {
  const fullTitle = title ? `${title} · ${SITE.name}` : `${SITE.name} · ${SITE.tagline}`
  const url = absoluteUrl(path)
  const social = `${SITE.url}${image ?? '/brand/og-default.jpg'}`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex ? <meta name="robots" content="noindex, follow" /> : null}
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title ?? SITE.name} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={social} />
      <meta property="og:locale" content="en_GB" />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          // Escaped so a "</script>" inside any text can never close the tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  )
}
