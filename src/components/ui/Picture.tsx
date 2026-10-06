import type { CSSProperties } from 'react'
import { mediaFallback, mediaFile, mediaSrcSet } from '../../data/media'
import type { Media } from '../../domain/types'
import { cx } from '../../lib/cx'
import styles from './Picture.module.css'

interface PictureProps {
  media: Media
  /** How wide the image is laid out, in CSS terms. The browser picks the file. */
  sizes: string
  /** Crop to this ratio, e.g. "4 / 3". Omit to keep the photograph's own shape. */
  ratio?: string
  /** Above the fold: load eagerly and at high priority. One per page. */
  priority?: boolean
  /** Decorative repeats of an image already described nearby. */
  decorative?: boolean
  /** Where to hold the crop, e.g. "50% 30%". */
  focus?: string
  className?: string
}

/**
 * A responsive photograph: AVIF with a WebP fallback, a width for every
 * screen, intrinsic dimensions so nothing shifts, and the image's own tone
 * painted behind it while it loads.
 */
export function Picture({ media, sizes, ratio, priority = false, decorative = false, focus, className }: PictureProps) {
  const file = mediaFile(media.id)
  const style = { '--tone': file.tone, ...(ratio ? { aspectRatio: ratio } : {}) } as CSSProperties

  return (
    <picture className={cx(styles.frame, ratio && styles.cropped, className)} style={style}>
      <source type="image/avif" srcSet={mediaSrcSet(media.id, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={mediaSrcSet(media.id, 'webp')} sizes={sizes} />
      <img
        src={mediaFallback(media.id)}
        width={file.width}
        height={file.height}
        alt={decorative ? '' : media.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        style={focus ? { objectPosition: focus } : undefined}
      />
    </picture>
  )
}
