# Admin Panel Specification

> Internal tool only — not public-facing. Used to manage the full element card database: write lore, set game stats, upload artwork, track design status.

---

## Purpose

A spreadsheet-style web UI backed by a REST API and a database. This is the content management system for the card game — every element card is authored here before it goes into the game engine.

---

## Database Schema

### `elements` table

#### Identity (from periodic table — seeded, rarely changed)
| Field | Type | Notes |
|---|---|---|
| `id` | integer (PK) | Atomic number (1–118). The natural primary key. |
| `name` | string | e.g., "Hydrogen" |
| `symbol` | string | e.g., "H" |
| `atomic_number` | integer | Same as `id` — explicit for clarity |
| `atomic_mass` | float | Standard atomic weight |
| `category` | enum | alkali_metal, alkaline_earth, transition_metal, post_transition, metalloid, nonmetal, halogen, noble_gas, lanthanide, actinide, synthetic |
| `period` | integer | Row in periodic table (1–7) |
| `group_number` | integer (nullable) | Column (1–18). Null for lanthanides/actinides. |
| `state_at_room_temp` | enum | solid, liquid, gas, synthetic |
| `is_radioactive` | boolean | True for radioactive elements |
| `is_synthetic` | boolean | True for elements only made in labs (Tc, Pm, 93+) |

#### Game Stats (set by designer)
| Field | Type | Notes |
|---|---|---|
| `electron_cost` | integer | Electrons to play this card (1–10). Defaults to derived value from atomic number but overridable. |
| `attack` | integer | How much damage this card deals when it attacks |
| `health_points` | integer | How much damage this card can take before dying |
| `rarity` | enum | common, uncommon, rare, epic, legendary |
| `decay_counter` | integer (nullable) | Starting decay count for radioactive/actinide cards. Null = no decay. |
| `decay_product_id` | integer (nullable, FK → elements.id) | What element this card transforms into when decay hits 0 |

#### Character & Flavor (written by designer)
| Field | Type | Notes |
|---|---|---|
| `character_name` | string (nullable) | Optional nickname/persona (e.g., "Helios" for Helium) |
| `lore_description` | text | The character's story, personality, and role in the world |
| `fun_fact` | text | A real-world fact about the element (shown on card) |
| `ability_name` | string | Name of the card's unique ability |
| `ability_description` | text | What the ability does, written in plain language for the player |
| `ability_type` | enum | passive, on_play, on_attack, on_death, triggered, decay |
| `ability_notes` | text | Internal designer notes on implementation edge cases |

#### Assets
| Field | Type | Notes |
|---|---|---|
| `artwork_url` | string (nullable) | Path/URL to the card's PNG artwork |
| `artwork_status` | enum | needed, in_progress, complete |

#### Internal Tracking
| Field | Type | Notes |
|---|---|---|
| `card_status` | enum | draft, in_review, complete, balanced |
| `design_notes` | text | Private notes for internal design/dev use. Not shown to players. |
| `created_at` | timestamp | Auto-set |
| `updated_at` | timestamp | Auto-updated on every save |

---

## API Endpoints

```
GET    /api/elements              — list all elements (with filters)
GET    /api/elements/:id          — single element by atomic number
POST   /api/elements/:id          — update element fields (partial update)
GET    /api/elements/export/json  — export all complete cards as game-ready JSON
POST   /api/elements/:id/artwork  — upload PNG artwork for a card
DELETE /api/elements/:id/artwork  — remove artwork for a card
```

**Query params for GET /api/elements:**
- `category` — filter by element family
- `rarity` — filter by rarity
- `status` — filter by card_status
- `is_radioactive` — true/false
- `has_artwork` — true/false (artwork_url is not null)
- `search` — search by name or symbol

---

## Admin UI — Views

### Main Table View
- All 118 rows visible at once (virtual scrolling if needed)
- Columns: Symbol, Name, Category, Cost, Attack, HP, Rarity, Status, Artwork (icon)
- Click any row to open the detail/edit panel
- Sortable by any column
- Filter bar (category, rarity, status, is_radioactive, artwork status)
- Bulk status update (select multiple → change status)
- Color-coded rows by category (matches the card colors in the game)

### Card Detail / Edit Panel
Opens as a side panel or modal when a row is clicked. Organized in sections:

**Identity** (read-only, pre-seeded from periodic table data)
- Atomic number, name, symbol, atomic mass, period, group, state, is_radioactive, is_synthetic, category

**Game Stats** (editable)
- Electron cost (number input, 1–10, shows derived default)
- Attack / Health Points (number inputs)
- Rarity (dropdown)
- Decay Counter (number input, enabled only if is_radioactive = true)
- Decay Product (element search/select, enabled only if decay_counter is set)

**Character & Flavor** (editable — the creative work)
- Character Name (text)
- Lore Description (textarea)
- Fun Fact (textarea)
- Ability Name (text)
- Ability Description (textarea)
- Ability Type (dropdown)
- Ability Notes (textarea, labeled "Internal only")

**Artwork**
- Current artwork preview (if uploaded)
- Upload button (accepts PNG)
- Artwork status dropdown
- Remove artwork button

**Internal**
- Card Status (dropdown: Draft / In Review / Complete / Balanced)
- Design Notes (textarea)
- Created / Updated timestamps (read-only)

### Progress Dashboard (optional Phase 0 addition)
- Cards complete: X / 118
- Cards with artwork: X / 118
- By category: progress bar per family
- By rarity: count per tier

---

## Derived / Auto-Calculated Fields

These are suggestions/defaults shown in the UI but always overridable by the designer:

| Field | Derivation | Notes |
|---|---|---|
| `electron_cost` | `ceil(atomic_number / 13)` (gives range 1–10 across 118 elements) | Rough starting point |
| `attack` | Based on atomic number tier + category aggression modifier | To be defined during Phase 1 balancing |
| `health_points` | Based on atomic mass + category defense modifier | To be defined during Phase 1 balancing |
| `decay_counter` | Default 3 for actinides, 4 for radioactive non-actinides | Override per card |

---

## Tech Stack for Admin Panel

| Layer | Technology |
|---|---|
| Backend | Node.js + Express + TypeScript |
| Database | SQLite (local dev) → PostgreSQL (production) |
| ORM | Prisma (handles migrations cleanly, good TypeScript types) |
| Admin Frontend | React + TypeScript |
| UI Components | TanStack Table (spreadsheet view) + shadcn/ui (form components) |
| File Storage | Local filesystem (dev) → S3 or Cloudflare R2 (production) |
| Auth | None for v1 (internal tool, localhost only) |

---

## Seed Data Plan

1. Pull base element data from a public periodic table JSON dataset (name, symbol, atomic number, atomic mass, category, period, group, state, is_radioactive)
2. All 118 elements inserted as `card_status: draft` with game stats empty
3. Designer fills in abilities, lore, and stats progressively
4. Game engine only reads cards with `card_status: complete` or `balanced`

---

## Open Questions

- [ ] Do we want version history on card stats? (useful for balancing: "what did this card's stats look like 3 weeks ago?")
- [ ] Should ability_description be plain text or a structured format (so the game engine can parse it directly)?
- [ ] How do we handle variant cards? (e.g., Carbon's 3 Allotrope forms — one card or three separate entries?)
- [ ] Where does artwork come from? AI-generated, commissioned artist, or both?
