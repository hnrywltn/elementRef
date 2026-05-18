export interface Element {
  id: number
  name: string
  symbol: string
  atomicNumber: number
  atomicMass: number | null
  category: string
  period: number | null
  groupNumber: number | null
  stateAtRoomTemp: string | null
  isRadioactive: boolean
  isSynthetic: boolean

  cardClass: string | null
  electronCost: number | null
  attack: number | null
  healthPoints: number | null
  rarity: string
  decayCounter: number | null
  decayProductId: number | null

  elementDescription: string | null
  whereFound: string | null
  usedFor: string | null
  funFact: string | null

  characterName: string | null
  loreDescription: string | null
  abilityName: string | null
  abilityDescription: string | null
  abilityType: string | null
  abilityNotes: string | null

  artworkUrl: string | null
  artworkStatus: string
  cardStatus: string
  designNotes: string | null
  createdAt: string
  updatedAt: string
}

export interface CharacterReference {
  id: number
  elementId: number
  characterName: string
  showOrMovie: string | null
  actorName: string | null
  notes: string | null
  addedBy: string | null
  createdAt: string
  updatedAt: string
}

export interface ElementWithRefs {
  id: number
  name: string
  symbol: string
  category: string
  cardClass: string | null
  characterReferences: CharacterReference[]
}

export interface ElementRef {
  id: number
  name: string
  symbol: string
  category: string
  cardClass: string | null
}

export interface PersonElement {
  id: number
  personId: number
  elementId: number
  relation: string
  element: ElementRef
}

export interface Person {
  id: number
  name: string
  born: number | null
  died: number | null
  nationality: string | null

  biography: string | null
  contribution: string | null
  gameAngle: string | null
  funFact: string | null
  relatedElements: string | null

  artworkUrl: string | null
  artworkStatus: string
  cardStatus: string
  designNotes: string | null
  createdAt: string
  updatedAt: string

  elementRelations: PersonElement[]
}
