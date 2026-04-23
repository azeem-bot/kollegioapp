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

  function getDisplayValue(): string | null {
    if (selectedIds.length === 0) return null
    if (!multiSelect) {
      return options.find((o) => o.id === selectedIds[0])?.label ?? null
    }
    if (selectedIds.length === 1) {
      return options.find((o) => o.id === selectedIds[0])?.label ?? null
    }
    return `${selectedIds.length} selected`
  }

  function handleChange(next: string | string[]) {
    onChange(next)
    // Single-select: close immediately after pick
    if (!multiSelect) {
      setIsOpen(false)
    }
  }

  const display = getDisplayValue()

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
          <span className={`picker-trigger__value${display ? '' : ' picker-trigger__value--placeholder'}`}>
            {display ?? placeholder}
          </span>
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
