import type { ReactNode } from 'react'

export type PickerOption = {
  id: string
  label: string
  icon?: ReactNode
  meta?: string
}
