const FAMILIES = [
  'alkali_metal', 'alkaline_earth', 'transition_metal', 'post_transition',
  'metalloid', 'nonmetal', 'halogen', 'noble_gas', 'lanthanide', 'actinide', 'synthetic',
]
const CLASSES = ['aether', 'bloom', 'catalyst', 'circuit', 'forge', 'nucleus', 'venom', 'void']
const STATUSES = ['draft', 'in_review', 'complete', 'balanced']

export interface Filters {
  cardClass: string
  family: string
  status: string
  search: string
}

interface Props {
  filters: Filters
  onChange: (f: Filters) => void
  total: number
  filtered: number
}

export default function FilterBar({ filters, onChange, total, filtered }: Props) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3 flex-wrap">
      <input
        type="text"
        placeholder="Search name or symbol..."
        value={filters.search}
        onChange={e => onChange({ ...filters, search: e.target.value })}
        className="border border-gray-200 rounded px-3 py-1.5 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <select
        value={filters.cardClass}
        onChange={e => onChange({ ...filters, cardClass: e.target.value })}
        className="border border-gray-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <option value="">All classes</option>
        {CLASSES.map(c => (
          <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
        ))}
      </select>
      <select
        value={filters.family}
        onChange={e => onChange({ ...filters, family: e.target.value })}
        className="border border-gray-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <option value="">All families</option>
        {FAMILIES.map(f => (
          <option key={f} value={f}>{f.replace(/_/g, ' ')}</option>
        ))}
      </select>
      <select
        value={filters.status}
        onChange={e => onChange({ ...filters, status: e.target.value })}
        className="border border-gray-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <option value="">All statuses</option>
        {STATUSES.map(s => (
          <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
        ))}
      </select>
      <span className="ml-auto text-sm text-gray-400">
        {filtered === total ? `${total} elements` : `${filtered} of ${total}`}
      </span>
    </div>
  )
}
