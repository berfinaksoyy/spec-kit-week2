/**
 * Quote of the Day Web App
 * Plain JavaScript (ES2020+) - Zero External Dependencies
 */

(function () {
  "use strict";

  // ==========================================================================
  // 1. Built-in Quotes Catalog (FR-001)
  // At least 10 curated quotes with unique IDs, text, and author attribution.
  // ==========================================================================
  const QUOTES_CATALOG = [
    {
      id: 1,
      text: "Simplicity is the soul of efficiency.",
      author: "Austin Freeman"
    },
    {
      id: 2,
      text: "The secret of getting ahead is getting started.",
      author: "Mark Twain"
    },
    {
      id: 3,
      text: "It always seems impossible until it's done.",
      author: "Nelson Mandela"
    },
    {
      id: 4,
      text: "Do what you can, with what you have, where you are.",
      author: "Theodore Roosevelt"
    },
    {
      id: 5,
      text: "Quality is not an act, it is a habit.",
      author: "Aristotle"
    },
    {
      id: 6,
      text: "Act as if what you do makes a difference. It does.",
      author: "William James"
    },
    {
      id: 7,
      text: "The only limit to our realization of tomorrow will be our doubts of today.",
      author: "Franklin D. Roosevelt"
    },
    {
      id: 8,
      text: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.",
      author: "Antoine de Saint-Exupéry"
    },
    {
      id: 9,
      text: "Happiness is not something ready made. It comes from your own actions.",
      author: "Dalai Lama"
    },
    {
      id: 10,
      text: "In the middle of difficulty lies opportunity.",
      author: "Albert Einstein"
    },
    {
      id: 11,
      text: "You must be the change you wish to see in the world.",
      author: "Mahatma Gandhi"
    },
    {
      id: 12,
      text: "Stay hungry, stay foolish.",
      author: "Steve Jobs"
    }
  ];

  const STORAGE_KEY = "quote_of_the_day_favorites";
  const memoryStorage = new Map();

  // ==========================================================================
  // 2. Storage Helpers with Defensive Fallback (FR-007, Principle IV)
  // ==========================================================================

  /**
   * Safely returns localStorage or an in-memory fallback.
   * @returns {{ getItem: Function, setItem: Function, removeItem: Function }}
   */
  function getSafeStorage() {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        // Probe test to verify storage is not blocked by privacy modes
        const testKey = "__storage_probe__";
        window.localStorage.setItem(testKey, "1");
        window.localStorage.removeItem(testKey);
        return window.localStorage;
      }
      if (typeof localStorage !== "undefined") {
        return localStorage;
      }
    } catch (e) {
      console.warn("Storage restricted or unavailable. Using in-memory fallback.", e);
    }

    return {
      getItem: (key) => (memoryStorage.has(key) ? memoryStorage.get(key) : null),
      setItem: (key, val) => {
        memoryStorage.set(key, String(val));
      },
      removeItem: (key) => {
        memoryStorage.delete(key);
      }
    };
  }

  /**
   * Loads saved favorite quote IDs from storage.
   * Handles corrupt data, quota errors, or security restrictions safely.
   * @returns {number[]} Array of favorited quote IDs.
   */
  function loadFavorites() {
    try {
      const storage = getSafeStorage();
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Validate each item is a valid positive integer ID
        return parsed.filter(
          (id) => typeof id === "number" && Number.isInteger(id) && id > 0
        );
      }
      return [];
    } catch (err) {
      console.warn("Storage warning: Unable to parse favorites.", err);
      return [];
    }
  }

  /**
   * Persists favorited quote IDs to storage.
   * @param {number[]} ids Array of quote IDs.
   * @returns {boolean} True if persisted successfully, false on fallback.
   */
  function saveFavorites(ids) {
    try {
      const storage = getSafeStorage();
      const uniqueIds = Array.from(new Set(ids));
      storage.setItem(STORAGE_KEY, JSON.stringify(uniqueIds));
      return true;
    } catch (err) {
      console.warn("Storage warning: Unable to save favorites.", err);
      return false;
    }
  }

  // ==========================================================================
  // 3. Application State & Quote Selection Logic
  // ==========================================================================

  const appState = {
    quotes: QUOTES_CATALOG,
    currentQuote: null,
    favoriteIds: new Set(loadFavorites()),
    isProcessing: false
  };

  /**
   * Selects a uniformly random quote from the provided catalog.
   * @param {Array} catalog
   * @returns {Object} Quote object
   */
  function getRandomQuote(catalog = appState.quotes) {
    if (!catalog || catalog.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * catalog.length);
    return catalog[randomIndex];
  }

  /**
   * Selects a new quote, guaranteeing it does not repeat the current quote (FR-004).
   * @param {number} currentId ID of currently rendered quote
   * @param {Array} catalog
   * @returns {Object} New quote object
   */
  function getNextQuote(currentId, catalog = appState.quotes) {
    if (!catalog || catalog.length === 0) {
      return null;
    }
    if (catalog.length === 1) {
      return catalog[0];
    }
    const candidates = catalog.filter((q) => q.id !== currentId);
    return getRandomQuote(candidates);
  }

  // ==========================================================================
  // 4. DOM Bindings & UI Updates (UI Contract, FR-002, FR-006, FR-012)
  // ==========================================================================

  let domElements = {};

  function queryDOMElements() {
    domElements = {
      quoteCard: document.getElementById("quote-card"),
      quoteText: document.getElementById("quote-text"),
      quoteAuthor: document.getElementById("quote-author"),
      favoriteBtn: document.getElementById("favorite-btn"),
      favoriteIcon: document.getElementById("favorite-icon"),
      favoriteLabel: document.getElementById("favorite-label"),
      newQuoteBtn: document.getElementById("new-quote-btn")
    };
  }

  /**
   * Updates the visual indicator and accessibility attributes of the favorite button.
   * @param {boolean} isFavorited
   */
  function updateFavoriteUI(isFavorited) {
    if (!domElements.favoriteBtn) return;

    domElements.favoriteBtn.setAttribute(
      "aria-pressed",
      isFavorited ? "true" : "false"
    );
    domElements.favoriteBtn.setAttribute(
      "aria-label",
      isFavorited ? "Remove quote from favorites" : "Add quote to favorites"
    );

    if (isFavorited) {
      domElements.favoriteBtn.classList.add("is-favorited");
      if (domElements.favoriteIcon) domElements.favoriteIcon.textContent = "★";
      if (domElements.favoriteLabel) domElements.favoriteLabel.textContent = "Favorited";
    } else {
      domElements.favoriteBtn.classList.remove("is-favorited");
      if (domElements.favoriteIcon) domElements.favoriteIcon.textContent = "☆";
      if (domElements.favoriteLabel) domElements.favoriteLabel.textContent = "Favorite";
    }
  }

  /**
   * Renders the given quote to the DOM and synchronizes favorite state.
   * @param {Object} quote
   */
  function renderQuote(quote) {
    if (!quote) return;

    appState.currentQuote = quote;

    if (domElements.quoteText) {
      domElements.quoteText.textContent = quote.text;
    }

    if (domElements.quoteAuthor) {
      domElements.quoteAuthor.textContent = quote.author;
    }

    const isFav = appState.favoriteIds.has(quote.id);
    updateFavoriteUI(isFav);
  }

  /**
   * Handles user click on "New Quote" button.
   */
  function handleNewQuote() {
    if (appState.isProcessing) return;
    appState.isProcessing = true;

    try {
      const currentId = appState.currentQuote ? appState.currentQuote.id : null;
      const nextQuote = getNextQuote(currentId);
      if (nextQuote) {
        renderQuote(nextQuote);
      }
    } finally {
      appState.isProcessing = false;
    }
  }

  /**
   * Handles user click on Favorite toggle button (FR-005, FR-008, FR-009).
   */
  function handleToggleFavorite() {
    if (!appState.currentQuote) return;

    const quoteId = appState.currentQuote.id;
    const isCurrentlyFavorited = appState.favoriteIds.has(quoteId);

    if (isCurrentlyFavorited) {
      appState.favoriteIds.delete(quoteId);
    } else {
      appState.favoriteIds.add(quoteId);
    }

    // Persist to storage
    saveFavorites(Array.from(appState.favoriteIds));

    // Update UI immediately
    updateFavoriteUI(!isCurrentlyFavorited);
  }

  /**
   * Initializes the application.
   */
  function initApp() {
    queryDOMElements();

    if (domElements.newQuoteBtn) {
      domElements.newQuoteBtn.addEventListener("click", handleNewQuote);
    }

    if (domElements.favoriteBtn) {
      domElements.favoriteBtn.addEventListener("click", handleToggleFavorite);
    }

    // Initial random quote on load (FR-002)
    const initialQuote = getRandomQuote();
    renderQuote(initialQuote);
  }

  // Bind to DOM ready event
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initApp);
    } else {
      initApp();
    }
  }

  // ==========================================================================
  // 5. Automated In-Browser Self-Test Verification Suite (T025, Principle V)
  // Callable via window.runAppTests() in developer console or test runner
  // ==========================================================================

  function runAppTests() {
    const results = [];
    let allPassed = true;

    function assert(name, condition, details = "") {
      results.push({
        test: name,
        status: condition ? "PASS" : "FAIL",
        details: details || (condition ? "Assertion passed" : "Assertion failed")
      });
      if (!condition) allPassed = false;
    }

    // Test 1: Catalog completeness
    assert(
      "Catalog Size >= 10",
      QUOTES_CATALOG.length >= 10,
      `Catalog has ${QUOTES_CATALOG.length} quotes.`
    );

    // Test 2: Catalog validity
    const invalidQuotes = QUOTES_CATALOG.filter(
      (q) => !q.id || !q.text || !q.author || typeof q.id !== "number"
    );
    assert(
      "Catalog Schema Validity",
      invalidQuotes.length === 0,
      invalidQuotes.length === 0
        ? "All quotes contain valid id, text, and author."
        : `${invalidQuotes.length} quotes failed schema validation.`
    );

    // Test 3: ID Uniqueness
    const ids = QUOTES_CATALOG.map((q) => q.id);
    const uniqueIds = new Set(ids);
    assert(
      "Quote ID Uniqueness",
      ids.length === uniqueIds.size,
      `All ${uniqueIds.size} quote IDs are unique.`
    );

    // Test 4: Non-repeating getNextQuote
    let repeated = false;
    for (let i = 0; i < 50; i++) {
      const activeId = QUOTES_CATALOG[i % QUOTES_CATALOG.length].id;
      const next = getNextQuote(activeId, QUOTES_CATALOG);
      if (next.id === activeId) {
        repeated = true;
        break;
      }
    }
    assert(
      "Non-Repeating Selection",
      !repeated,
      repeated
        ? "getNextQuote returned the same active quote!"
        : "50 consecutive tests verified no duplicate quote selection."
    );

    // Test 5: Storage Serialization & Deserialization
    const testIds = [1, 5, 9];
    const saved = saveFavorites(testIds);
    const loaded = loadFavorites();
    const storageMatches =
      saved &&
      loaded.length === testIds.length &&
      testIds.every((id) => loaded.includes(id));
    assert(
      "Storage Serialization Roundtrip",
      storageMatches,
      storageMatches
        ? "Successfully serialized and loaded test favorite IDs."
        : "Storage roundtrip mismatch."
    );

    // Restore real favorites
    saveFavorites(Array.from(appState.favoriteIds));

    // Print results table
    if (typeof console !== "undefined" && console.table) {
      console.table(results);
      console.log(
        allPassed
          ? "✔ All Quote of the Day Self-Tests Passed!"
          : "✖ Some tests failed. Check table above."
      );
    }

    return { allPassed, results };
  }

  // Expose API for testing and console inspection
  if (typeof window !== "undefined") {
    window.QuoteApp = {
      state: appState,
      catalog: QUOTES_CATALOG,
      getRandomQuote,
      getNextQuote,
      loadFavorites,
      saveFavorites,
      renderQuote,
      updateFavoriteUI,
      handleNewQuote,
      handleToggleFavorite,
      runTests: runAppTests
    };
    window.runAppTests = runAppTests;
  }

  // Export for potential Node.js test harness
  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      QUOTES_CATALOG,
      getRandomQuote,
      getNextQuote,
      loadFavorites,
      saveFavorites,
      runAppTests
    };
  }
})();
