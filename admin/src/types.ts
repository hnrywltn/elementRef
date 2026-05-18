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

  characterName: string | null
  loreDescription: string | null
  funFact: string | null
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
