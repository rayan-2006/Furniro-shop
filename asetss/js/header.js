(() => {
  if (window.__furniroHeaderInitialized) return;
  window.__furniroHeaderInitialized = true;

  let productsCache = null;
  let searchTimer = null;

  const formatPrice = (value) => {
    const price = Number(value);
    if (Number.isNaN(price)) return "";
    return `$${price.toLocaleString()}`;
  };

  const renderResults = (items, resultsRoot) => {
    if (!resultsRoot) return;

    if (!items.length) {
      resultsRoot.innerHTML = "<div class=\"search-results-empty\">No results found</div>";
      return;
    }

    resultsRoot.innerHTML = items
      .map((item) => {
        const image = item.main_image || "";
        const name = item.name || "Unnamed";
        const price = formatPrice(item.price);

        return `
          <div class="search-results-item">
            <img src="${image}" alt="${name}">
            <div class="search-results-info">
              <div class="search-results-name">${name}</div>
              <div class="search-results-price">${price}</div>
            </div>
          </div>
        `;
      })
      .join("");
  };

  const loadProducts = async () => {
    if (productsCache) return productsCache;
    const response = await fetch("/database/Products.json");
    if (!response.ok) {
      throw new Error("Failed to load products.");
    }
    productsCache = await response.json();
    return productsCache;
  };

  const runSearch = async (query) => {
    const resultsRoot = document.getElementById("searchResults");
    if (!resultsRoot) return;

    const q = query.trim().toLowerCase();
    if (!q) {
      resultsRoot.innerHTML = "";
      return;
    }

    try {
      const data = await loadProducts();
      const filtered = data.filter((item) => {
        const name = String(item.name || "").toLowerCase();
        const category = String(item.category || "").toLowerCase();
        const tags = Array.isArray(item.tags) ? item.tags.join(" ").toLowerCase() : "";
        return name.includes(q) || category.includes(q) || tags.includes(q);
      });

      renderResults(filtered.slice(0, 8), resultsRoot);
    } catch (error) {
      resultsRoot.innerHTML = "<div class=\"search-results-empty\">Search is unavailable.</div>";
      console.error(error);
    }
  };

  const closeSearchDialog = () => {
    const searchDialog = document.getElementById("searchForm");
    if (searchDialog && searchDialog.open) {
      searchDialog.classList.add("is-closing");
      setTimeout(() => {
        searchDialog.close();
        searchDialog.classList.remove("is-closing");
      }, 180);
    }
  };

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const closeBtn = target.closest("#searchDialogClose");
    if (closeBtn) {
      closeSearchDialog();
      return;
    }

    const searchDialog = target.closest("#searchForm");
    if (searchDialog && target === searchDialog) {
      closeSearchDialog();
      return;
    }

    const searchIcon = target.closest("#searchIcon");
    if (!searchIcon) return;

    const searchDialogElement = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    if (!searchDialogElement || typeof searchDialogElement.showModal !== "function") {
      console.error("searchForm dialog not found or not supported.");
      return;
    }

    if (!searchDialogElement.open) {
      searchDialogElement.classList.remove("is-closing");
      searchDialogElement.showModal();
      if (searchInput instanceof HTMLInputElement) {
        searchInput.focus();
      }
      if (searchResults) {
        searchResults.innerHTML = "";
      }
    }
  });

  document.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.id !== "searchInput") return;

    if (searchTimer) {
      clearTimeout(searchTimer);
    }

    searchTimer = setTimeout(() => {
      runSearch(target.value);
    }, 150);
  });

  document.addEventListener("submit", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLFormElement)) return;
    if (target.id !== "searchInputForm") return;
    event.preventDefault();
  });
})();
