/**
 * Developer inspection script — prints the resolved visual form and prompt
 * sections for representative plants without calling any external API.
 *
 * Run with:
 *   npm run test:visual-prompts
 */

import { getPlantVisualForm, VISUAL_FORM_DESCRIPTORS } from '../src/lib/visualIdeas/plantVisualForms'
import { describePlantForImage, describeSpeciesListForImage } from '../src/lib/visualIdeas/describePlantForImage'

// ---------------------------------------------------------------------------
// Representative test cases
// ---------------------------------------------------------------------------

interface TestCase {
  label: string
  species: string
  plantingType?: string
}

const CASES: TestCase[] = [
  { label: 'Lomandra (shrubs)',          species: 'Lomandra',            plantingType: 'Shrubs' },
  { label: 'Camellia (shrubs)',          species: 'Camellia japonica',   plantingType: 'Shrubs' },
  { label: 'Hydrangea (shrubs)',         species: 'Hydrangea',           plantingType: 'Shrubs' },
  { label: 'Buxus (shrubs)',             species: 'Buxus',               plantingType: 'Shrubs' },
  { label: 'Griselinia (hedge)',         species: 'Griselinia',          plantingType: 'Hedge' },
  { label: 'Titoki (hedge/screening)',   species: 'Titoki',              plantingType: 'Screening' },
  { label: 'Titoki (feature tree)',      species: 'Titoki',              plantingType: 'Feature tree' },
  { label: 'Phormium (shrubs)',          species: 'Phormium',            plantingType: 'Shrubs' },
  { label: 'Tree fern (feature tree)',   species: 'Tree fern',           plantingType: 'Feature tree' },
  { label: 'Lomandra (groundcovers)',    species: 'Lomandra longifolia', plantingType: 'Groundcovers' },
  { label: 'Unknown species (shrubs)',   species: 'Olearia',             plantingType: 'Shrubs' },
  { label: 'No planting type',          species: 'Agapanthus' },
]

// ---------------------------------------------------------------------------
// Prompt preview — mirrors buildFalPrompt in falProvider exactly
// (kept in sync manually; update both when changing the prompt structure)
// ---------------------------------------------------------------------------

function stripTrailingPeriod(s: string): string {
  return s.replace(/\.+\s*$/, '').trimEnd()
}

function previewPrompt(species: string, plantingType?: string, hedgeForm?: string, goalText?: string): string {
  const speciesLabel = species
  const speciesDescription = describePlantForImage(species, plantingType)
  const form = getPlantVisualForm(species, plantingType)
  const descriptor = VISUAL_FORM_DESCRIPTORS[form]

  const section1 = `Add ${speciesLabel} to the white masked area of the image. The masked area should visibly contain the new plant after editing.`

  const section2 = [
    `Plant species: ${stripTrailingPeriod(speciesDescription)}.`,
    `The plant must match the selected species and this visual form: ${stripTrailingPeriod(descriptor.description)}.`,
  ].join('\n')

  const hedgeFormLine =
    hedgeForm === 'raised_or_pleached_screen'
      ? 'Show foliage mainly above 50 cm with visible trunks or stems below — raised or pleached form.'
      : hedgeForm === 'full_coverage_from_ground'
        ? 'Show dense foliage right from ground level with no gaps.'
        : ''
  const section3 = [descriptor.formInstruction, descriptor.scaleHint, hedgeFormLine]
    .filter(Boolean)
    .join('\n')

  const section4 = goalText ? `Garden goal: ${goalText}.` : ''

  const section5 = [
    'Keep everything outside the masked area exactly as it appears.',
    'Do not alter the sky, structures, paths, or existing plants outside the mask.',
    'Do not clone nearby plants.',
    'Do not add text or labels.',
    "Blend the new plant's lighting and shadows naturally with the scene.",
    stripTrailingPeriod(descriptor.negatives) + '.',
  ].join(' ')

  return [section1, section2, section3, section4, section5]
    .filter(Boolean)
    .join('\n\n')
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

const DIVIDER = '─'.repeat(72)
const SECTION  = '═'.repeat(72)

console.log('\n' + SECTION)
console.log('  Visual Ideas — prompt preview')
console.log(SECTION + '\n')

for (const tc of CASES) {
  const form = getPlantVisualForm(tc.species, tc.plantingType)
  const descriptor = VISUAL_FORM_DESCRIPTORS[form]
  const speciesDesc = describePlantForImage(tc.species, tc.plantingType)
  const prompt = previewPrompt(tc.species, tc.plantingType)

  console.log(DIVIDER)
  console.log(`CASE       : ${tc.label}`)
  console.log(`Species    : ${tc.species}`)
  console.log(`PlantType  : ${tc.plantingType ?? '(none)'}`)
  console.log(`VisualForm : ${form}`)
  console.log('')
  console.log(`Descriptor : ${speciesDesc}`)
  console.log('')
  console.log(`FormInstr  : ${descriptor.formInstruction}`)
  console.log(`ScaleHint  : ${descriptor.scaleHint}`)
  console.log(`Negatives  : ${descriptor.negatives}`)
  console.log('')
  console.log('── Prompt preview ──')
  console.log(prompt)
  console.log('')
}

console.log(SECTION)
console.log(`  ${CASES.length} cases printed. No API calls made.`)
console.log(SECTION + '\n')
