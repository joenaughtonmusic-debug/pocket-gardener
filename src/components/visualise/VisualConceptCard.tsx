import Link from 'next/link'
import { ArrowRight, ImageOff } from 'lucide-react'
import type { VisualConcept } from '../../types/garden'

const STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  generating: 'Generating…',
  complete: 'Complete',
  error: 'Error',
}

const STATUS_COLOURS: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-500',
  generating: 'bg-amber-50 text-amber-600',
  complete: 'bg-green-50 text-green-700',
  error: 'bg-red-50 text-red-500',
}

export default function VisualConceptCard({ concept }: { concept: VisualConcept }) {
  return (
    <Link
      href={`/visualise/${concept.id}`}
      className="block bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden active:scale-[0.98] transition-all"
    >
      <div className="flex items-stretch gap-0">
        <div className="w-28 shrink-0 bg-gray-100 relative overflow-hidden rounded-l-[2rem]">
          {concept.original_photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={concept.original_photo_url}
              alt={concept.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageOff size={20} className="text-gray-300" />
            </div>
          )}
          {concept.preview_mode === 'overlay' && (
            <div className="absolute bottom-1.5 right-1.5 bg-green-700 rounded-full px-2 py-0.5">
              <span className="text-[8px] text-white font-black uppercase">Preview</span>
            </div>
          )}
          {!concept.preview_mode && concept.generated_image_url && (
            <div className="absolute bottom-1.5 right-1.5 bg-green-700 rounded-full p-1">
              <span className="text-[8px] text-white font-black">✨</span>
            </div>
          )}
        </div>

        <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-sm font-black text-green-950 uppercase truncate">
                {concept.name}
              </h3>
              <ArrowRight size={12} className="text-gray-300 shrink-0 mt-0.5" />
            </div>
            {concept.selected_species?.[0] && (
              <p className="text-[9px] font-black uppercase tracking-widest text-green-600 mb-1.5">
                {concept.selected_species[0]}
              </p>
            )}
            {concept.goal_text && (
              <p className="text-[11px] text-gray-500 font-medium line-clamp-2 leading-relaxed">
                {concept.goal_text}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mt-3">
            <span
              className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                STATUS_COLOURS[concept.status] ?? STATUS_COLOURS.draft
              }`}
            >
              {STATUS_LABELS[concept.status] ?? concept.status}
            </span>
            <span className="text-[9px] text-gray-300 font-bold">
              {new Date(concept.created_at).toLocaleDateString('en-NZ', {
                day: 'numeric',
                month: 'short',
              })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
