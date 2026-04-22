import { useState } from 'react'
import PickerSheet from './components/PickerSheet/PickerSheet'
import type { PickerOption } from './types/picker'

const FRUITS: PickerOption[] = [
  { id: 'apple', label: 'Apple', icon: '🍎', meta: 'Fuji, Gala, Granny Smith' },
  { id: 'banana', label: 'Banana', icon: '🍌', meta: 'Cavendish' },
  { id: 'cherry', label: 'Cherry', icon: '🍒' },
  { id: 'durian', label: 'Durian', icon: '🍈', meta: 'King of fruits' },
  { id: 'elderberry', label: 'Elderberry', icon: '🫐' },
  { id: 'fig', label: 'Fig', icon: '🍑' },
  { id: 'grape', label: 'Grape', icon: '🍇', meta: 'Red, Green, Black' },
  { id: 'honeydew', label: 'Honeydew', icon: '🍈' },
]

export default function App() {
  const [singleOpen, setSingleOpen] = useState(false)
  const [multiOpen, setMultiOpen] = useState(false)
  const [single, setSingle] = useState<string>('')
  const [multi, setMulti] = useState<string[]>([])

  return (
    <div style={{ padding: 24, fontFamily: 'Inter, sans-serif' }}>
      <h2 style={{ color: 'var(--content-primary)', marginTop: 0 }}>PickerSheet Demo</h2>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <button
          onClick={() => setSingleOpen(true)}
          style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid var(--border-primary)', background: 'var(--bg-white)', cursor: 'pointer', fontSize: 14, fontFamily: 'inherit' }}
        >
          Single select {single ? `— ${single}` : ''}
        </button>
        <button
          onClick={() => setMultiOpen(true)}
          style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid var(--border-primary)', background: 'var(--bg-white)', cursor: 'pointer', fontSize: 14, fontFamily: 'inherit' }}
        >
          Multi select {multi.length ? `— ${multi.length} selected` : ''}
        </button>
      </div>

      <PickerSheet
        title="Pick a fruit"
        options={FRUITS}
        value={single}
        onChange={(v) => setSingle(v as string)}
        isOpen={singleOpen}
        onClose={() => setSingleOpen(false)}
      />

      <PickerSheet
        title="Pick fruits"
        options={FRUITS}
        multiSelect
        value={multi}
        onChange={(v) => setMulti(v as string[])}
        isOpen={multiOpen}
        onClose={() => setMultiOpen(false)}
      />
    </div>
  )
}
