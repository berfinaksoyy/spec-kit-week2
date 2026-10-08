# Phase 0 Research: Technical Decisions for Quote of the Day Web App

**Feature**: Quote of the Day Web App  
**Spec Reference**: [`specs/001-quote-of-the-day/spec.md`](file:///Users/berfin/spec-kit-week2/specs/001-quote-of-the-day/spec.md)  
**Constitution Reference**: [`.specify/memory/constitution.md`](file:///Users/berfin/spec-kit-week2/.specify/memory/constitution.md)  

---

## 1. Project Organization & Code Architecture

- **Decision**: Single-directory static web project organized strictly into three root files:
  - `index.html`: Semantic HTML5 document with landmarks and accessible elements.
  - `style.css`: Clean, modular CSS3 stylesheet utilizing custom properties and modern layout modules (Flexbox/Grid).
  - `script.js`: Self-contained vanilla JavaScript module (ES2020+) containing data, state management, and DOM bindings.
- **Rationale**: Adheres directly to Constitution Principle I (Plain Web Standards & Zero External Dependencies) and Principle II (Simplicity & Beginner-Friendly Readability). It can be opened directly via the browser `file://` protocol or any static HTTP server without a build, bundle, or compile step.
- **Alternatives Considered**:
  - *Multi-file module imports (`<script type="module">`)*: Rejected because local `file://` execution triggers CORS restrictions with ES modules in certain browsers (e.g., Chrome), violating the requirement for zero-friction local execution.
  - *Monolithic single-file HTML (inline CSS/JS)*: Rejected because separating structure, presentation, and logic improves readability and maintainability for beginners.

---

## 2. Quote Dataset & Non-Repeating Random Selection Algorithm

- **Decision**:
  - Define an immutable array of at least 10 quote objects in `script.js`, each with `{ id: number, text: string, author: string }`.
  - To pick an initial quote on load: select a random index uniformly via `Math.floor(Math.random() * quotes.length)`.
  - To pick a "New Quote" without repeating the currently displayed quote (satisfying FR-004): filter the array or sample from candidates where `candidate.id !== currentQuoteId`, then select randomly among the remaining items.
- **Rationale**: Filtering or indexing out the active quote is strictly deterministic, guaranteed $O(1)$ expected performance for small arrays, and simple to comprehend for beginners.
- **Alternatives Considered**:
  - *Pure unconstrained `Math.random()`*: Rejected because it allows immediate consecutive repetition when the same random index is generated twice in a row.
  - *Shuffled Deck / Permutation Queue*: Rejected as overly complex; tracking a shuffled cycle adds unnecessary state overhead for a simple Quote of the Day app where users expect truly random discovery.

---

## 3. Persistent Client-Side Storage Schema & Resilience

- **Decision**:
  - Store favorited quotes under the `localStorage` key `"quote_of_the_day_favorites"` as a JSON-serialized array of numeric IDs (e.g., `[1, 4, 9]`).
  - Keep an in-memory `Set<number>` during runtime for $O(1)$ lookup (`favoritesSet.has(currentQuote.id)`).
  - Wrap all `localStorage` access in defensive `try...catch` blocks. If `localStorage` is unavailable or throws (e.g., private browsing security restrictions or quota errors), log a gentle warning and fall back seamlessly to an in-memory `Set` for the duration of the session.
- **Rationale**: Storing only IDs avoids data redundancy with the built-in quote list and prevents out-of-sync content. Adheres to Constitution Principle IV (Robust Client-Side Persistence).
- **Alternatives Considered**:
  - *Storing entire quote objects in `localStorage`*: Rejected because storing duplicated text wastes storage and creates data synchronization bugs if quote text is edited.
  - *Storing individual keys per quote (e.g., `fav_quote_1: true`)*: Rejected because it pollutes the `localStorage` namespace and makes clearing or inspecting favorites difficult.

---

## 4. Accessibility & Semantic User Interface

- **Decision**:
  - Use semantic HTML tags: `<header>`, `<main>`, `<article>`, `<blockquote>`, `<cite>`, and `<button>`.
  - The Favorite toggle is an HTML `<button>` configured with `aria-pressed="true|false"` and an informative `aria-label` (e.g., "Add quote to favorites" / "Remove quote from favorites").
  - The quote container or notification area includes `aria-live="polite"` so screen readers announce newly loaded quotes smoothly without moving keyboard focus away from the active control.
  - Interactive elements have distinct, high-contrast `:focus-visible` outlines (WCAG 2.1 AA compliant).
- **Rationale**: Complies with Constitution Principle III (Accessibility & Responsive Design First) and satisfies spec requirements FR-011 and FR-012.
- **Alternatives Considered**:
  - *Moving keyboard focus to the quote block on every "New Quote" click*: Rejected because it disorients keyboard users who want to click "New Quote" multiple times.
  - *Using a checkbox `<input type="checkbox">` for the favorite toggle*: Rejected because a styled semantic `<button>` with `aria-pressed` offers a cleaner, more predictable cross-browser button UX.

---

## 5. Responsive Design & Styling Strategy

- **Decision**:
  - Use modern, vanilla CSS3: CSS custom properties (variables) for color palettes, spacing, and typography; Flexbox and CSS Grid for layout.
  - Mobile-first layout with fluid sizing (`rem`, `ch`, `%`, `clamp()`), and media queries targeting small screens (`min-width: 480px`, `min-width: 768px`).
  - Card container with centered alignment, subtle shadow, readable typography, and responsive button groupings.
- **Rationale**: Meets WCAG AA contrast standards, guarantees 0 horizontal overflow from 320px to 1440px+, and requires no external styling frameworks (Constitution Principle I).
- **Alternatives Considered**:
  - *CSS framework (Tailwind / Bootstrap)*: Prohibited by the constitution.
  - *Fixed pixel widths*: Rejected because fixed layouts cause horizontal clipping on mobile devices.

---

## 6. Testing Strategy (Zero-Dependency & Beginner-Friendly)

- **Decision**:
  - Two-level testing strategy:
    1. **In-browser Automated Sanity Suite**: A self-contained, standalone test runner function in a lightweight test file (`test.html` or inline test harness callable in the browser console via `runAppTests()`) that asserts:
       - Catalog size $\ge 10$ quotes with valid `id`, `text`, and `author`.
       - Quote selection does not repeat the current quote across consecutive selections.
       - Favorite toggle adds/removes quote IDs correctly.
       - `localStorage` serialization, deserialization, and error fallback operate as expected.
    2. **Manual Acceptance Verification Matrix**: A structured verification procedure in `quickstart.md` testing keyboard navigation, screen reader accessibility, viewport responsiveness (320px-1440px), and page refresh persistence.
- **Rationale**: Delivers 100% testable verification without violating Constitution Principle I (Zero External Dependencies) or Principle V (Feature Verification & Testability).
- **Alternatives Considered**:
  - *Node-based testing framework (Jest, Mocha)*: Rejected because introducing `npm`, `package.json`, or Node runtimes violates the zero-build-tool constitution constraint.
