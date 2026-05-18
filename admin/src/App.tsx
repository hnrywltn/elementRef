import { useState, useEffect } from 'react'
import { fetchElements } from './api/client'
import type { Element } from './types'
import type { Filters } from './components/FilterBar'
import ElementsTable from './components/ElementsTable'
import ElementDetail from './components/ElementDetail'
import FilterBar from './components/FilterBar'

export default function App() {
  const [elements, setElements] = useState<Element[]>([])
  const [selected, setSelected] = useState<Element | null>(null)
  const [filters, setFilters] = useState<Filters>({ category: '', status: '', search: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchElements()
      .then(setElements)
      .catch(() => setError('Could not connect to API. Is the server running?'))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = (updated: Element) => {
    setElements(prev => prev.map(e => e.id === updated.id ? updated : e))
    setSelected(updated)
  }

  const filtered = elements.filter(el => {
    if (filters.category && el.category !== filters.category) return false
    if (filters.status && el.cardStatus !== filters.status) return false
    if (filters.search) {
      const q = filters.search.toLowerCase()
      return el.name.toLowerCase().includes(q) || el.symbol.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900">
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3 flex-shrink-0">
        <h1 className="text-base font-bold tracking-tight">Elements Admin</h1>
        <span className="text-xs text-gray-300">|</span>
        <span className="text-xs text-gray-400">Phase 0 — card data editor</span>
      </header>

      <FilterBar filters={filters} onChange={setFilters} total={elements.length} filtered={filtered.length} />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto">
          {loading && (
            <div className="flex items-center justify-center h-full text-gray-300 text-sm">Loading...</div>
          )}
          {error && (
            <div className="flex items-center justify-center h-full text-red-400 text-sm">{error}</div>
          )}
          {!loading && !error && (
            <ElementsTable elements={filtered} selectedId={selected?.id ?? null} onSelect={setSelected} />
          )}
        </div>

        {selected && (
          <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto flex-shrink-0">
            <ElementDetail key={selected.id} element={selected} onSave={handleSave} onClose={() => setSelected(null)} />
          </div>
        )}
      </div>
    </div>
  )
}
