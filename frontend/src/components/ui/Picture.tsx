import type { Media } from '@/lib/types'
import { cx } from '@/lib/utils'

interface PictureProps {
  media: Media
  ratio?: string
  priority?: boolean
  decorative?: boolean
  focus?: string
  className?: string
}

export function Picture({
  media,
  ratio,
  priority = false,
  decorative = false,
  focus,
  className,
}: PictureProps) {
  const isVideo = media.type === 'video'

  return (
    <picture className={cx('picture', ratio && 'picture-cropped', className)} style={ratio ? { aspectRatio: ratio } : undefined}>
      {isVideo ? (
        <video
          src={media.src}
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? 'auto' : 'metadata'}
          aria-label={decorative ? undefined : media.alt}
          style={{
            objectPosition: focus ?? media.focus ?? '50% 50%',
          }}
        />
      ) : (
        <img
          src={media.src}
          alt={decorative ? '' : media.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          style={{
            objectPosition: focus ?? media.focus ?? '50% 50%',
          }}
        />
      )}
    </picture>
  )
}