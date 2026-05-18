import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Conflict resolutions:
//   Se(34)  → circuit  (semiconductor > biological)
//   Co(27)  → bloom    (Vitamin B12, biological trace element)
//   Mo(42)  → forge    (molybdenum steel alloy, industrial)
//   Mg(12)  → bloom    (chlorophyll, biological)
//   Mn(25)  → forge    (steel alloy)
//   Zr(40)  → forge    (aerospace/industrial)
//   Rn(86)  → nucleus  (radioactive trumps noble gas)
//
// Unassigned → assigned here:
//   Sr(38)  → bloom    (bones/teeth, like Ca)
//   Tc(43)  → nucleus  (radioactive)
//   Sn(50)  → forge    (bronze, industrial)
//   Ho(67)  → catalyst (lanthanide)
//   Tm(69)  → catalyst (lanthanide)
//   Au(79)  → aether   (precious, relatively inert, noble metal)
//   Es-Lr (99-103) → nucleus (actinides)

const assignments: Record<number, string> = {
  // Bloom — life, biology, organic chemistry
  1:  'bloom',  // H
  5:  'bloom',  // B
  6:  'bloom',  // C
  7:  'bloom',  // N
  8:  'bloom',  // O
  11: 'bloom',  // Na
  12: 'bloom',  // Mg
  15: 'bloom',  // P
  16: 'bloom',  // S
  19: 'bloom',  // K
  20: 'bloom',  // Ca
  27: 'bloom',  // Co
  30: 'bloom',  // Zn
  38: 'bloom',  // Sr
  53: 'bloom',  // I

  // Aether — noble, inert, precious, untouchable
  2:  'aether', // He
  10: 'aether', // Ne
  18: 'aether', // Ar
  36: 'aether', // Kr
  44: 'aether', // Ru
  45: 'aether', // Rh
  46: 'aether', // Pd
  54: 'aether', // Xe
  76: 'aether', // Os
  77: 'aether', // Ir
  78: 'aether', // Pt
  79: 'aether', // Au

  // Venom — toxic, corrosive, poisonous
  4:  'venom',  // Be
  9:  'venom',  // F
  17: 'venom',  // Cl
  33: 'venom',  // As
  35: 'venom',  // Br
  48: 'venom',  // Cd
  51: 'venom',  // Sb
  55: 'venom',  // Cs
  56: 'venom',  // Ba
  80: 'venom',  // Hg
  81: 'venom',  // Tl
  82: 'venom',  // Pb
  83: 'venom',  // Bi
  85: 'venom',  // At

  // Forge — industrial strength, construction, durability
  13: 'forge',  // Al
  22: 'forge',  // Ti
  23: 'forge',  // V
  24: 'forge',  // Cr
  25: 'forge',  // Mn
  26: 'forge',  // Fe
  28: 'forge',  // Ni
  40: 'forge',  // Zr
  41: 'forge',  // Nb
  42: 'forge',  // Mo
  50: 'forge',  // Sn
  72: 'forge',  // Hf
  73: 'forge',  // Ta
  74: 'forge',  // W
  75: 'forge',  // Re

  // Circuit — electricity, technology, semiconductors
  14: 'circuit', // Si
  29: 'circuit', // Cu
  31: 'circuit', // Ga
  32: 'circuit', // Ge
  34: 'circuit', // Se
  47: 'circuit', // Ag
  49: 'circuit', // In
  52: 'circuit', // Te
  60: 'circuit', // Nd
  62: 'circuit', // Sm
  64: 'circuit', // Gd
  66: 'circuit', // Dy
  68: 'circuit', // Er

  // Catalyst — transformation, reactions, board manipulation
  3:  'catalyst', // Li
  21: 'catalyst', // Sc
  37: 'catalyst', // Rb
  39: 'catalyst', // Y
  57: 'catalyst', // La
  58: 'catalyst', // Ce
  59: 'catalyst', // Pr
  63: 'catalyst', // Eu
  65: 'catalyst', // Tb
  67: 'catalyst', // Ho
  69: 'catalyst', // Tm
  70: 'catalyst', // Yb
  71: 'catalyst', // Lu

  // Nucleus — radioactive, nuclear energy, decay
  43:  'nucleus', // Tc
  61:  'nucleus', // Pm
  84:  'nucleus', // Po
  86:  'nucleus', // Rn
  87:  'nucleus', // Fr
  88:  'nucleus', // Ra
  89:  'nucleus', // Ac
  90:  'nucleus', // Th
  91:  'nucleus', // Pa
  92:  'nucleus', // U
  93:  'nucleus', // Np
  94:  'nucleus', // Pu
  95:  'nucleus', // Am
  96:  'nucleus', // Cm
  97:  'nucleus', // Bk
  98:  'nucleus', // Cf
  99:  'nucleus', // Es
  100: 'nucleus', // Fm
  101: 'nucleus', // Md
  102: 'nucleus', // No
  103: 'nucleus', // Lr

  // Void — synthetic, superheavy, barely-exist elements
  104: 'void', // Rf
  105: 'void', // Db
  106: 'void', // Sg
  107: 'void', // Bh
  108: 'void', // Hs
  109: 'void', // Mt
  110: 'void', // Ds
  111: 'void', // Rg
  112: 'void', // Cn
  113: 'void', // Nh
  114: 'void', // Fl
  115: 'void', // Mc
  116: 'void', // Lv
  117: 'void', // Ts
  118: 'void', // Og
}

async function main() {
  const total = Object.keys(assignments).length
  console.log(`Assigning classes to ${total} elements...`)

  for (const [id, cardClass] of Object.entries(assignments)) {
    await prisma.element.update({
      where: { id: parseInt(id) },
      data: { cardClass },
    })
  }

  // Print summary
  const counts: Record<string, number> = {}
  for (const cls of Object.values(assignments)) {
    counts[cls] = (counts[cls] ?? 0) + 1
  }
  console.log('\nClass breakdown:')
  for (const [cls, count] of Object.entries(counts).sort()) {
    console.log(`  ${cls.padEnd(10)} ${count}`)
  }
  console.log(`\nTotal: ${total}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
