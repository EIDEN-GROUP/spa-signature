import { useCallback, useEffect, useRef, useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Picture } from '@/components/ui/Picture'
import type { Media } from '@/lib/types'

interface GalleryProps {
  images: Media[]
  /** Used in labels: "Photographs of …". */
  name: string
}

/** Which slide a horizontal scroller is showing. */
function useSlideIndex(count: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  const onScroll = useCallback(() => {
    const strip = ref.current
    if (!strip) return
    setIndex(Math.min(count - 1, Math.max(0, Math.round(strip.scrollLeft / strip.clientWidth))))
  }, [count])

  const goTo = useCallback((next: number, smooth = true) => {
    const strip = ref.current
    if (!strip) return
    strip.scrollTo({ left: next * strip.clientWidth, behavior: smooth ? 'smooth' : 'instant' })
  }, [])

  return { ref, index, onScroll, goTo }
}

/**
 * A handful of curated photographs. On a phone they swipe, one per screen,
 * with native momentum and no script in the gesture. On wide screens they
 * form a mosaic. Any photograph opens the full-screen viewer, where swipe,
 * arrow keys and pinch-zoom all work.
 */
export function Gallery({ images, name }: GalleryProps) {
  const strip = useSlideIndex(images.length)
  const viewer = useSlideIndex(images.length)
  const dialog = useRef<HTMLDialogElement>(null)
  const [openAt, setOpenAt] = useState<number | null>(null)

  useEffect(() => {
    const element = dialog.current
    if (!element) return
    if (openAt !== null && !element.open) {
      element.showModal()
      viewer.goTo(openAt, false)
    }
    if (openAt === null && element.open) element.close()
  }, [openAt, viewer])

  const close = () => {
    // Leave the page strip on the photograph the reader was last looking at.
    strip.goTo(viewer.index, false)
    setOpenAt(null)
  }

  const step = (delta: number) => viewer.goTo(Math.min(images.length - 1, Math.max(0, viewer.index + delta)))

  return (
    <div className="gallery">
      <div
        ref={strip.ref}
        className="gallery-strip"
        data-count={Math.min(images.length, 5)}
        onScroll={strip.onScroll}
        role="group"
        aria-roledescription="carousel"
        aria-label={`Photographs of ${name}`}
        tabIndex={0}
      >
        {images.map((image, index) => (
          <button
            key={`${image.id}-${index}`}
            type="button"
            className="gallery-slide"
            onClick={() => setOpenAt(index)}
            aria-label={`Open photograph ${index + 1} of ${images.length} full screen: ${image.alt}`}
          >
            <Picture
              media={image}
              priority={index === 0}
              className="gallery-picture"
              ratio="4 / 5"
            />
          </button>
        ))}
      </div>

      <div className="gallery-meta">
        <span className="gallery-counter" aria-hidden="true">
          {strip.index + 1} / {images.length}
        </span>
        <button type="button" className="gallery-all" onClick={() => setOpenAt(strip.index)}>
          <Icon name="expand" />
          <span>
            <span className="visually-hidden">View all </span>
            {images.length} photographs
          </span>
        </button>
      </div>

      <dialog
        ref={dialog}
        className="gallery-viewer"
        aria-label={`Photographs of ${name}`}
        onCancel={(event) => {
          event.preventDefault()
          close()
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') step(1)
          if (event.key === 'ArrowLeft') step(-1)
        }}
      >
        {openAt !== null ? (
          <>
            <div className="gallery-viewer-bar">
              <span aria-live="polite">
                {viewer.index + 1} / {images.length}
              </span>
              <button type="button" className="gallery-viewer-button" onClick={close}>
                <Icon name="close" />
                <span className="visually-hidden">Close photographs</span>
              </button>
            </div>
            <div ref={viewer.ref} className="gallery-viewer-strip" onScroll={viewer.onScroll}>
              {images.map((image, index) => (
                <figure key={`${image.id}-${index}`} className="gallery-viewer-slide">
                  <Picture media={image} className="gallery-viewer-picture" />
                  <figcaption>{image.alt}</figcaption>
                </figure>
              ))}
            </div>
            <div className="gallery-viewer-nav">
              <button type="button" className="gallery-viewer-button" onClick={() => step(-1)} disabled={viewer.index === 0}>
                <Icon name="arrow-left" />
                <span className="visually-hidden">Previous photograph</span>
              </button>
              <button
                type="button"
                className="gallery-viewer-button"
                onClick={() => step(1)}
                disabled={viewer.index === images.length - 1}
              >
                <Icon name="arrow-right" />
                <span className="visually-hidden">Next photograph</span>
              </button>
            </div>
          </>
        ) : null}
      </dialog>
    </div>
  )
}
