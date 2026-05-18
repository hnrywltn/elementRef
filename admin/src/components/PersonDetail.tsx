import { useState, useEffect } from 'react'
import { updatePerson } from '../api/client'
import type { Person } from '../types'

const RELATION_STYLES: Record<string, string> = {
  discovered:    'bg-green-100 text-green-700',
  co_discovered: 'bg-teal-100 text-teal-700',
  isolated:      'bg-blue-100 text-blue-700',
  named:         'bg-purple-100 text-purple-700',
  named_after:   'bg-amber-100 text-amber-700',
  synthesized:   'bg-rose-100 text-rose-700',
  related:       'bg-gray-100 text-gray-500',
}

interface Props {
  person: Person
  onSave: (p: Person) => void
  onClose: () => void
}

export default function PersonDetail({ person, onSave, onClose }: Props) {
  const [draft, setDraft] = useState<Person>(person)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  useEffect(() => { setDraft(person); setSaveMsg('') }, [person.id])

  const set = <K extends keyof Person>(field: K, value: Person[K]) => {
    setDraft(prev => ({ ...prev, [field]: value }))
    setSaveMsg('')
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const updated = await updatePerson(draft.id, draft)
      onSave(updated)
      setSaveMsg('Saved')
    } catch {
      setSaveMsg('Save failed')
    } finally {
      setSaving(false)
    }
  }

  const isDirty = JSON.stringify(draft) !== JSON.stringify(person)

  return (
    <div className="flex flex-col h-full text-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 flex-shrink-0">
        <div>
          <span className="font-bold text-gray-900">{person.name}</span>
          <span className="ml-2 text-gray-400 text-xs">{person.born ?? '?'} — {person.died ?? 'present'}</span>
        </div>
        <button onClick={onClose} className="text-gray-300 hover:text-gray-500 text-lg leading-none">&times;</button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">

        <section>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Identity</h3>
          <div className="grid grid-cols-2 gap-2">
            <TextField label="Nationality" value={draft.nationality} onChange={v => set('nationality', v)} />
            <NumField label="Born" value={draft.born} onChange={v => set('born', v)} />
            <NumField label="Died" value={draft.died} onChange={v => set('died', v)} placeholder="leave blank if living" />
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Content</h3>
          <div className="space-y-2">
            <TextareaField label="Biography" value={draft.biography} onChange={v => set('biography', v)} rows={4} />
            <TextareaField label="Contribution to elements / chemistry" value={draft.contribution} onChange={v => set('contribution', v)} rows={3} />
            <TextareaField label="Fun fact" value={draft.funFact} onChange={v => set('funFact', v)} rows={2} />
            <TextField label="Related elements" value={draft.relatedElements} onChange={v => set('relatedElements', v)} />
          </div>
        </section>

        {person.elementRelations.length > 0 && (
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Linked Elements ({person.elementRelations.length})
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {person.elementRelations.map(r => (
                <div key={r.elementId} className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded px-2 py-1">
                  <span className="font-bold font-mono text-gray-800 text-xs">{r.element.symbol}</span>
                  <span className="text-gray-400 text-xs">{r.element.name}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ml-1 ${RELATION_STYLES[r.relation] ?? 'bg-gray-100 text-gray-500'}`}>
                    {r.relation.replace(/_/g, ' ')}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Game Design</h3>
          <div className="space-y-2">
            <TextareaField label="Game angle (how they might appear)" value={draft.gameAngle} onChange={v => set('gameAngle', v)} rows={2} />
            <SelectField label="Status" value={draft.cardStatus} options={['draft','in_review','complete','balanced']} onChange={v => set('cardStatus', v)} />
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Artwork</h3>
          <div className="space-y-2">
            <TextField label="Artwork URL" value={draft.artworkUrl} onChange={v => set('artworkUrl', v)} />
            <SelectField label="Artwork Status" value={draft.artworkStatus} options={['needed','in_progress','complete']} onChange={v => set('artworkStatus', v)} />
            {draft.artworkUrl && (
              <img src={draft.artworkUrl} alt={person.name} className="mt-1 w-full rounded border border-gray-200 object-contain max-h-40" />
            )}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Design Notes (internal)</h3>
          <TextareaField label="" value={draft.designNotes} onChange={v => set('designNotes', v)} rows={3} />
        </section>

      </div>

      <div className="border-t border-gray-200 px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <button
          onClick={handleSave}
          disabled={!isDirty || saving}
          className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm font-medium disabled:opacity-30 hover:bg-blue-700 transition-colors"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
        {saveMsg && <span className={`text-xs ${saveMsg === 'Saved' ? 'text-green-500' : 'text-red-500'}`}>{saveMsg}</span>}
        {isDirty && !saveMsg && <span className="text-xs text-gray-300">Unsaved changes</span>}
      </div>
    </div>
  )
}

function TextField({ label, value, onChange, placeholder }: { label: string; value: string | null | undefined; onChange: (v: string | null) => void; placeholder?: string }) {
  return (
    <div>
      {label && <label className="block text-xs text-gray-400 mb-0.5">{label}</label>}
      <input
        type="text"
        value={value ?? ''}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value || null)}
        className="w-full border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
  )
}

function NumField({ label, value, onChange, placeholder }: { label: string; value: number | null | undefined; onChange: (v: number | null) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-0.5">{label}</label>
      <input
        type="number"
        value={value ?? ''}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value === '' ? null : Number(e.target.value))}
        className="w-full border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
  )
}

function TextareaField({ label, value, onChange, rows = 3 }: { label: string; value: string | null | undefined; onChange: (v: string | null) => void; rows?: number }) {
  return (
    <div>
      {label && <label className="block text-xs text-gray-400 mb-0.5">{label}</label>}
      <textarea
        value={value ?? ''}
        onChange={e => onChange(e.target.value || null)}
        rows={rows}
        className="w-full border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
      />
    </div>
  )
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      {label && <label className="block text-xs text-gray-400 mb-0.5">{label}</label>}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        {options.map(o => <option key={o} value={o}>{o.replace(/_/g, ' ')}</option>)}
      </select>
    </div>
  )
}
