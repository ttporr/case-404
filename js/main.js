import { cases } from "./cases.js";
import { createNavigation } from "./navigation.js";
import { renderInvestigation } from "./investigation.js";
import {
  renderSuspects,
  getSelectedSuspect,
  clearSuspectSelection
} from "./suspect.js";
import {
  checkAnswer,
  clearResult,
  updateScoreboard,
  renderCaseCards
} from "./scoring.js";

window.addEventListener("DOMContentLoaded", () => {
  const navigation = createNavigation();
  let currentCase = null;

  function openCase(selectedCase) {
    currentCase = selectedCase;

    renderInvestigation(currentCase);
    renderSuspects(currentCase);
    clearResult();

    navigation.showInvestigation();
  }

  renderCaseCards(openCase);

  document.getElementById("startButton").addEventListener("click", () => {
    navigation.showCases();
  });

  document.getElementById("homeButton").addEventListener("click", () => {
    navigation.showHome();
  });

  document.getElementById("restartButton").addEventListener("click", () => {
    navigation.showHome();
  });

  document.getElementById("nextCaseButton").addEventListener("click", () => {
    navigation.showCases();
  });

  document.getElementById("backToCasesButton").addEventListener("click", () => {
    currentCase = null;
    clearSuspectSelection();
    navigation.showCases();
  });

  document.getElementById("submitButton").addEventListener("click", () => {
    if (!currentCase) return;

    const answer = getSelectedSuspect();
    const result = checkAnswer(currentCase, answer);

    if (result !== undefined) {
      navigation.showResult();
    }
  });

  updateScoreboard();

  console.log(`CASE 404 запущено. Кількість справ: ${cases.length}`);
});