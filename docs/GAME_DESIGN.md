# Elements Card Game — Design Document

> Living document. Iterate freely. Nothing here is final until we start building.

---

## Concept

A turn-based digital card game where each card is a periodic table element with a unique character design, lore, and ability. Elements share traits with their chemical families, creating natural card synergies. Inspired by Hearthstone's accessibility and Magic: The Gathering's strategic depth.

**Platform path:** Browser (v1) → iOS/Android via Capacitor (v2) → Multiplayer (v3)

---

## Core Resource System

### Electrons (Mana)
- Your spendable resource. Starts at 1, auto-increments by 1 each turn, caps at 10.
- You spend electrons to play cards.
- Chemically grounded: electrons are the currency of chemical reactions.

### Atomic Number (Proton Count) → Card Cost & Power
- Every element's atomic number is its natural power ranking (H=1, Og=118).
- Higher atomic number = stronger card = costs more electrons.
- The power curve is already built into the periodic table — we don't invent it.

### Neutrons → Stability Stat
- Each card has a neutron count (real value from the element).
- Neutrons function as a defense or "stability" buffer.
- **Radioactive elements** have unstable neutron counts — they gain the Decay mechanic (see below).

### Health
- Each player starts with 30 HP (subject to playtesting).
- Health is separate from the electron system.
- Element cards have Attack and Health stats (like Hearthstone minions).

---

## Turn Structure

1. **Draw** — draw 1 card (start with 4 in hand)
2. **Electron Gain** — electron pool increases by 1 (max 10)
3. **Main Phase** — play cards, activate abilities, arrange board
4. **Attack Phase** — your element cards on the board can attack opponent's elements or opponent directly
5. **End Turn** — pass to opponent (or AI)

Unspent electrons do **not** carry over (keeps turns snappy, like Hearthstone).

---

## Two-Layer Identity System

Every element card has two distinct identities that work together:

### Class (deck archetype / thematic identity)
There are 8 classes. Your deck is built around one class — only cards belonging to that class (plus a small number of neutral cards) can go in your deck. Classes are thematic, not strictly periodic table groups. An element's class is assigned based on its personality, real-world role, and how it fits the game's story — not purely its chemistry.

**Class names and element assignments are a draft — to be finalized with family input.** See CARD_CATEGORIES.md.

### Family (periodic table group / passive mechanical trait)
Every card also belongs to a periodic table family (alkali metal, halogen, noble gas, etc.). This gives the card a passive mechanical trait shared by all family members. Family is determined purely by chemistry and never changes.

**The distinction:** Class controls deck building. Family controls the passive mechanic. A card can be a *Halogen by family* (corrosive passive) while belonging to the *Venom class* (deck archetype). Both layers are always active.

---

## Card Types

### Element Cards (Minions)
The primary card type. Each element is a character that lives on the board, can attack, and has a unique ability.

**Stats on every card:**
- `Name` — element name + atomic symbol
- `Atomic Number` — determines cost (electrons) and base power tier
- `Attack` / `Health` — combat stats
- `Class` — deck archetype this card belongs to (see Class System above)
- `Family` — periodic table group, determines passive trait
- `Ability` — unique power, inspired by the element's real-world properties
- `Flavor text` — short lore blurb giving the element its character/story

