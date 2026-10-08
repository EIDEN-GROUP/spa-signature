import { type CSSProperties, type KeyboardEvent, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '@/components/ui/Icon'
import { cx } from '@/lib/utils'

interface SelectProps {
  id: string
  labelledBy: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}

const GAP = 8
const EDGE = 12
const ROW = 46
const FRAME = 18

function placeUnder(anchor: HTMLElement, count: number) {
  const box = anchor.getBoundingClientRect()
  const wide = document.documentElement.clientWidth
  const tall = window.innerHeight
  const below = tall - box.bottom - GAP - EDGE
  const above = box.top - GAP - EDGE
  const half = Math.ceil(count / 2)
  const fits = count * ROW + FRAME <= below
  const split = !fits && half * ROW + FRAME <= below && wide >= 480
  const up = !fits && !split && above > below
  const rows = split ? half : count
  const style: CSSProperties & { '--rows': number } = {
    '--rows': rows,
    minWidth: box.width,
    maxHeight: Math.max(160, up ? above : below),
    ...(box.left + box.width / 2 > wide / 2 ? { right: Math.max(EDGE, wide - box.right) } : { left: Math.max(EDGE, box.left) }),
    ...(up ? { bottom: tall - box.top + GAP } : { top: box.bottom + GAP }),
  }
  return { rows, style }
}

export function Select({ id, labelledBy, value, options, onChange }: SelectProps) {
  const button = useRef<HTMLButtonElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const typed = useRef({ text: '', at: 0 })
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [place, setPlace] = useState<{ rows: number; style: CSSProperties }>({ rows: 1, style: {} })
  const chosen = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  )
  const last = options.length - 1

  const show = (index = chosen) => {
    const anchor = button.current?.parentElement
    if (anchor) setPlace(placeUnder(anchor, options.length))
    setActive(index)
    setOpen(true)
  }

  const pick = (index: number) => {
    onChange(options[index].value)
    setOpen(false)
    button.current?.focus()
  }

  useEffect(() => {
    if (!open) return
    const close = (event: Event) => {
      if (event.target !== list.current) setOpen(false)
    }
    const away = (event: PointerEvent) => {
      const target = event.target as Node
      if (!button.current?.contains(target) && !list.current?.contains(target)) setOpen(false)
    }
    window.addEventListener('scroll', close, { capture: true, passive: true })
    window.addEventListener('resize', close)
    document.addEventListener('pointerdown', away)
    return () => {
      window.removeEventListener('scroll', close, { capture: true })
      window.removeEventListener('resize', close)
      document.removeEventListener('pointerdown', away)
    }
  }, [open])

  useEffect(() => {
    if (open) list.current?.children[active]?.scrollIntoView({ block: 'nearest' })
  }, [open, active])

  const move = (by: number) => setActive((index) => (index + by < 0 || index + by > last ? index : index + by))

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault()
        if (open) move(event.key === 'ArrowDown' ? 1 : -1)
        else show()
        return
      case 'ArrowRight':
      case 'ArrowLeft':
        if (!open || place.rows > last) return
        event.preventDefault()
        move(event.key === 'ArrowRight' ? place.rows : -place.rows)
        return
      case 'Home':
      case 'End':
        if (!open) return
        event.preventDefault()
        setActive(event.key === 'Home' ? 0 : last)
        return
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (open) pick(active)
        else show()
        return
      case 'Escape':
        if (!open) return
        event.preventDefault()
        setOpen(false)
        return
      case 'Tab':
        setOpen(false)
        return
    }
    if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) return
    const now = Date.now()
    const text = (now - typed.current.at < 600 ? typed.current.text : '') + event.key.toLowerCase()
    typed.current = { text, at: now }
    const found = options.findIndex((option) => option.label.toLowerCase().startsWith(text))
    if (found < 0) return
    if (open) setActive(found)
    else show(found)
  }

  return (
    <>
      <button
        ref={button}
        id={id}
        type="button"
        role="combobox"
        className="select-button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby={`${labelledBy} ${id}`}
        aria-activedescendant={open ? `${id}-${active}` : undefined}
        onClick={(event) => {
          if (event.detail === 0) return
          if (open) setOpen(false)
          else show()
        }}
        onKeyDown={onKeyDown}
      >
        {options[chosen]?.label}
      </button>
      {open
        ? createPortal(
            <ul ref={list} id={`${id}-list`} role="listbox" aria-labelledby={labelledBy} className="select-list" style={place.style} data-lenis-prevent>
              {options.map((option, index) => (
                <li
                  key={option.value}
                  id={`${id}-${index}`}
                  role="option"
                  aria-selected={index === chosen}
                  className={cx('select-option', index === active && 'select-active', index === chosen && 'select-chosen')}
                  onPointerEnter={() => setActive(index)}
                  onClick={() => pick(index)}
                >
                  <span>{option.label}</span>
                  <Icon name="check" />
                </li>
              ))}
            </ul>,
            document.body,
          )
        : null}
    </>
  )
}
