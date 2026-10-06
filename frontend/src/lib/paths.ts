import { type Filters, filtersToSearch } from '@/lib/filters'

/** Every address in the product, in one place. */
export const paths = {
  home: '/',
  spas: (filters?: Partial<Filters>) => `/spas${filters ? filtersToSearch(filters) : ''}`,
  spa: (slug: string) => `/spa/${slug}`,
  selection: '/selection',
  method: '/method',
  forSpas: '/for-spas',
  cities: '/cities',
  city: (slug: string) => `/cities/${slug}`,
  experiences: '/experiences',
  experience: (slug: string) => `/experiences/${slug}`,
  guides: '/guides',
  guide: (slug: string) => `/guides/${slug}`,
} as const
