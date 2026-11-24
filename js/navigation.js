export function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.toggle("active", page.id === pageId);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function createNavigation() {
  return {
    showHome() {
      showPage("home");
    },

    showCases() {
      showPage("cases");
    },

    showInvestigation() {
      showPage("investigation");
    },

    showResult() {
      showPage("result");
    }
  };
}