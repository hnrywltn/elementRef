# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A turn-based digital card game where every card is a periodic table element with a unique character, lore, and ability. Inspired by Hearthstone (accessible, auto-incrementing mana) and Magic: The Gathering (strategic depth). See `GAME_DESIGN.md` for rules, `CARD_CATEGORIES.md` for element families, `ROADMAP.md` for the build plan, and `ADMIN_SPEC.md` for the card management tool spec.

**Platform path:** Browser (Phase 1) → iOS/Android via Capacitor (Phase 4) → Multiplayer (Phase 6)

## Tech Stack

| Layer | Technology |
|---|---|
| Game frontend | React + TypeScript |
| Admin panel | React + TypeScript (same repo, separate app) |
| Backend / API | Node.js + Express + TypeScript |
| Database | SQLite (local) → PostgreSQL (prod) via Prisma |
| Mobile | Capacitor (wraps the web app — do not use React Native) |
| Game state | Zustand |
| Animations | Framer Motion |
| Admin table | TanStack Table + shadcn/ui |

## Core Game Mechanics (don't redesign without checking GAME_DESIGN.md)

- **Electrons** = mana. Start at 1, auto-increment by 1 per turn, cap at 10. Unspent electrons do NOT carry over.
- **Atomic number** = card cost/power tier. Higher atomic number → stronger card → more electrons to play.
- **Neutrons** = stability/defense stat on cards.
- **Decay Counter** = mechanic for radioactive/actinide cards. Decrements each turn; card transforms or dies at 0.
- **Noble gases** are reserved as a design escape valve. When a mechanic gap is found, fill it with a noble gas ability before other solutions.

## Project Structure (once built)

```
elementsGame/
  packages/
    api/          — Express backend, Prisma schema, seed scripts
    game/         — React game client
    admin/        — React admin panel (internal tool)
  docs/GAME_DESIGN.md        — Rules, mechanics, open questions
  docs/CARD_CATEGORIES.md   — Element classes and families
  docs/ADMIN_SPEC.md        — Admin panel DB schema, API endpoints, UI spec
  docs/ROADMAP.md           — Phased build plan with checkboxes
  docs/NOTABLE_PEOPLE.md    — 15 scientists connected to the elements
  docs/FUTURE_IDEAS.md      — Loose brainstorm, not planned
  docs/MOLECULES.md         — 50 most significant molecules
  docs/MOLECULAR_STRUCTURE.md — Isomers, chirality, polymers, ring structures
  docs/BRANCHES_OF_CHEMISTRY.md — Core and specialized chemistry branches
```

## Running the Dev Servers

```bash
cd api && npm run dev    # port 3001 — restart this after any schema change
cd admin && npm run dev  # port 5173
```

After adding a field to `api/prisma/schema.prisma`, run `npx prisma db push` then **restart the API server** — the running process holds the old generated Prisma client in memory and won't see new fields until restarted.

## Build Order

Always start with Phase 0 (admin panel + data layer) before touching the game engine. The admin panel is how all 118 cards get authored. The game engine reads from the same database. Do not hardcode card data.

## Key Design Constraints

- Cards authored in the admin panel are the source of truth — the game engine reads cards with `card_status: complete` or `balanced` only.
- Ability logic in the game engine must be data-driven where possible (type + parameters), not hardcoded per card.
- Single-player vs AI before any multiplayer work. The AI opponent for Phase 1 is intentionally simple (greedy).
- Carbon (C) has 3 forms (Allotrope mechanic). Hydrogen (H) has a Fusion combo with a second Hydrogen card. Handle these as special cases early.
