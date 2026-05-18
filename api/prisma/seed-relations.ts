import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Person IDs match seed-people.ts insertion order (1-indexed, autoincrement)
// Element IDs = atomic number
//
// Relation types:
//   discovered    — first to identify or isolate in any form
//   co_discovered — worked with others; shared credit
//   isolated      — first to produce as a pure element (vs as a compound)
//   named         — gave the element its name
//   named_after   — element named in their honor posthumously or while living
//   synthesized   — artificially produced in a lab

const relations: { personId: number; elementId: number; relation: string }[] = [
  // Dmitri Mendeleev (1) — Md named after him
  { personId: 1, elementId: 101, relation: 'named_after' },

  // Marie Curie (2) — discovered Po and Ra
  { personId: 2, elementId: 84, relation: 'discovered' },
  { personId: 2, elementId: 88, relation: 'discovered' },

  // Pierre Curie (3) — co-discovered Po and Ra with Marie
  { personId: 3, elementId: 84, relation: 'co_discovered' },
  { personId: 3, elementId: 88, relation: 'co_discovered' },

  // Antoine Lavoisier (4) — named O and H; named them, didn't discover
  { personId: 4, elementId: 8,  relation: 'named' },
  { personId: 4, elementId: 1,  relation: 'named' },

  // Ernest Rutherford (5) — Rf named after him
  { personId: 5, elementId: 104, relation: 'named_after' },

  // Niels Bohr (6) — Bh named after him
  { personId: 6, elementId: 107, relation: 'named_after' },

  // Lise Meitner (7) — Mt named after her
  { personId: 7, elementId: 109, relation: 'named_after' },

  // Henry Moseley (8) — no single element, contribution was to all via atomic number
  // Left intentionally empty; noted in biography

  // Glenn T. Seaborg (9) — co-discovered 9 elements, Sg named after him
  { personId: 9, elementId: 94,  relation: 'co_discovered' }, // Pu
  { personId: 9, elementId: 95,  relation: 'co_discovered' }, // Am
  { personId: 9, elementId: 96,  relation: 'co_discovered' }, // Cm
  { personId: 9, elementId: 97,  relation: 'co_discovered' }, // Bk
  { personId: 9, elementId: 98,  relation: 'co_discovered' }, // Cf
  { personId: 9, elementId: 99,  relation: 'co_discovered' }, // Es
  { personId: 9, elementId: 100, relation: 'co_discovered' }, // Fm
  { personId: 9, elementId: 101, relation: 'co_discovered' }, // Md
  { personId: 9, elementId: 102, relation: 'co_discovered' }, // No
  { personId: 9, elementId: 106, relation: 'named_after'  }, // Sg

  // Humphry Davy (10) — isolated Na, K, Ca, Mg, Ba, B, Sr for the first time
  { personId: 10, elementId: 11, relation: 'isolated' }, // Na
  { personId: 10, elementId: 19, relation: 'isolated' }, // K
  { personId: 10, elementId: 20, relation: 'isolated' }, // Ca
  { personId: 10, elementId: 12, relation: 'isolated' }, // Mg
  { personId: 10, elementId: 56, relation: 'isolated' }, // Ba
  { personId: 10, elementId: 5,  relation: 'isolated' }, // B
  { personId: 10, elementId: 38, relation: 'isolated' }, // Sr

  // Carl Wilhelm Scheele (11) — discovered many elements, often lost credit
  { personId: 11, elementId: 8,  relation: 'discovered' }, // O (first, credit disputed with Priestley)
  { personId: 11, elementId: 17, relation: 'discovered' }, // Cl
  { personId: 11, elementId: 25, relation: 'discovered' }, // Mn
  { personId: 11, elementId: 42, relation: 'discovered' }, // Mo
  { personId: 11, elementId: 74, relation: 'discovered' }, // W (found the acid; brothers de Elhuyar isolated the metal)
  { personId: 11, elementId: 56, relation: 'discovered' }, // Ba (as barium oxide, before Davy isolated the metal)

  // Robert Bunsen (12) — discovered Cs and Rb via spectroscopy
  { personId: 12, elementId: 55, relation: 'discovered' }, // Cs
  { personId: 12, elementId: 37, relation: 'discovered' }, // Rb

  // Yuri Oganessian (13) — Og named after him; led synthesis of 113-118
  { personId: 13, elementId: 118, relation: 'named_after'  }, // Og
  { personId: 13, elementId: 114, relation: 'synthesized'  }, // Fl
  { personId: 13, elementId: 115, relation: 'synthesized'  }, // Mc
  { personId: 13, elementId: 116, relation: 'synthesized'  }, // Lv
  { personId: 13, elementId: 117, relation: 'synthesized'  }, // Ts

  // Enrico Fermi (14) — Fm named after him
  { personId: 14, elementId: 100, relation: 'named_after' }, // Fm

  // Alfred Nobel (15) — No named after him
  { personId: 15, elementId: 102, relation: 'named_after' }, // No
]

async function main() {
  console.log(`Seeding ${relations.length} person-element relations...`)

  for (const r of relations) {
    await prisma.personElement.upsert({
      where: { personId_elementId: { personId: r.personId, elementId: r.elementId } },
      update: { relation: r.relation },
      create: r,
    })
  }

  // Print summary by person
  const people = await prisma.person.findMany({
    include: { elementRelations: { include: { element: true } } },
    orderBy: { id: 'asc' },
  })

  console.log('\nRelations seeded:')
  for (const p of people) {
    if (p.elementRelations.length === 0) continue
    const els = p.elementRelations.map(r => `${r.element.symbol}(${r.relation})`).join(', ')
    console.log(`  ${p.name.padEnd(22)} ${els}`)
  }
  console.log(`\nTotal: ${relations.length} relations`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
