import { useState } from 'react'
import type { PickerOption } from '../../types/picker'
import PickerSheet from '../PickerSheet/PickerSheet'
import './PickerTrigger.css'

type Props = {
  /** Section label rendered above the trigger (e.g. "COUNTRY") */
  sectionLabel: string
  /** Sheet title */
  title: string
  /** Placeholder shown when nothing is selected */
  placeholder: string
  options: PickerOption[]
  searchable?: boolean
  searchPlaceholder?: string
  multiSelect?: boolean
  value: string | string[]
  onChange: (value: string | string[]) => void
}

export default function PickerTrigger({
  sectionLabel,
  title,
  placeholder,
  options,
  searchable = true,
  searchPlaceholder,
  multiSelect = false,
  value,
  onChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedIds = Array.isArray(value) ? value : value ? [value] : []
  const isEmpty = selectedIds.length === 0

  const selectedOption = !multiSelect && selectedIds.length > 0
    ? options.find((o) => o.id === selectedIds[0]) ?? null
    : null

  const visibleTags = multiSelect ? selectedIds.slice(0, 2) : []
  const overflowCount = multiSelect ? Math.max(0, selectedIds.length - 2) : 0

  function handleChange(next: string | string[]) {
    onChange(next)
    if (!multiSelect) setIsOpen(false)
  }

  return (
    <>
      <div className="picker-field">
        <span className="picker-field__label">{sectionLabel}</span>
        <button
          type="button"
          className="picker-trigger"
          onClick={() => setIsOpen(true)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <div className="picker-trigger__content">
            {isEmpty && (
              <span className="picker-trigger__placeholder">{placeholder}</span>
            )}

            {!multiSelect && selectedOption && (
              <span className="picker-trigger__value">
                {selectedOption.icon != null && (
                  <span className="picker-trigger__icon">{selectedOption.icon}</span>
                )}
                {selectedOption.label}
              </span>
            )}

            {multiSelect && !isEmpty && (
              <>
                {visibleTags.map((id) => {
                  const opt = options.find((o) => o.id === id)
                  return opt ? (
                    <span key={id} className="picker-trigger__tag">{opt.label}</span>
                  ) : null
                })}
                {overflowCount > 0 && (
                  <span className="picker-trigger__tag picker-trigger__tag--overflow">
                    +{overflowCount}
                  </span>
                )}
              </>
            )}
          </div>

          <svg
            className={`picker-trigger__chevron${isOpen ? ' picker-trigger__chevron--open' : ''}`}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M4 6 L8 10 L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <PickerSheet
        title={title}
        options={options}
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        multiSelect={multiSelect}
        value={value}
        onChange={handleChange}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
