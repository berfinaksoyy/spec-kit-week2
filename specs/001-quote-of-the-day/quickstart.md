# Quickstart Validation Guide: Quote of the Day Web App

**Feature**: Quote of the Day Web App  
**Spec Reference**: [`specs/001-quote-of-the-day/spec.md`](file:///Users/berfin/spec-kit-week2/specs/001-quote-of-the-day/spec.md)  
**Data Model**: [`specs/001-quote-of-the-day/data-model.md`](file:///Users/berfin/spec-kit-week2/specs/001-quote-of-the-day/data-model.md)  
**Contracts**: [`specs/001-quote-of-the-day/contracts/`](file:///Users/berfin/spec-kit-week2/specs/001-quote-of-the-day/contracts/)  

---

## 1. Prerequisites & Launching

Because the application is built strictly with vanilla web standards and zero dependencies, no package installation, compilation, or build commands are required.

### Launch Options
- **Direct Browser File**:
  Double-click `index.html` or open it directly in any modern browser (`Chrome`, `Firefox`, `Safari`, `Edge`):
  ```bash
  open index.html # on macOS
  ```
- **Optional Static HTTP Server**:
  ```bash
  python3 -m http.server 8000
  # Then open http://localhost:8000
  ```

---

## 2. End-to-End Validation Scenarios

### Scenario 1: Initial Page Load (User Story P1)
1. **Action**: Open the application in a clean or incognito browser window.
2. **Expected Outcome**:
   - The page renders with a soft cream background (`#FFF3ED`).
   - A clean white quote card (`#FFFFFF`) displays quote text in dark plum (`#633E4E`) in `<blockquote>` and author attribution in `<cite>`.
   - The quote is chosen randomly from the built-in catalog of 10+ quotes.
   - The favorite button is in the default unfavorited state (`aria-pressed="false"`, label "Favorite").

---

### Scenario 2: New Quote Generation without Immediate Repetition (User Story P2)
1. **Action**:
   - Note the currently displayed quote.
   - Click the powder pink "New Quote" button (`#D987A5`).
2. **Expected Outcome**:
   - The quote changes immediately (< 100ms) to a different quote.
   - The new quote is NOT identical to the quote displayed immediately before the click.
   - Click "New Quote" 5 consecutive times: verify that no two consecutive clicks yield the exact same quote.

---

### Scenario 3: Toggle Favorite and Refresh Persistence (User Story P3)
1. **Action**:
   - On the displayed quote, click the "Favorite" button.
2. **Expected Outcome**:
   - The button state toggles immediately: `aria-pressed="true"`, visual state updates with powder pink highlight (`#D987A5`), label changes to "Favorited".
   - Open Browser DevTools (`F12`) -> Application/Storage -> Local Storage: key `"quote_of_the_day_favorites"` contains a JSON array containing the quote's numeric ID.
3. **Action (Persistence Test)**:
   - Refresh the page (`F5` or `Cmd+R`).
   - If a different quote loads on refresh, click "New Quote" until the favorited quote appears again.
4. **Expected Outcome**:
   - When the favorited quote is displayed, the favorite button automatically shows the active "Favorited" state.
5. **Action (Unfavorite Test)**:
   - Click the "Favorited" button again.
6. **Expected Outcome**:
   - Button returns to "Favorite" (`aria-pressed="false"`), and the ID is removed from `localStorage`.

---

### Scenario 4: Keyboard Navigation & Accessibility Verification (Quality Requirement)
1. **Action**:
   - Click the browser address bar, then use only the `Tab` key to navigate into the page.
2. **Expected Outcome**:
   - Focus outline clearly moves to the "Favorite" button and then to the "New Quote" button.
   - High-contrast visible focus rings appear around focused buttons.
   - Press `Enter` or `Space` while focused on "New Quote": a new quote loads.
   - Press `Shift+Tab` to move back to "Favorite", then press `Space`: favorite state toggles.

---

### Scenario 5: Responsive Viewport Adaptation (Quality Requirement)
1. **Action**:
   - Open DevTools Device Mode and simulate mobile viewports: `320px` (iPhone SE), `375px`, `768px` (tablet), and `1440px` (desktop).
2. **Expected Outcome**:
   - No horizontal scrollbars appear at any breakpoint.
   - Quote text and buttons remain centered, readable in dark plum (`#633E4E`), and properly padded inside the white card (`#FFFFFF`).
