import { getCity, neighbourhoodOf, priceRange, signatureTreatment } from '@/lib/data'
import { SCHEMA_DAY } from '@/lib/hours'
import { mediaUrl } from '@/lib/media'
import { summarise } from '@/lib/rating'
import { SITE } from '@/lib/site'
import { DISTINCTIONS, FACILITIES, LANGUAGES } from '@/lib/taxonomy'
import type { EditorialArticle, Faq, Spa, Weekday } from '@/lib/types'
import { formatMad } from '@/lib/utils'

// Structured data builders. Pages pass these to <Seo jsonLd={[…]}>.
//
// Only public facts go in: the guest rating (never below ten reviews), the
// distinction as an award, verified contact details and hours.

export type JsonLd = Record<string, unknown>

export const absoluteUrl = (path: string) => `${SITE.url}${path === '/' ? '' : path}`

const ORGANISATION = {
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/icon-512.png`,
}

export function websiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    inLanguage: SITE.locale,
    publisher: ORGANISATION,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/spas?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function itemListJsonLd(name: string, spas: Pick<Spa, 'name' | 'slug'>[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: spas.length,
    itemListElement: spas.map((spa, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: spa.name,
      url: absoluteUrl(`/spa/${spa.slug}`),
    })),
  }
}

export function faqJsonLd(faq: Faq[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function spaJsonLd(spa: Spa): JsonLd {
  const city = getCity(spa.cityId)
  const rating = summarise(spa.rating)
  const range = priceRange(spa)
  const signature = signatureTreatment(spa)
  const days = Object.keys(spa.hours.weekly) as Weekday[]

  return {
    '@context': 'https://schema.org',
    '@type': 'DaySpa',
    '@id': absoluteUrl(`/spa/${spa.slug}`),
    name: spa.name,
    description: spa.descriptor,
    url: absoluteUrl(`/spa/${spa.slug}`),
    image: spa.media.gallery.map((item) => `${SITE.url}${mediaUrl(item.id)}`),
    telephone: spa.contact.phone,
    ...(spa.contact.website ? { sameAs: [spa.contact.website] } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: spa.contact.address.street,
      addressLocality: city.name,
      postalCode: spa.contact.address.postalCode,
      addressCountry: 'MA',
    },
    areaServed: neighbourhoodOf(spa).name,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: spa.contact.coordinates.lat,
      longitude: spa.contact.coordinates.lng,
    },
    openingHoursSpecification: days
      .filter((day) => spa.hours.weekly[day])
      .map((day) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${SCHEMA_DAY[day]}`,
        opens: spa.hours.weekly[day]?.open,
        closes: spa.hours.weekly[day]?.close,
      })),
    priceRange: `${formatMad(range.min)} to ${formatMad(range.max)}`,
    currenciesAccepted: 'MAD',
    paymentAccepted: spa.practical.payment.join(', '),
    knowsLanguage: spa.languages.map((code) => LANGUAGES[code]),
    amenityFeature: spa.facilities.map((id) => ({
      '@type': 'LocationFeatureSpecification',
      name: FACILITIES.find((f) => f.id === id)?.name,
      value: true,
    })),
    makesOffer: {
      '@type': 'Offer',
      name: signature.name,
      price: signature.priceMad,
      priceCurrency: 'MAD',
    },
    // The guest rating, only once ten reviews support it.
    ...(rating.average !== null
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: rating.average,
            reviewCount: rating.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    // The editorial distinction, as the award it is.
    ...(spa.selection
      ? { award: `${SITE.name} ${spa.selection.year}: ${DISTINCTIONS[spa.selection.level].name}` }
      : {}),
  }
}

export function articleJsonLd(article: EditorialArticle): JsonLd {
  const image = mediaUrl(article.image.id)
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.dek,
    image: [`${SITE.url}${image}`],
    datePublished: article.publishedOn,
    dateModified: article.updatedOn,
    author: ORGANISATION,
    publisher: ORGANISATION,
    mainEntityOfPage: absoluteUrl(`/guides/${article.slug}`),
  }
}
