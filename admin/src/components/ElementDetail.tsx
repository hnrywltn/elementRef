import { useState, useEffect } from 'react'
import { updateElement } from '../api/client'
import type { Element } from '../types'

interface Props {
  element: Element
  onSave: (el: Element) => void
  onClose: () => void
}

export default function ElementDetail({ element, onSave, onClose }: Props) {
  const [draft, setDraft] = useState<Element>(element)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  useEffect(() => { setDraft(element); setSaveMsg('') }, [element.id])

  const set = <K extends keyof Element>(field: K, value: Element[K]) => {
    setDraft(prev => ({ ...prev, [field]: value }))
    setSaveMsg('')
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const updated = await updateElement(draft.id, draft)
      onSave(updated)
      setSaveMsg('Saved')
    } catch {
      setSaveMsg('Save failed')
    } finally {
      setSaving(false)
    }
  }

  const isDirty = JSON.stringify(draft) !== JSON.stringify(element)

  return (
    <div className="flex flex-col h-full text-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-gray-900">{element.symbol}</span>
          <span className="text-gray-500">{element.name}</span>
          <span className="text-gray-300 text-xs">#{element.atomicNumber}</span>
          {element.isRadioactive && <span className="text-orange-400 text-xs">radioactive</span>}
          {element.isSynthetic && <span className="text-purple-400 text-xs">synthetic</span>}
        </div>
        <button onClick={onClose} className="text-gray-300 hover:text-gray-500 text-lg leading-none">&times;</button>
      </div>

      {/* Scrollable fields */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">

        <Section title="Real World">
          <TextareaField label="What it is" value={draft.elementDescription} onChange={v => set('elementDescription', v)} rows={3} />
          <TextareaField label="Where found" value={draft.whereFound} onChange={v => set('whereFound', v)} rows={2} />
          <TextareaField label="Used for" value={draft.usedFor} onChange={v => set('usedFor', v)} rows={2} />
          <TextareaField label="Fun fact" value={draft.funFact} onChange={v => set('funFact', v)} rows={2} />
        </Section>

        <Section title="Game Stats">
          <div className="grid grid-cols-2 gap-2">
            <SelectField
              label="Class"
              value={draft.cardClass ?? ''}
              options={['','forge','circuit','nucleus','bloom','aether','venom','catalyst','void']}
              onChange={v => set('cardClass', v || null)}
            />
            <NumField label="Electron Cost" value={draft.electronCost} onChange={v => set('electronCost', v)} />
            <NumField label="Attack" value={draft.attack} onChange={v => set('attack', v)} />
            <NumField label="HP" value={draft.healthPoints} onChange={v => set('healthPoints', v)} />
            <SelectField label="Rarity" value={draft.rarity} options={['common','uncommon','rare','epic','legendary']} onChange={v => set('rarity', v)} />
            {element.isRadioactive && (
              <NumField label="Decay Counter" value={draft.decayCounter} onChange={v => set('decayCounter', v)} />
            )}
            <SelectField label="Status" value={draft.cardStatus} options={['draft','in_review','complete','balanced']} onChange={v => set('cardStatus', v)} />
          </div>
        </Section>

        <Section title="Character & Flavor">
          <TextField label="Character Name" value={draft.characterName} onChange={v => set('characterName', v)} />
          <TextareaField label="Lore" value={draft.loreDescription} onChange={v => set('loreDescription', v)} />
          <TextareaField label="Fun Fact" value={draft.funFact} onChange={v => set('funFact', v)} />
        </Section>

        <Section title="Ability">
          <TextField label="Ability Name" value={draft.abilityName} onChange={v => set('abilityName', v)} />
          <SelectField
            label="Type"
            value={draft.abilityType ?? ''}
            options={['','passive','on_play','on_attack','on_death','triggered','decay']}
            onChange={v => set('abilityType', v || null)}
          />
          <TextareaField label="Description" value={draft.abilityDescription} onChange={v => set('abilityDescription', v)} />
          <TextareaField label="Dev Notes (internal)" value={draft.abilityNotes} onChange={v => set('abilityNotes', v)} />
        </Section>

        <Section title="Artwork">
          <TextField label="Artwork URL" value={draft.artworkUrl} onChange={v => set('artworkUrl', v)} />
          <SelectField label="Artwork Status" value={draft.artworkStatus} options={['needed','in_progress','complete']} onChange={v => set('artworkStatus', v)} />
          {draft.artworkUrl && (
            <img src={draft.artworkUrl} alt={element.name} className="mt-1 w-full rounded border border-gray-200 object-contain max-h-40" />
          )}
        </Section>

        <Section title="Design Notes (internal)">
          <TextareaField label="" value={draft.designNotes} onChange={v => set('designNotes', v)} />
        </Section>

        <Section title="Identity">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-400">
            <span>Atomic mass: {element.atomicMass}</span>
            <span>Period: {element.period}</span>
            <span>Group: {element.groupNumber ?? '—'}</span>
            <span>State: {element.stateAtRoomTemp}</span>
          </div>
        </Section>

      </div>

      {/* Save bar */}
      <div className="border-t border-gray-200 px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <button
          onClick={handleSave}
          disabled={!isDirty || saving}
          className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm font-medium disabled:opacity-30 hover:bg-blue-700 transition-colors"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
        {saveMsg && (
          <span className={`text-xs ${saveMsg === 'Saved' ? 'text-green-500' : 'text-red-500'}`}>{saveMsg}</span>
        )}
        {isDirty && !saveMsg && <span className="text-xs text-gray-300">Unsaved changes</span>}
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      {title && <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{title}</h3>}
      <div className="space-y-2">{children}</div>
    </section>
  )
}

function TextField({ label, value, onChange }: { label: string; value: string | null | undefined; onChange: (v: string | null) => void }) {
  return (
    <div>
      {label && <label className="block text-xs text-gray-400 mb-0.5">{label}</label>}
      <input
        type="text"
        value={value ?? ''}
        onChange={e => onChange(e.target.value || null)}
        className="w-full border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
  )
}

function NumField({ label, value, onChange }: { label: string; value: number | null | undefined; onChange: (v: number | null) => void }) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-0.5">{label}</label>
      <input
        type="number"
        value={value ?? ''}
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
        {options.map(o => (
          <option key={o} value={o}>{o.replace(/_/g, ' ') || '—'}</option>
        ))}
      </select>
    </div>
  )
}
