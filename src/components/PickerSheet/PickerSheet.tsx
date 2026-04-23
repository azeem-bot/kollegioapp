import { useEffect, useRef, useState } from 'react'
import type { PickerOption } from '../../types/picker'
import './PickerSheet.css'

type Props = {
  title: string
  options: PickerOption[]
  searchable?: boolean
  searchPlaceholder?: string
  multiSelect?: boolean
  value: string | string[]
  onChange: (value: string | string[]) => void
  isOpen: boolean
  onClose: () => void
}

export default function PickerSheet({
  title,
  options,
  searchable = true,
  searchPlaceholder = 'Search...',
  multiSelect = false,
  value,
  onChange,
  isOpen,
  onClose,
}: Props) {
  const [isVisible, setIsVisible] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [query, setQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const focusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleViewportResize = () => {
      if (!window.visualViewport) return
      const sheet = sheetRef.current
      if (!sheet) return
      sheet.style.height = `${window.visualViewport.height}px`
      sheet.style.top = `${window.visualViewport.offsetTop}px`
      sheet.style.bottom = 'auto'
    }

    const resetSheet = () => {
      const sheet = sheetRef.current
      if (!sheet) return
      sheet.style.height = ''
      sheet.style.top = ''
      sheet.style.bottom = ''
    }

    if (isOpen) {
      window.visualViewport?.addEventListener('resize', handleViewportResize)
      window.visualViewport?.addEventListener('scroll', handleViewportResize)
    } else {
      resetSheet()
    }

    return () => {
      window.visualViewport?.removeEventListener('resize', handleViewportResize)
      window.visualViewport?.removeEventListener('scroll', handleViewportResize)
      resetSheet()
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      // Next frame to allow mount before triggering transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsSheetOpen(true))
      })
      focusTimerRef.current = setTimeout(() => {
        searchRef.current?.focus()
      }, 350)
    } else {
      setIsSheetOpen(false)
      setQuery('')
      setIsExpanded(false)
      closeTimerRef.current = setTimeout(() => {
        setIsVisible(false)
      }, 250)
    }

    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
      if (focusTimerRef.current) clearTimeout(focusTimerRef.current)
    }
  }, [isOpen])

  const selectedIds = Array.isArray(value) ? value : value ? [value] : []

  const filtered = query.trim()
    ? options.filter((o) =>
        o.label.toLowerCase().includes(query.trim().toLowerCase())
      )
    : options

  function handleOptionClick(id: string) {
    if (multiSelect) {
      const next = selectedIds.includes(id)
        ? selectedIds.filter((v) => v !== id)
        : [...selectedIds, id]
      onChange(next)
    } else {
      onChange(id)
    }
  }

  function handleDone() {
    onClose()
  }

  if (!isVisible) return null

  return (
    <>
      <div
        className={`backdrop${isSheetOpen ? ' backdrop--visible' : ''}`}
        onClick={onClose}
      />
      <div ref={sheetRef} className={`sheet${isSheetOpen ? ' sheet--open' : ''}${isExpanded ? ' sheet--expanded' : ''}`}>
        <span className="drag-handle" />

        <div className="header">
          <p className="header__title">{title}</p>
          <button className="header__close" onClick={onClose} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <line x1="6" y1="6" x2="18" y2="18" stroke="var(--content-primary)" strokeWidth="2" strokeLinecap="round" />
              <line x1="18" y1="6" x2="6" y2="18" stroke="var(--content-primary)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {searchable && (
          <div className="search-wrap">
            <input
              ref={searchRef}
              className="search-wrap__input"
              type="text"
              placeholder={searchPlaceholder}
              value={query}
              onChange={(e) => {
                const next = e.target.value
                if (next.length === 1 && query.length === 0) setIsExpanded(true)
                if (next.length === 0) setIsExpanded(false)
                setQuery(next)
              }}
            />
            <svg
              className="search-wrap__icon"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <circle cx="9" cy="9" r="6" stroke="var(--content-secondary)" strokeWidth="2" />
              <line x1="13" y1="13" x2="17" y2="17" stroke="var(--content-secondary)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        )}

        <div className="option-list">
          {filtered.length === 0 ? (
            <p className="empty-state">No results for &ldquo;{query}&rdquo;</p>
          ) : (
            filtered.map((option) => {
              const selected = selectedIds.includes(option.id)
              return (
                <div
                  key={option.id}
                  className="option-row"
                  onClick={() => handleOptionClick(option.id)}
                >
                  <div className="option-row__left">
                    {option.icon != null && (
                      <span className="option-row__icon">{option.icon}</span>
                    )}
                    <div className="option-row__text">
                      <div className="option-row__label">{option.label}</div>
                      {option.meta && (
                        <div className="option-row__meta">{option.meta}</div>
                      )}
                    </div>
                  </div>

                  {multiSelect ? (
                    <div
                      className={`option-row__checkbox${selected ? ' option-row__checkbox--checked' : ''}`}
                    >
                      {selected && (
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M3 8 L6.5 11.5 L13 5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  ) : (
                    selected && (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M4 10 L8 14 L16 6"
                          stroke="var(--bg-g1)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )
                  )}
                </div>
              )
            })
          )}
        </div>

        {multiSelect && (
          <div className="footer">
            <button className="footer__done" onClick={handleDone}>
              {selectedIds.length === 0 ? 'Done' : `Done (${selectedIds.length})`}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
