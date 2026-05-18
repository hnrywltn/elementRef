import type { Element } from '../types'

const CLASS_STYLES: Record<string, string> = {
  forge:    'bg-amber-100 text-amber-800',
  circuit:  'bg-teal-100 text-teal-800',
  nucleus:  'bg-red-100 text-red-800',
  bloom:    'bg-green-100 text-green-800',
  aether:   'bg-sky-100 text-sky-800',
  venom:    'bg-purple-100 text-purple-800',
  catalyst: 'bg-yellow-100 text-yellow-800',
  void:     'bg-gray-200 text-gray-600',
}

const FAMILY_STYLES: Record<string, string> = {
  alkali_metal:      'bg-red-50 text-red-600',
  alkaline_earth:    'bg-orange-50 text-orange-600',
  transition_metal:  'bg-blue-50 text-blue-600',
  post_transition:   'bg-slate-100 text-slate-500',
  metalloid:         'bg-yellow-50 text-yellow-600',
  nonmetal:          'bg-green-50 text-green-600',
  halogen:           'bg-purple-50 text-purple-600',
  noble_gas:         'bg-cyan-50 text-cyan-600',
  lanthanide:        'bg-pink-50 text-pink-600',
  actinide:          'bg-rose-50 text-rose-600',
  synthetic:         'bg-gray-100 text-gray-400',
}

const STATUS_STYLES: Record<string, string> = {
  draft:     'bg-gray-100 text-gray-500',
  in_review: 'bg-yellow-100 text-yellow-700',
  complete:  'bg-green-100 text-green-700',
  balanced:  'bg-blue-100 text-blue-700',
}

const RARITY_STYLES: Record<string, string> = {
  common:    'text-gray-400',
  uncommon:  'text-green-600',
  rare:      'text-blue-600 font-semibold',
  epic:      'text-purple-600 font-semibold',
  legendary: 'text-orange-500 font-bold',
}

interface Props {
  elements: Element[]
  selectedId: number | null
  onSelect: (el: Element) => void
}

export default function ElementsTable({ elements, selectedId, onSelect }: Props) {
  return (
    <table className="w-full text-sm border-collapse">
      <thead className="sticky top-0 bg-white border-b-2 border-gray-200 z-10">
        <tr>
          {['#', 'Symbol', 'Name', 'Class', 'Family', 'Cost', 'ATK', 'HP', 'Rarity', 'Status', 'Art'].map(h => (
            <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {elements.map(el => (
          <tr
            key={el.id}
            onClick={() => onSelect(el)}
            className={`border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors ${
              selectedId === el.id ? 'bg-blue-50 border-l-2 border-l-blue-400' : ''
            }`}
          >
            <td className="px-3 py-1.5 text-gray-300 font-mono text-xs w-8">{el.atomicNumber}</td>
            <td className="px-3 py-1.5 font-bold text-gray-800 font-mono w-10">{el.symbol}</td>
            <td className="px-3 py-1.5 text-gray-700">
              {el.name}
              {el.isRadioactive && <span className="ml-1 text-orange-400 text-xs">☢</span>}
            </td>
            <td className="px-3 py-1.5">
              {el.cardClass ? (
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${CLASS_STYLES[el.cardClass] ?? 'bg-gray-100 text-gray-500'}`}>
                  {el.cardClass}
                </span>
              ) : (
                <span className="text-gray-200 text-xs">—</span>
              )}
            </td>
            <td className="px-3 py-1.5">
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${FAMILY_STYLES[el.category] ?? 'bg-gray-100 text-gray-400'}`}>
                {el.category.replace(/_/g, ' ')}
              </span>
            </td>
            <td className="px-3 py-1.5 text-center text-gray-600 w-12">{el.electronCost ?? <span className="text-gray-200">—</span>}</td>
            <td className="px-3 py-1.5 text-center text-red-400 font-medium w-12">{el.attack ?? <span className="text-gray-200">—</span>}</td>
            <td className="px-3 py-1.5 text-center text-emerald-500 font-medium w-12">{el.healthPoints ?? <span className="text-gray-200">—</span>}</td>
            <td className={`px-3 py-1.5 text-xs capitalize w-20 ${RARITY_STYLES[el.rarity] ?? 'text-gray-400'}`}>{el.rarity}</td>
            <td className="px-3 py-1.5 w-24">
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[el.cardStatus] ?? 'bg-gray-100 text-gray-500'}`}>
                {el.cardStatus.replace(/_/g, ' ')}
              </span>
            </td>
            <td className="px-3 py-1.5 w-8">
              <span className={`inline-block w-2 h-2 rounded-full ${el.artworkUrl ? 'bg-green-400' : 'bg-gray-200'}`} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
