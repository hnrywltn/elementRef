import type { Element, Person } from '../types'

export async function fetchElements(): Promise<Element[]> {
  const res = await fetch('/api/elements')
  if (!res.ok) throw new Error('Failed to fetch elements')
  return res.json()
}

export async function updateElement(id: number, data: Partial<Element>): Promise<Element> {
  const res = await fetch(`/api/elements/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update element')
  return res.json()
}

export async function fetchPeople(): Promise<Person[]> {
  const res = await fetch('/api/people')
  if (!res.ok) throw new Error('Failed to fetch people')
  return res.json()
}

export async function updatePerson(id: number, data: Partial<Person>): Promise<Person> {
  const res = await fetch(`/api/people/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update person')
  return res.json()
}
