# Tasks: Quote of the Day Web App

**Feature**: Quote of the Day Web App  
**Spec Reference**: [`specs/001-quote-of-the-day/spec.md`](file:///Users/berfin/spec-kit-week2/specs/001-quote-of-the-day/spec.md)  
**Plan Reference**: [`specs/001-quote-of-the-day/plan.md`](file:///Users/berfin/spec-kit-week2/specs/001-quote-of-the-day/plan.md)  
**Data Model**: [`specs/001-quote-of-the-day/data-model.md`](file:///Users/berfin/spec-kit-week2/specs/001-quote-of-the-day/data-model.md)  
**Contracts**: [`specs/001-quote-of-the-day/contracts/`](file:///Users/berfin/spec-kit-week2/specs/001-quote-of-the-day/contracts/)  

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, file structure, and theme variables

- [X] T001 Create project file scaffold with `index.html`, `style.css`, and `script.js` at repository root
- [X] T002 [P] Define HTML5 skeleton with viewport meta, UTF-8 charset, title, and asset link tags in `index.html`
- [X] T003 [P] Define CSS custom properties with powder pink and cream palette (`--color-bg: #FFF3ED`, `--color-card-bg: #FFFFFF`, `--color-accent: #D987A5`, `--color-text: #633E4E`), reset, and accessible focus rules in `style.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data structures, storage helpers, and foundational layout required across all user stories

**⚠️ CRITICAL**: Core foundations must be established before user story work proceeds.

- [X] T004 Define immutable built-in catalog of 12+ curated quotes with `{ id: number, text: string, author: string }` conforming to data model validation rules in `script.js`
- [X] T005 Implement defensive `loadFavorites()` and `saveFavorites()` helpers with `localStorage` error handling and in-memory `Set` fallback in `script.js`
- [X] T006 Setup foundational semantic accessible card layout (`aria-live="polite"`, `<article>`, `<main>`) in `index.html`
- [X] T007 Implement base card layout on cream background (`#FFF3ED`) with white card (`#FFFFFF`) and dark plum typography (`#633E4E`) in `style.css`

**Checkpoint**: Foundation ready — user story implementation can proceed.

---

## Phase 3: User Story 1 - Random Quote on Page Load (Priority: P1) 🎯 MVP

**Goal**: Automatically select and render a randomly chosen quote and author attribution from the built-in catalog immediately upon initial page load within the styled card.

**Independent Test**: Open `index.html` in a clean browser session; verify a non-empty quote text and corresponding author attribution render immediately from the quotes catalog in dark plum text within the white card on cream background.

### Implementation for User Story 1

- [X] T008 [US1] Implement `getRandomQuote()` selection function from the built-in quotes catalog in `script.js`
- [X] T009 [US1] Implement `renderQuote(quote)` function updating `#quote-text` and `#quote-author` DOM elements in `script.js`
- [X] T010 [US1] Wire `DOMContentLoaded` event listener to trigger initial random quote display on page load in `script.js`
- [X] T011 [US1] Style blockquote text, quotation punctuation, and author citation using dark plum typography (`#633E4E`) with responsive fluid sizing in `style.css`

**Checkpoint**: At this point, User Story 1 (MVP) is fully functional and independently testable.

---

## Phase 4: User Story 2 - Discover New Random Quotes (Priority: P2)

**Goal**: Enable users to click a "New Quote" button to load a different random quote while guaranteeing the new quote is not identical to the currently displayed quote.

**Independent Test**: Click or activate the "New Quote" button via mouse or keyboard; confirm that the displayed quote updates to a different quote from the catalog without a full page reload and never repeats the immediately preceding quote.

### Implementation for User Story 2

- [X] T012 [US2] Add semantic "New Quote" button element with ID `new-quote-btn` in `index.html`
- [X] T013 [US2] Implement `getNextQuote(currentId)` function filtering out the current quote ID before random selection to prevent consecutive duplicates in `script.js`
- [X] T014 [US2] Bind click event listener to `#new-quote-btn` to trigger `getNextQuote()` and re-render quote in `script.js`
- [X] T015 [US2] Style `#new-quote-btn` with powder pink styling (`#D987A5`), hover, active states, and visible focus rings in `style.css`

**Checkpoint**: User Stories 1 and 2 both work independently and integrate seamlessly.

---

## Phase 5: User Story 3 - Favorite Toggle with Persistent Storage (Priority: P3)

**Goal**: Allow users to toggle the favorite status of the active quote, display immediate visual feedback using powder pink accents, and persist favorited quote IDs in `localStorage` across page refreshes.

**Independent Test**: Click the favorite toggle on a displayed quote; verify the visual indicator updates to active/favorited; refresh the page and verify that the quote retains its favorited state when re-displayed.

### Implementation for User Story 3

- [X] T016 [US3] Add favorite toggle button with `#favorite-icon`, `#favorite-label`, and `aria-pressed="false"` attributes in `index.html`
- [X] T017 [US3] Implement `updateFavoriteUI(isFavorited)` function updating `aria-pressed`, label text ("Favorite" vs. "Favorited"), and active classes in `script.js`
- [X] T018 [US3] Implement `toggleFavorite()` handler updating in-memory `Set` and persisting via `saveFavorites()` in `script.js`
- [X] T019 [US3] Synchronize favorite toggle state whenever a quote is displayed (on load and on new quote navigation) in `script.js`
- [X] T020 [US3] Style `#favorite-btn` for inactive and active (`.is-favorited`) states with powder pink accents (`#D987A5`) and high-contrast indicators in `style.css`

**Checkpoint**: User Stories 1, 2, and 3 are functional and state persists across reloads.

---

## Phase 6: Polish & Cross-Cutting Quality

**Purpose**: Automated test suite, edge-case verification, responsive layout validation, and documentation.

- [X] T021 [P] Implement zero-dependency automated verification function `runAppTests()` asserting catalog validity, non-repetition, and storage serialization in `script.js`
- [X] T022 Add defensive edge case handling for storage quotas, corrupt storage data, and rapid button clicking in `script.js`
- [X] T023 Verify responsive layout (320px to 1440px) and keyboard navigation across all three core user stories in `style.css` and `specs/001-quote-of-the-day/quickstart.md`
- [X] T024 [P] Document project setup, soft powder pink and cream palette specifications, and usage instructions in `README.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — executes immediately.
- **Foundational (Phase 2)**: Depends on Setup completion — blocks all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
  - Phase 3 (US1 - MVP): No dependencies on other stories.
  - Phase 4 (US2): Can proceed after Foundational; integrates with US1 display.
  - Phase 5 (US3): Can proceed after Foundational; integrates with current quote ID from US1/US2.
- **Polish (Phase 6)**: Validates and documents all three user stories.

### User Story Dependencies

```mermaid
graph TD
    P1[Phase 1: Setup] --> P2[Phase 2: Foundational]
    P2 --> US1[Phase 3: US1 Random Quote on Load (MVP)]
    P2 --> US2[Phase 4: US2 New Quote Button]
    P2 --> US3[Phase 5: US3 Favorite Toggle & Storage]
    US1 --> P6[Phase 6: Polish & Cross-Cutting Quality]
    US2 --> P6
    US3 --> P6
```

---

## Parallel Opportunities

- **Setup Phase**: T002 (`index.html`) and T003 (`style.css`) can run concurrently.
- **Foundational Phase**: T006 (`index.html`) and T007 (`style.css`) can run concurrently once T004/T005 are ready.
- **Polish Phase**: T021 (`script.js` tests) and T024 (`README.md`) can run concurrently.

---

## Implementation Strategy

### MVP First (User Story 1 Only)
1. Complete Phase 1: Setup (T001 - T003).
2. Complete Phase 2: Foundational (T004 - T007).
3. Complete Phase 3: User Story 1 (T008 - T011).
4. **STOP and VALIDATE**: Open `index.html` in browser; verify random quote loads on page load with dark plum text on white card and cream background. Deliverable MVP is complete!

### Incremental Delivery
1. Foundation + US1 → Test independently → Deliver MVP.
2. Add US2 ("New Quote" button with non-repetition and powder pink styling) → Test independently.
3. Add US3 (Favorite toggle & localStorage persistence with powder pink indicator) → Test independently.
4. Polish (Automated assertions, edge cases, responsive checks, documentation) → Final release.
