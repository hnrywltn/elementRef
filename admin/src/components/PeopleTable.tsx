import type { Person } from '../types'

const STATUS_STYLES: Record<string, string> = {
  draft:     'bg-gray-100 text-gray-500',
  in_review: 'bg-yellow-100 text-yellow-700',
  complete:  'bg-green-100 text-green-700',
  balanced:  'bg-blue-100 text-blue-700',
}

interface Props {
  people: Person[]
  selectedId: number | null
  onSelect: (p: Person) => void
}

export default function PeopleTable({ people, selectedId, onSelect }: Props) {
  return (
    <table className="w-full text-sm border-collapse">
      <thead className="sticky top-0 bg-white border-b-2 border-gray-200 z-10">
        <tr>
          {['Name', 'Nationality', 'Lifespan', 'Related Elements', 'Status', 'Art'].map(h => (
            <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {people.map(p => (
          <tr
            key={p.id}
            onClick={() => onSelect(p)}
            className={`border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors ${
              selectedId === p.id ? 'bg-blue-50 border-l-2 border-l-blue-400' : ''
            }`}
          >
            <td className="px-3 py-2 font-semibold text-gray-800">{p.name}</td>
            <td className="px-3 py-2 text-gray-500 text-xs">{p.nationality ?? '—'}</td>
            <td className="px-3 py-2 text-gray-400 text-xs whitespace-nowrap">
              {p.born ?? '?'} — {p.died ?? 'present'}
            </td>
            <td className="px-3 py-2 text-gray-500 text-xs max-w-xs truncate">{p.relatedElements ?? '—'}</td>
            <td className="px-3 py-2">
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[p.cardStatus] ?? 'bg-gray-100 text-gray-500'}`}>
                {p.cardStatus.replace(/_/g, ' ')}
              </span>
            </td>
            <td className="px-3 py-2 w-8">
              <span className={`inline-block w-2 h-2 rounded-full ${p.artworkUrl ? 'bg-green-400' : 'bg-gray-200'}`} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
