# UI & Component Contract: Quote of the Day Web App

**Feature**: Quote of the Day Web App  
**Spec Reference**: [`specs/001-quote-of-the-day/spec.md`](file:///Users/berfin/spec-kit-week2/specs/001-quote-of-the-day/spec.md)  
**Contract Type**: DOM Structure, Event & Accessibility Contract  

---

## 1. DOM Hierarchy & Semantic Elements

The UI contract defines the mandatory element IDs, classes, and accessibility attributes in `index.html`.

```html
<main class="app-container" role="main">
  <article class="quote-card" aria-live="polite">
    <div class="quote-content">
      <blockquote id="quote-text" class="quote-text">
        <!-- Rendered quote text goes here -->
      </blockquote>
      <p class="quote-author-container">
        — <cite id="quote-author" class="quote-author"><!-- Rendered author goes here --></cite>
      </p>
    </div>

    <div class="card-actions">
      <button 
        id="favorite-btn" 
        class="btn btn-favorite" 
        type="button" 
        aria-pressed="false" 
        aria-label="Add quote to favorites">
        <span id="favorite-icon" class="favorite-icon" aria-hidden="true">☆</span>
        <span id="favorite-label" class="favorite-label">Favorite</span>
      </button>

      <button 
        id="new-quote-btn" 
        class="btn btn-primary" 
        type="button">
        New Quote
      </button>
    </div>
  </article>
</main>
```

---

## 2. Visual Palette Contract

The application implements a soft powder pink and cream visual theme:

| Role | Color Hex | Contrast Target | Details |
| :--- | :--- | :--- | :--- |
| **Page Background** | `#FFF3ED` (Cream) | — | Soft, warm background tone |
| **Quote Card Background** | `#FFFFFF` (White) | — | Clean surface with subtle elevation shadow |
| **Primary Buttons & Accents** | `#D987A5` (Powder Pink) | $\ge 3:1$ for UI controls | Button fills, borders, active favorite indicator |
| **Primary & Body Typography** | `#633E4E` (Dark Plum) | $\ge 4.5:1$ (WCAG AA) | $9.0:1$ on White card, $8.2:1$ on Cream page |

---

## 3. Element Contract Table

| Element ID | Tag | Purpose | Required Accessibility Attributes |
| :--- | :--- | :--- | :--- |
| `quote-text` | `<blockquote>` | Displays the current quote text in dark plum (`#633E4E`). | Inside an `aria-live="polite"` container. |
| `quote-author` | `<cite>` | Displays the author in dark plum (`#633E4E`). | Semantic citation styling. |
| `favorite-btn` | `<button>` | Toggles favorite state with powder pink accent (`#D987A5`). | `type="button"`, `aria-pressed="true\|false"`, dynamic `aria-label`. |
| `favorite-icon` | `<span>` | Visual indicator icon. | `aria-hidden="true"`. |
| `favorite-label` | `<span>` | Visible textual state indicator ("Favorite" vs "Favorited"). | Dynamically toggles based on active quote status. |
| `new-quote-btn` | `<button>` | Fetches and displays a new random quote. | `type="button"`, standard accessible button name. |

---

## 4. UI State Representations

### 4.1 Unfavorited State
- `favorite-btn` has `aria-pressed="false"`.
- `aria-label` set to `"Add quote to favorites"`.
- `favorite-btn` does NOT have class `is-favorited`.
- `favorite-label` text content is `"Favorite"`.
- `favorite-icon` rendered with outline star `☆`.

### 4.2 Favorited State
- `favorite-btn` has `aria-pressed="true"`.
- `aria-label` set to `"Remove quote from favorites"`.
- `favorite-btn` HAS class `is-favorited`.
- `favorite-label` text content is `"Favorited"`.
- `favorite-icon` rendered with filled star `★` in powder pink accent (`#D987A5`).

---

## 5. Keyboard Navigation Contract

- All interactive controls (`#favorite-btn`, `#new-quote-btn`) MUST be reachable sequentially via the `Tab` key.
- Each interactive element MUST display a high-contrast focus indicator (minimum 3:1 contrast against adjacent background) when focused via keyboard (`:focus-visible`).
- Activation MUST respond to both `Enter` and `Space` keypresses naturally through the native `<button>` element.
