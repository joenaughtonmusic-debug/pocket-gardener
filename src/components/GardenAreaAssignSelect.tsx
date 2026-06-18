'use client'

import { GENERAL_GARDEN_LABEL } from '../lib/gardenAreas'

interface GardenAreaOption {
  id: string
  name: string
}

interface GardenAreaAssignSelectProps {
  value: string | null | undefined
  areas: GardenAreaOption[]
  onChange: (areaId: string | null) => void
  disabled?: boolean
}

export default function GardenAreaAssignSelect({
  value,
  areas,
  onChange,
  disabled,
}: GardenAreaAssignSelectProps) {
  if (areas.length === 0) return null

  return (
    <div className="mt-2 pt-2 border-t border-gray-100">
      <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
        Garden Area
      </label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value || null)}
        disabled={disabled}
        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-[10px] font-bold text-gray-700 outline-none focus:border-green-200 disabled:opacity-50"
      >
        <option value="">{GENERAL_GARDEN_LABEL}</option>
        {areas.map((area) => (
          <option key={area.id} value={area.id}>
            {area.name}
          </option>
        ))}
      </select>
    </div>
  )
}
