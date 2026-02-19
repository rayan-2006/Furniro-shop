(() => {
  // Prevent duplicate listeners if this script is loaded more than once.
  if (window.__furniroHeaderInitialized) return;
  window.__furniroHeaderInitialized = true;

  const closeSearchDialog = () => {
    const searchDialog = document.getElementById("searchForm");
    if (searchDialog && searchDialog.open) {
      searchDialog.close();
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

    if (!searchDialogElement || typeof searchDialogElement.showModal !== "function") {
      console.error("searchForm dialog not found or not supported.");
      return;
    }

    if (!searchDialogElement.open) {
      searchDialogElement.showModal();
      if (searchInput instanceof HTMLInputElement) {
        searchInput.focus();
      }
    }
  });
})();
