# Card Categories — Classes & Families

> Two layers: **Class** controls deck building (like Hearthstone classes). **Family** controls the passive mechanical trait (chemistry-based, fixed).
>
> Class names and element assignments below are a **working draft**. Finalize with family input before building the deck system.

---

## Part 1 — Classes (Deck Archetypes)

8 classes, each with ~10–15 elements. Deck building is class-locked — you build around one class. Elements are assigned to a class by thematic fit, not strict chemistry. Some elements could plausibly belong to multiple classes; the assignment is a design decision.

A small pool of **Neutral** cards (likely noble gases and a few others) can go in any deck.

---

### Forge
**Theme:** Industrial strength, construction, durability. These are the metals that built civilization.
**Playstyle:** Defensive, high-HP walls. Reward slow, deliberate play. Hard to kill, low burst damage.
**Draft elements:** Fe, Ti, Al, Cr, Mn, W, Mo, Ni, V, Nb, Ta, Zr, Hf, Re
**Count:** ~14

---

### Circuit
**Theme:** Electricity, technology, semiconductors, modern computing.
**Playstyle:** Synergistic — cards amplify each other. Weak in isolation, powerful in combinations. Conductor cards gain bonuses when connected to other Circuit cards on the board.
**Draft elements:** Cu, Ag, Si, Ge, Ga, In, Se, Te, Co, Nd, Dy, Er, Sm, Gd
**Count:** ~14

---

### Nucleus
**Theme:** Radioactive elements, nuclear energy, decay chains. Raw, unstable power.
**Playstyle:** Highest damage ceiling in the game. All Nucleus cards have the Decay mechanic — they count down and either transform or die. Best used to win fast before the countdown runs out.
**Draft elements:** U, Pu, Ra, Th, Fr, Rn, Po, Am, Cm, Ac, Pa, Np, Pm, Bk, Cf
**Count:** ~15

---

### Bloom
**Theme:** Life, biology, organic chemistry. The elements that make living things possible.
**Playstyle:** Healing, regeneration, card draw, buffing allies. Support class. Wins by outlasting opponents, not out-damaging them.
**Draft elements:** C, H, N, O, P, S, Ca, Mg, K, Na, Zn, I, Se, Co, Mo, B
**Count:** ~16

---

### Aether
**Theme:** Noble, inert, untouchable. Exists above the fray.
**Playstyle:** Utility and control. Aether cards cannot be targeted by abilities (noble gas family passive). No direct damage — instead disrupts, shields, and manipulates. Neutral cards are drawn from this class.
**Draft elements:** He, Ne, Ar, Kr, Xe, Rn, Pt, Ir, Os, Rh, Ru, Pd
**Count:** ~12
> Note: Noble gases are the Neutral pool candidates. Pt group metals (Pt, Ir, Os, Rh, Ru, Pd) are precious, rare, and inert enough to fit here.

---

### Venom
**Theme:** Toxic, corrosive, poisonous. Elements that harm over time.
**Playstyle:** Debuff and attrition. Venom cards apply lingering damage counters. Poor in fast games — thrives when the game goes long and counters stack up.
**Draft elements:** As, Pb, Hg, Cd, Tl, Be, F, Cl, Sb, Bi, Ba, Br, At, Cs
**Count:** ~14

---

### Catalyst
**Theme:** Transformation, reactions, changing the conditions of the board. These elements make other things happen.
**Playstyle:** Spell-heavy. Catalyst cards modify board rules, reduce costs, trigger chain effects. Fewer minions, more reaction and catalyst cards. Rewards reading the board and setting up combos.
**Draft elements:** Li, Rb, Mg, Mn, Ce, Eu, La, Pr, Tb, Yb, Lu, Sc, Y, Zr
**Count:** ~14

---

