import { useState } from 'react'
import PickerTrigger from './components/PickerTrigger/PickerTrigger'
import type { PickerOption } from './types/picker'

const COUNTRIES: PickerOption[] = [
  { id: 'US', label: 'United States',            icon: '🇺🇸' },
  { id: 'CA', label: 'Canada',                   icon: '🇨🇦' },
  { id: 'GB', label: 'United Kingdom',           icon: '🇬🇧' },
  { id: 'PK', label: 'Pakistan',                 icon: '🇵🇰' },
  { id: 'EG', label: 'Egypt',                    icon: '🇪🇬' },
  { id: 'CN', label: "People's Republic of China", icon: '🇨🇳' },
  { id: 'AE', label: 'United Arab Emirates',     icon: '🇦🇪' },
  { id: 'IN', label: 'India',                    icon: '🇮🇳' },
  { id: 'DE', label: 'Germany',                  icon: '🇩🇪' },
  { id: 'FR', label: 'France',                   icon: '🇫🇷' },
  { id: 'AU', label: 'Australia',                icon: '🇦🇺' },
  { id: 'BR', label: 'Brazil',                   icon: '🇧🇷' },
  { id: 'NG', label: 'Nigeria',                  icon: '🇳🇬' },
  { id: 'KE', label: 'Kenya',                    icon: '🇰🇪' },
  { id: 'SA', label: 'Saudi Arabia',             icon: '🇸🇦' },
  { id: 'TR', label: 'Turkey',                   icon: '🇹🇷' },
  { id: 'KR', label: 'South Korea',             icon: '🇰🇷' },
  { id: 'JP', label: 'Japan',                    icon: '🇯🇵' },
  { id: 'MX', label: 'Mexico',                   icon: '🇲🇽' },
  { id: 'IT', label: 'Italy',                    icon: '🇮🇹' },
]

const STATES: PickerOption[] = [
  { id: 'AL', label: 'Alabama' },
  { id: 'AK', label: 'Alaska' },
  { id: 'AZ', label: 'Arizona' },
  { id: 'AR', label: 'Arkansas' },
  { id: 'CA', label: 'California' },
  { id: 'CO', label: 'Colorado' },
  { id: 'CT', label: 'Connecticut' },
  { id: 'DE', label: 'Delaware' },
  { id: 'FL', label: 'Florida' },
  { id: 'GA', label: 'Georgia' },
  { id: 'HI', label: 'Hawaii' },
  { id: 'ID', label: 'Idaho' },
  { id: 'IL', label: 'Illinois' },
  { id: 'IN', label: 'Indiana' },
  { id: 'IA', label: 'Iowa' },
  { id: 'KS', label: 'Kansas' },
  { id: 'KY', label: 'Kentucky' },
  { id: 'LA', label: 'Louisiana' },
  { id: 'ME', label: 'Maine' },
  { id: 'MD', label: 'Maryland' },
  { id: 'MA', label: 'Massachusetts' },
  { id: 'MI', label: 'Michigan' },
  { id: 'MN', label: 'Minnesota' },
  { id: 'MS', label: 'Mississippi' },
  { id: 'MO', label: 'Missouri' },
  { id: 'MT', label: 'Montana' },
  { id: 'NE', label: 'Nebraska' },
  { id: 'NV', label: 'Nevada' },
  { id: 'NH', label: 'New Hampshire' },
  { id: 'NJ', label: 'New Jersey' },
  { id: 'NM', label: 'New Mexico' },
  { id: 'NY', label: 'New York' },
  { id: 'NC', label: 'North Carolina' },
  { id: 'ND', label: 'North Dakota' },
  { id: 'OH', label: 'Ohio' },
  { id: 'OK', label: 'Oklahoma' },
  { id: 'OR', label: 'Oregon' },
  { id: 'PA', label: 'Pennsylvania' },
  { id: 'RI', label: 'Rhode Island' },
  { id: 'SC', label: 'South Carolina' },
  { id: 'SD', label: 'South Dakota' },
  { id: 'TN', label: 'Tennessee' },
  { id: 'TX', label: 'Texas' },
  { id: 'UT', label: 'Utah' },
  { id: 'VT', label: 'Vermont' },
  { id: 'VA', label: 'Virginia' },
  { id: 'WA', label: 'Washington' },
  { id: 'WV', label: 'West Virginia' },
  { id: 'WI', label: 'Wisconsin' },
  { id: 'WY', label: 'Wyoming' },
]

export default function App() {
  const [country, setCountry] = useState<string>('')
  const [states, setStates] = useState<string[]>([])

  return (
    <div style={{
      maxWidth: 480,
      margin: '0 auto',
      padding: '48px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 40,
    }}>
      <PickerTrigger
        sectionLabel="COUNTRY"
        title="Country"
        placeholder="Search or select a country"
        options={COUNTRIES}
        searchable
        searchPlaceholder="Search countries..."
        multiSelect={false}
        value={country}
        onChange={(v) => setCountry(v as string)}
      />

      <PickerTrigger
        sectionLabel="STATE"
        title="State"
        placeholder="Search or select states"
        options={STATES}
        searchable
        searchPlaceholder="Search states..."
        multiSelect
        value={states}
        onChange={(v) => setStates(v as string[])}
      />
    </div>
  )
}