### Reaction Cards (Spells)
One-time effects. Represent chemical reactions or phenomena.
Examples: *Oxidation* (deal damage to a metal card), *Nuclear Fission* (split a radioactive card's damage across two targets)

### Catalyst Cards (Ongoing Effects / Enchantments)
Stay in play and modify rules. Represent catalysts that change the conditions of a reaction.

---

## Element Families & Shared Traits

Each element's **family** (periodic table group) gives it a passive trait that all members share. These are chemistry-based and fixed — they don't change with class reassignments.

| Category | Real Elements | Shared Trait (Draft) |
|---|---|---|
| **Alkali Metals** | Li, Na, K, Rb, Cs, Fr | Aggressive — +1 Attack when played. Highly reactive, low defense. |
| **Alkaline Earth Metals** | Be, Mg, Ca, Sr, Ba, Ra | Sturdy — enter play with a neutron shield (absorb 1 hit). |
| **Transition Metals** | Fe, Cu, Zn, Au, Ag, Ti, etc. | Versatile — each has a unique secondary effect beyond their base ability. |
| **Post-Transition Metals** | Al, Pb, Sn, etc. | Malleable — can copy the category trait of an adjacent card. |
| **Metalloids** | B, Si, As, Te, etc. | Semiconductors — switch between aggressive and defensive mode each turn. |
| **Nonmetals** | C, N, O, S, P, Se | Reactive — their abilities trigger off opponent actions (reactive, not proactive). |
| **Halogens** | F, Cl, Br, I, At | Corrosive — deal 1 bonus damage per turn to cards they've attacked (lingering debuff). |
| **Noble Gases** | He, Ne, Ar, Kr, Xe, Rn | Inert — see Noble Gas section below. |
| **Lanthanides** | Ce, Nd, Eu, Gd, etc. | Rare Earth — powerful abilities, high electron cost, hard to obtain. |
| **Actinides** | U, Pu, Ra, Cm, etc. | Radioactive — gain Decay mechanic (see below). |

---

## Special Mechanics

### Decay (Radioactive Elements)
Radioactive element cards are among the most powerful in the game, but they're unstable.
- Each radioactive card has a **Decay Counter** starting at a set number (e.g., 3).
- At the end of each of your turns, the counter drops by 1.
- When it hits 0, the card transforms — it either dies or becomes its decay product (a weaker element card).
- Example: Uranium-238 decays into Thorium-234. The Thorium card is weaker but stable.
- This creates a risk/reward: radioactive cards hit hard but you're racing against the clock.

### Noble Gas Reserve (Developer Utility + Player Mechanic)
Noble gases are chemically inert — they don't react with other elements.

**In gameplay:**
- Noble gas cards cannot be targeted by opponent abilities (true to their inert nature).
- They provide utility effects rather than raw damage: shields, heals, card draw, electron generation.
- He: *Levitate* — one of your cards can't be attacked this turn ("floating")
- Ne: *Illuminate* — reveal opponent's hand for one turn
- Ar: *Inert Shell* — give a card +2 defense until end of turn
- Kr: *Kryptonite* — reduce target card's attack to 0 for one turn
- Xe: *Anesthetic* — put a target card to sleep (skip its next attack)
- Rn: *Radioactive Inert* — only noble gas with decay mechanic; powerful but unstable

**As a design tool:**
Noble gases are reserved as our design escape valve. When we find a mechanic hole (e.g., there's no good counter to a certain strategy), we fill it with a noble gas ability before reaching for other solutions.

---

## Rarity Tiers (Placeholder — to be scoped separately)

| Rarity | Elements | Notes |
|---|---|---|
| Common | Most nonmetals, alkali metals, common transition metals | Low atomic number, accessible |
| Uncommon | Alkaline earths, halogens, metalloids | Mid-tier |
| Rare | Lanthanides, heavier transition metals (Au, Pt, Ti) | Powerful abilities |
| Epic | Actinides, noble gases | Decay mechanic, inert utility |
| Legendary | Oganesson (118), Tennessine (117), synthetic elements | One-of-a-kind, game-defining abilities |

> Gold (Au) is rare despite being a transition metal — culturally significant, deserves special treatment.

---

## Win Condition

Reduce opponent's HP to 0 by attacking with element cards directly (when no blockers are on their side) or through spell damage.

---

## Open Questions (To Resolve Before Building)

- [ ] Do cards attack any turn they're played, or do they have a "summoning sickness" delay (like MTG, unlike Hearthstone)? 
- [ ] How many cards per deck? (Hearthstone: 30, MTG: 60+)
- [ ] Is there a hand size limit?
- [ ] What does the AI opponent look like for v1? (Rule-based greedy AI vs. something smarter)
- [ ] Do we want an elemental type-advantage system (like fire beats ice)? This could map to chemical reactivity but adds complexity.
- [ ] How does card acquisition work eventually — packs, crafting, progression?

---

## Out of Scope for v1

- Multiplayer
- Card collection / rarity unlocking
- Account system / persistence
- Mobile app packaging
- Monetization