### Void
**Theme:** Synthetic, superheavy, theoretical. Elements that barely exist — made in labs for milliseconds.
**Playstyle:** High-variance wildcards. Void cards have a Probability Counter instead of a Decay Counter — each turn there's a chance the card vanishes back to your hand at a discount. Extremely powerful effects but unpredictable timing. Only one of each Void card per deck.
**Draft elements:** Rf, Db, Sg, Bh, Hs, Mt, Ds, Rg, Cn, Nh, Fl, Mc, Lv, Ts, Og
**Count:** ~15 (all synthetic elements 104–118)

---

### Class Balance Check

| Class | Draft Count | Target |
|---|---|---|
| Forge | 14 | 12–15 |
| Circuit | 14 | 12–15 |
| Nucleus | 15 | 12–15 |
| Bloom | 16 | 12–16 |
| Aether | 12 | 10–14 |
| Venom | 14 | 12–15 |
| Catalyst | 14 | 12–15 |
| Void | 15 | 13–15 |
| **Total assigned** | **114** | |
| Unassigned / Neutral | ~4 | |

> Some elements appear in multiple categories above (Se, Co, Zr). Final assignment TBD with family input. The goal is thematic fit, not strict chemistry.

---

### Open Class Questions (For Family Input)

- [ ] Are the class names right? These are placeholders — the names should feel like the world of the game. "Forge" and "Bloom" feel strong. "Catalyst" and "Circuit" are more abstract.
- [ ] Which class should Hydrogen go in? It's chemically an alkali metal but thematically belongs in Bloom (life) or Nucleus (fusion/energy).
- [ ] Should Gold (Au) be in Forge (it's a metal) or Aether (rare, precious, inert)?
- [ ] Do all 6 noble gases stay in Aether as Neutral cards, or should Radon (radioactive) move to Nucleus?
- [ ] Should Bloom have a subclass for "macro" life elements (C, H, O, N) vs "trace" life elements (Zn, I, Se, Co)?
- [ ] Can a player build a deck with two classes mixed? Or strictly one class + neutrals?

---

## Part 2 — Families (Passive Traits)

Chemistry-based groupings that give each card its passive mechanical trait. These are fixed by the periodic table and never change regardless of class assignment.

| Family | Elements | Passive Trait |
|---|---|---|
| **Alkali Metals** | Li, Na, K, Rb, Cs, Fr | Reactive Burst — splash 1 damage to adjacent enemy on attack |
| **Alkaline Earth Metals** | Be, Mg, Ca, Sr, Ba, Ra | Neutron Shield — enter with 1 shield that absorbs 1 hit |
| **Transition Metals** | Sc–Zn, Y–Cd, Hf–Hg, Rf–Cn | Variable Oxidation — switch between two modes once per turn |
| **Post-Transition Metals** | Al, Ga, In, Sn, Tl, Pb, Bi, Nh, Fl, Mc, Lv | Malleable — copy adjacent card's family passive until end of turn |
| **Metalloids** | B, Si, Ge, As, Sb, Te, Po | Semiconductor — choose Metal mode (+1 ATK) or Nonmetal mode (+1 DEF) each turn |
| **Nonmetals** | H, C, N, O, P, S, Se | Reactive — abilities trigger off opponent actions |
| **Halogens** | F, Cl, Br, I, At, Ts | Corrosive — attacked cards gain a Corrode counter (+1 damage taken from all sources) |
| **Noble Gases** | He, Ne, Ar, Kr, Xe, Rn, Og | Inert — cannot be targeted by opponent abilities |
| **Lanthanides** | La–Lu | Magnetic — when played, reveal one random card from opponent's hand |
| **Actinides** | Ac–Lr | Radioactive Decay — all actinides have a Decay Counter |

---

## Family Synergy Notes

- **Salt Formation:** A Halogen card + an Alkali Metal card on the same board both gain +2/+2 (they naturally react to form salt)
- **Hydrogen Fusion:** Two Hydrogen cards attacking the same target deal double damage and generate a Helium card in hand
- **Carbon Allotropes:** Carbon has three playable forms — choose Graphite, Diamond, or Fullerene when played (card draw / defense / AoE damage)
- **Decay Chains:** Some Actinide cards transform into a specific other element when their Decay Counter hits 0 (U → Th, Ra → Rn, etc.)
