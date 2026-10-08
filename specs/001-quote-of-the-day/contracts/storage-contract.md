# Storage Contract: Quote of the Day Web App

**Feature**: Quote of the Day Web App  
**Spec Reference**: [`specs/001-quote-of-the-day/spec.md`](file:///Users/berfin/spec-kit-week2/specs/001-quote-of-the-day/spec.md)  
**Contract Type**: Client-Side Persistence Specification  

---

## 1. Storage Overview

The application uses standard browser `window.localStorage` to store user favorite quotes. Because the application runs entirely client-side without a backend, this contract defines the exact storage keys, serialized data structure, validation rules, and error-handling requirements.

---

## 2. Key & Data Specification

| Property | Value |
| :--- | :--- |
| **Storage Key** | `"quote_of_the_day_favorites"` |
| **Data Format** | JSON-serialized array of positive integers (`number[]`) |
| **Max Expected Size** | $< 1\text{ KB}$ (array of numbers up to total quote count) |
| **Persistence Duration** | Indefinite (until user clears browser cache/storage) |

### Example Serialized Value
```json
[1, 5, 8]
```

---

## 3. Storage API Interface Contract

### 3.1 `loadFavorites()`
Reads and returns the list of favorited quote IDs from storage.

- **Signature**: `loadFavorites(): number[]`
- **Behavior**:
  1. Calls `localStorage.getItem("quote_of_the_day_favorites")`.
  2. If key is missing/null, returns `[]`.
  3. Parses JSON string inside a `try...catch` block.
  4. Validates that the parsed data is an array of positive integers: `Array.isArray(parsed) && parsed.every(id => Number.isInteger(id) && id > 0)`.
  5. If parsing or validation fails, catches the error, logs a console warning, and returns `[]`.
- **Error Guarantee**: Never throws; always returns a valid JavaScript `Array<number>`.

### 3.2 `saveFavorites(ids: number[])`
Persists the given list of favorited quote IDs to storage.

- **Signature**: `saveFavorites(ids: number[]): boolean`
- **Behavior**:
  1. Converts `ids` to unique numeric array.
  2. Serializes array to JSON via `JSON.stringify(ids)`.
  3. Executes `localStorage.setItem("quote_of_the_day_favorites", jsonString)` inside a `try...catch` block.
  4. Returns `true` on success.
  5. Catches any `DOMException` (e.g. `QuotaExceededError`, `SecurityError`), logs a descriptive warning, and returns `false`.
- **Error Guarantee**: Never crashes the host application if storage is unavailable or disabled.
