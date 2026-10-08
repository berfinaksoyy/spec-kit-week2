# Quote of the Day Web App

A clean, accessible, and responsive single-page Quote of the Day web application built using **plain vanilla HTML5, CSS3, and modern JavaScript (ES2020+)** with **zero external dependencies, build tools, or backend frameworks**.

Designed with a warm and inviting **soft powder pink and cream palette**:
- **Cream Page Background**: `#FFF3ED`
- **White Quote Card**: `#FFFFFF`
- **Powder Pink Buttons & Accents**: `#D987A5`
- **Dark Plum Typography**: `#633E4E`

---

## Core Features

1. **Random Quote on Load**: Instantly displays a randomly selected thought-provoking quote and its author from an immutable built-in catalog of 12 curated quotes inside a clean white card.
2. **Non-Repeating New Quote Generator**: The powder pink "New Quote" button loads a different quote on every click, guaranteeing no immediate consecutive repetition.
3. **Persistent Favorites**: Bookmark favorite quotes with immediate visual powder pink accent feedback. Bookmarks persist across page reloads and browser sessions using browser `localStorage` with graceful in-memory degradation if storage is restricted.

---

## Quality Requirements

- **Universal Accessibility (WCAG 2.1 AA)**:
  - High-contrast dark plum text on white card ($9.0:1$ contrast ratio, exceeding WCAG AAA).
  - Semantic HTML5 structure (`<main>`, `<article>`, `<blockquote>`, `<cite>`, `<button>`).
  - Full keyboard navigability with visible `:focus-visible` dark plum outlines.
  - Screen reader support with dynamic `aria-live="polite"` quote announcements and `aria-pressed` / `aria-label` state synchronization.
- **Fluid Responsive Design**: Mobile-first CSS Grid and Flexbox layout ensuring seamless readability across all viewports from 320px up to 1440px+ without horizontal clipping.
- **Automated Self-Test Harness**: Zero-dependency test suite directly callable in developer tools (`window.runAppTests()`).

---

## File Structure

```text
/
├── index.html        # Accessible HTML5 markup, landmarks, and controls
├── style.css         # Powder pink & cream CSS3 styling, variables, accessible focus
├── script.js         # Built-in quotes catalog, non-repeating picker, state & storage logic
├── README.md         # Documentation, palette specs, and usage guide
└── specs/            # Spec Kit specification, plan, and task artifacts
```

---

## Getting Started

### Option 1: Direct File Open (Zero Setup)
Double-click `index.html` or open it directly in any modern browser (`Chrome`, `Firefox`, `Safari`, `Edge`):
```bash
open index.html   # macOS
xdg-open index.html # Linux
start index.html  # Windows
```

### Option 2: Local Static Server (Optional)
Run using any standard static HTTP server:
```bash
python3 -m http.server 8000
# Open http://localhost:8000 in your browser
```

---

## Keyboard Navigation

| Key | Target | Action |
| :--- | :--- | :--- |
| `Tab` | Any control | Moves focus forward through interactive buttons. |
| `Shift + Tab` | Any control | Moves focus backward. |
| `Space` or `Enter` | `Favorite` Button | Toggles favorite status for the currently displayed quote. |
| `Space` or `Enter` | `New Quote` Button | Displays a new non-repeating random quote. |

---

## Running Verification & Tests

### In-Browser Self-Tests
Open developer tools (`F12` or `Option+Cmd+I`), switch to the **Console** tab, and execute:
```javascript
window.runAppTests();
```
This runs automated assertions validating:
1. Catalog completeness ($\ge 10$ quotes).
2. Schema integrity (non-empty `id`, `text`, `author`).
3. Unique identifier integrity.
4. Non-repeating consecutive selection over 50 iterations.
5. Persistent storage serialization and error fallbacks.

---

## License

MIT
