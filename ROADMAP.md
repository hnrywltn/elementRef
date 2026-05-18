# Build Roadmap

> Phased plan. Check off items as they're completed. Each phase should be playable/usable before moving to the next.

---

## Phase 0 — Foundation: Admin Panel + Data Layer
*Goal: A working internal tool to manage all 118 element cards before any game is built.*

### Backend API
- [ ] Initialize Node.js + Express project with TypeScript
- [ ] Set up SQLite (local dev) with a migration to PostgreSQL path
- [ ] Define element card schema (see ADMIN_SPEC.md)
- [ ] Seed database with all 118 elements (base data: name, symbol, atomic number, category, atomic mass)
- [ ] REST API endpoints: GET /elements, GET /elements/:id, POST /elements, PUT /elements/:id
- [ ] Image upload endpoint (store PNG reference locally, S3 path later)

### Admin UI
- [ ] Initialize React + TypeScript frontend
- [ ] Spreadsheet-style table view of all 118 elements (sortable, filterable by category)
- [ ] Inline editing for all fields
- [ ] Image upload + preview per card
- [ ] Status badge per card (Draft / In Review / Complete / Balanced)
- [ ] Filter by: category, rarity, status, is_radioactive
- [ ] Export to JSON (for game engine to consume)

---

## Phase 1 — Core Game Engine (Browser, Single Player)
*Goal: A working, playable single-player game in the browser with a small card set (~20 cards).*

### Game State & Logic
- [ ] Define TypeScript types: `Card`, `GameState`, `Player`, `BoardSlot`, `Turn`
- [ ] Implement turn structure (draw → gain electron → main phase → attack → end)
- [ ] Card play logic (spend electrons, place on board)
- [ ] Combat system (attack minion or face, damage calculation)
- [ ] Death handling (remove from board when health ≤ 0)
- [ ] Win/loss detection (hero HP ≤ 0)
- [ ] Electron pool management (auto-increment, cap at 10, spend on play)

### Card Abilities (First Pass)
- [ ] Passive abilities (always-on effects)
- [ ] On-play abilities (trigger when card is played)
- [ ] On-attack abilities (trigger when card attacks)
- [ ] On-death abilities (trigger when card dies)
- [ ] Category passive traits (all families)
- [ ] Decay mechanic (for Actinides and radioactive elements)

### Basic AI Opponent
- [ ] Greedy AI: plays highest-cost affordable card each turn
- [ ] Greedy AI: attacks face whenever possible
- [ ] Greedy AI: prioritizes trading with opponent's highest-attack card

### Browser UI
- [ ] Game board layout (player side, opponent side, hand, HP, electron pool)
- [ ] Card component (renders name, symbol, cost, attack, health, ability)
- [ ] Hand display (fanned cards, playable cards highlighted when affordable)
- [ ] Attack flow (click attacker → click target)
- [ ] Turn end button
- [ ] Game over screen (win/loss)

---

## Phase 2 — Full Card Set + Balance
*Goal: All 118 elements are designed, implemented, and roughly balanced.*

### Card Design
- [ ] All 118 element abilities written in CARD_CATEGORIES.md
- [ ] All abilities implemented in the game engine
- [ ] Noble gas abilities fully implemented (all 6)
- [ ] Decay chains for Actinides (at least 3 full chains)
- [ ] Cross-category synergies (Salt formation, Hydrogen fusion, etc.)

### Balancing
- [ ] Playtest all category matchups
- [ ] Adjust electron costs per card
- [ ] Adjust attack/health stats per card
- [ ] Adjust ability power levels
- [ ] Update GAME_DESIGN.md open questions based on playtesting

### Deck Building
- [ ] Deck builder UI (browse all cards, add/remove to deck)
- [ ] Deck validation rules (size limit, duplicates limit)
- [ ] Save/load deck configuration

---

## Phase 3 — Polish
*Goal: The game feels good to play, not just functional.*

- [ ] Card animations (play from hand, attack, death, ability trigger)
- [ ] Electron pool visual (orbs, not just a number)
- [ ] Sound effects (card play, attack, death, win, lose)
- [ ] Improved AI (evaluate board state, trade efficiently, manage curve)
- [ ] Tutorial / onboarding flow for first-time players
- [ ] Card artwork integrated (PNG assets from admin panel)
- [ ] Responsive layout (works on tablet screen sizes)

---

## Phase 4 — Mobile App (Capacitor)
*Goal: The browser game is packaged and submitted to iOS and Android app stores.*

- [ ] Integrate Capacitor into the project
- [ ] Touch interaction layer (tap to play, tap to attack, drag support)
- [ ] Mobile-optimized layout (portrait and landscape)
- [ ] iOS build + TestFlight submission
- [ ] Android build + Play Store internal testing
- [ ] App icons + splash screen
- [ ] App Store / Play Store listing assets (screenshots, description)
- [ ] Submit to Apple App Store
- [ ] Submit to Google Play Store

---

## Phase 5 — Card Collection + Rarity System
*Goal: Players earn and unlock cards. Rare cards feel rare.*

> Scope to be defined separately — see notes in GAME_DESIGN.md

- [ ] Define rarity weights per element (Common → Legendary)
- [ ] Card pack mechanic (open packs, reveal cards)
- [ ] Player account + persistent collection
- [ ] Card crafting / duplicate handling
- [ ] Starter deck (guaranteed set of cards on first play)
- [ ] Authentication (account creation, login)

---

## Phase 6 — Multiplayer
*Goal: Two real players can play against each other in real time.*

> Significant scope increase — plan separately when Phase 3 is complete.

- [ ] Game server (Node.js + Socket.io or similar)
- [ ] Server-authoritative game state (prevent cheating)
- [ ] Real-time sync between two clients
- [ ] Matchmaking (random opponent or friend invite)
- [ ] Reconnect handling (game survives a dropped connection)
- [ ] Game history / replay (optional)

---

## Milestones

| Milestone | Description | Status |
|---|---|---|
| M0 | Admin panel live, all 118 elements seeded | ⬜ Not started |
| M1 | Single-player game playable in browser (20 cards) | ⬜ Not started |
| M2 | Full 118-card set implemented and playable | ⬜ Not started |
| M3 | Game polished and feels shippable | ⬜ Not started |
| M4 | iOS + Android apps submitted to stores | ⬜ Not started |
| M5 | Rarity/collection system live | ⬜ Not started |
| M6 | Multiplayer live | ⬜ Not started |
