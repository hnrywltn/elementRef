import { useState, useEffect } from 'react'
import { fetchCharacterElements, addCharacterRef, deleteCharacterRef } from '../api/client'
import type { ElementWithRefs, CharacterReference } from '../types'

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

export default function CharactersPage() {
  const [elements, setElements] = useState<ElementWithRefs[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<ElementWithRefs | null>(null)
  const [filter, setFilter] = useState<'all' | 'done' | 'todo'>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchCharacterElements()
      .then(setElements)
      .finally(() => setLoading(false))
  }, [])

  const filtered = elements.filter(el => {
    if (filter === 'done' && el.characterReferences.length === 0) return false
    if (filter === 'todo' && el.characterReferences.length > 0) return false
    if (search) {
      const q = search.toLowerCase()
      return el.name.toLowerCase().includes(q) || el.symbol.toLowerCase().includes(q)
    }
    return true
  })

  const done = elements.filter(e => e.characterReferences.length > 0).length
  const total = elements.length

  const handleAdd = async (elementId: number, data: Partial<CharacterReference>) => {
    const ref = await addCharacterRef(elementId, data)
    setElements(prev => prev.map(el =>
      el.id === elementId ? { ...el, characterReferences: [...el.characterReferences, ref] } : el
    ))
    setSelected(prev => prev?.id === elementId
      ? { ...prev, characterReferences: [...prev.characterReferences, ref] }
      : prev
    )
  }

  const handleDelete = async (elementId: number, refId: number) => {
    await deleteCharacterRef(refId)
    setElements(prev => prev.map(el =>
      el.id === elementId
        ? { ...el, characterReferences: el.characterReferences.filter(r => r.id !== refId) }
        : el
    ))
    setSelected(prev => prev?.id === elementId
      ? { ...prev, characterReferences: prev.characterReferences.filter(r => r.id !== refId) }
      : prev
    )
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left — element list */}
      <div className="w-72 border-r border-gray-200 flex flex-col flex-shrink-0">
        <div className="px-4 py-3 border-b border-gray-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{done} / {total} done</span>
            <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-400 rounded-full transition-all" style={{ width: `${(done / total) * 100}%` }} />
            </div>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <div className="flex gap-1">
            {(['all', 'todo', 'done'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 py-1 rounded text-xs font-medium capitalize transition-colors ${
                  filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading && <div className="p-4 text-sm text-gray-300">Loading...</div>}
          {filtered.map(el => (
            <button
              key={el.id}
              onClick={() => setSelected(el)}
              className={`w-full text-left px-4 py-2.5 border-b border-gray-100 flex items-center gap-3 hover:bg-blue-50 transition-colors ${
                selected?.id === el.id ? 'bg-blue-50 border-l-2 border-l-blue-400' : ''
              }`}
            >
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${el.characterReferences.length > 0 ? 'bg-green-400' : 'bg-gray-200'}`} />
              <span className="font-mono font-bold text-gray-700 text-sm w-6">{el.symbol}</span>
              <span className="text-sm text-gray-600 flex-1 truncate">{el.name}</span>
              {el.characterReferences.length > 0 && (
                <span className="text-xs text-gray-400">{el.characterReferences.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right — detail */}
      <div className="flex-1 overflow-y-auto">
        {!selected ? (
          <div className="flex items-center justify-center h-full text-gray-300 text-sm">
            Select an element to add character references
          </div>
        ) : (
          <ElementCharacterPanel
            element={selected}
            onAdd={data => handleAdd(selected.id, data)}
            onDelete={refId => handleDelete(selected.id, refId)}
          />
        )}
      </div>
    </div>
  )
}

function ElementCharacterPanel({
  element,
  onAdd,
  onDelete,
}: {
  element: ElementWithRefs
  onAdd: (data: Partial<CharacterReference>) => Promise<void>
  onDelete: (refId: number) => Promise<void>
}) {
  const [form, setForm] = useState({ characterName: '', showOrMovie: '', actorName: '', notes: '', addedBy: 'Mark' })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.characterName.trim()) return
    setSaving(true)
    try {
      await onAdd({
        characterName: form.characterName.trim(),
        showOrMovie: form.showOrMovie.trim() || null,
        actorName: form.actorName.trim() || null,
        notes: form.notes.trim() || null,
        addedBy: form.addedBy.trim() || null,
      })
      setForm(f => ({ ...f, characterName: '', showOrMovie: '', actorName: '', notes: '' }))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-3xl font-bold font-mono text-gray-900">{element.symbol}</span>
        <span className="text-xl text-gray-600">{element.name}</span>
        {element.cardClass && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${CLASS_STYLES[element.cardClass] ?? 'bg-gray-100 text-gray-500'}`}>
            {element.cardClass}
          </span>
        )}
      </div>

      {/* Existing references */}
      {element.characterReferences.length > 0 && (
        <div className="mb-6 space-y-3">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            References ({element.characterReferences.length})
          </h3>
          {element.characterReferences.map(ref => (
            <div key={ref.id} className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{ref.characterName}</div>
                  {ref.showOrMovie && (
                    <div className="text-sm text-gray-500 mt-0.5">{ref.showOrMovie}</div>
                  )}
                  {ref.actorName && (
                    <div className="text-xs text-gray-400 mt-0.5">played by {ref.actorName}</div>
                  )}
                  {ref.notes && (
                    <div className="text-sm text-gray-600 mt-2 italic">"{ref.notes}"</div>
                  )}
                  {ref.addedBy && (
                    <div className="text-xs text-gray-300 mt-2">added by {ref.addedBy}</div>
                  )}
                </div>
                <button
                  onClick={() => onDelete(ref.id)}
                  className="text-gray-200 hover:text-red-400 transition-colors text-lg leading-none flex-shrink-0"
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add form */}
      <form onSubmit={handleSubmit} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Add Reference</h3>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Character name *"
            value={form.characterName}
            onChange={e => setForm(f => ({ ...f, characterName: e.target.value }))}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
          />
          <input
            type="text"
            placeholder="Show or movie"
            value={form.showOrMovie}
            onChange={e => setForm(f => ({ ...f, showOrMovie: e.target.value }))}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
          />
          <input
            type="text"
            placeholder="Actor name"
            value={form.actorName}
            onChange={e => setForm(f => ({ ...f, actorName: e.target.value }))}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
          />
          <textarea
            placeholder="Notes — what specifically maps to this element? (season, arc, specific quality...)"
            value={form.notes}
            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            rows={3}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white resize-none"
          />
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Added by"
              value={form.addedBy}
              onChange={e => setForm(f => ({ ...f, addedBy: e.target.value }))}
              className="w-32 border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
            />
            <button
              type="submit"
              disabled={!form.characterName.trim() || saving}
              className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium disabled:opacity-30 hover:bg-blue-700 transition-colors"
            >
              {saving ? 'Adding...' : 'Add'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
