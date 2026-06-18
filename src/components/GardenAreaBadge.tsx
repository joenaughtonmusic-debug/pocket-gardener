import { GENERAL_GARDEN_LABEL } from '../lib/gardenAreas'

export default function GardenAreaBadge({ name }: { name: string }) {
  const isGeneral = name === GENERAL_GARDEN_LABEL
  return (
    <span
      className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
        isGeneral
          ? 'text-gray-400 bg-gray-50 border border-gray-100'
          : 'text-green-700 bg-green-50 border border-green-100'
      }`}
    >
      {name}
    </span>
  )
}
