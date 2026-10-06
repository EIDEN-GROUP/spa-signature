import { mediaFocus, mediaUrl } from '@/lib/media'
import type { Media } from '@/lib/types'
import { cx } from '@/lib/utils'

interface PictureProps {
  media: Media
  /** Crop to this ratio, e.g. "4 / 3". Omit to keep the photograph's own shape. */
  ratio?: string
  /** Above the fold: load eagerly and at high priority. One per page. */
  priority?: boolean
  /** Decorative repeats of an image already described nearby. */
  decorative?: boolean
  /** Where to hold the crop, e.g. "50% 30%". Defaults to the photograph's focal point. */
  focus?: string
  className?: string
}

/** A photograph from src/assets, cropped with CSS when a ratio is given. */
export function Picture({ media, ratio, priority = false, decorative = false, focus, className }: PictureProps) {
  return (
    <picture className={cx('picture', ratio && 'picture-cropped', className)} style={ratio ? { aspectRatio: ratio } : undefined}>
      <img
        src={mediaUrl(media.id)}
        alt={decorative ? '' : media.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        style={{ objectPosition: focus ?? mediaFocus(media.id) }}
      />
    </picture>
  )
}
