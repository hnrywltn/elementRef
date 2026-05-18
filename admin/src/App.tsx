import { useState, useEffect } from 'react'
import { fetchElements, fetchPeople } from './api/client'
import type { Element, Person } from './types'
import type { Filters } from './components/FilterBar'
import ElementsTable from './components/ElementsTable'
import ElementDetail from './components/ElementDetail'
import FilterBar from './components/FilterBar'
import PeopleTable from './components/PeopleTable'
import PersonDetail from './components/PersonDetail'

type Page = 'elements' | 'people'

export default function App() {
  const [page, setPage] = useState<Page>('elements')

  // Elements state
  const [elements, setElements] = useState<Element[]>([])
  const [selectedElement, setSelectedElement] = useState<Element | null>(null)
  const [filters, setFilters] = useState<Filters>({ cardClass: '', family: '', status: '', search: '' })
  const [elementsLoading, setElementsLoading] = useState(true)

  // People state
  const [people, setPeople] = useState<Person[]>([])
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const [peopleLoading, setPeopleLoading] = useState(true)

  const [error, setError] = useState('')

  useEffect(() => {
    fetchElements()
      .then(setElements)
      .catch(() => setError('Could not connect to API. Is the server running?'))
      .finally(() => setElementsLoading(false))

    fetchPeople()
      .then(setPeople)
      .catch(() => {})
      .finally(() => setPeopleLoading(false))
  }, [])

  const filteredElements = elements.filter(el => {
    if (filters.cardClass && el.cardClass !== filters.cardClass) return false
    if (filters.family && el.category !== filters.family) return false
    if (filters.status && el.cardStatus !== filters.status) return false
    if (filters.search) {
      const q = filters.search.toLowerCase()
      return el.name.toLowerCase().includes(q) || el.symbol.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900">
      <header className="bg-white border-b border-gray-200 px-6 py-0 flex items-stretch gap-0 flex-shrink-0">
        <div className="flex items-center pr-6 border-r border-gray-200 mr-2">
          <h1 className="text-base font-bold tracking-tight">Elements Admin</h1>
        </div>
        {(['elements', 'people'] as Page[]).map(p => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${
              page === p
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            {p}
          </button>
        ))}
      </header>

      {page === 'elements' && (
        <>
          <FilterBar filters={filters} onChange={setFilters} total={elements.length} filtered={filteredElements.length} />
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-auto">
              {elementsLoading && <div className="flex items-center justify-center h-full text-gray-300 text-sm">Loading...</div>}
              {error && <div className="flex items-center justify-center h-full text-red-400 text-sm">{error}</div>}
              {!elementsLoading && !error && (
                <ElementsTable elements={filteredElements} selectedId={selectedElement?.id ?? null} onSelect={setSelectedElement} />
              )}
            </div>
            {selectedElement && (
              <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto flex-shrink-0">
                <ElementDetail key={selectedElement.id} element={selectedElement} onSave={u => { setElements(prev => prev.map(e => e.id === u.id ? u : e)); setSelectedElement(u) }} onClose={() => setSelectedElement(null)} />
              </div>
            )}
          </div>
        </>
      )}

      {page === 'people' && (
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto">
            {peopleLoading && <div className="flex items-center justify-center h-full text-gray-300 text-sm">Loading...</div>}
            {!peopleLoading && (
              <PeopleTable people={people} selectedId={selectedPerson?.id ?? null} onSelect={setSelectedPerson} />
            )}
          </div>
          {selectedPerson && (
            <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto flex-shrink-0">
              <PersonDetail key={selectedPerson.id} person={selectedPerson} onSave={u => { setPeople(prev => prev.map(p => p.id === u.id ? u : p)); setSelectedPerson(u) }} onClose={() => setSelectedPerson(null)} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
