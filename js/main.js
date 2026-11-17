
import { cases } from "./cases.js";

import { Storage } from "./storage.js";

import {
  renderInvestigation
} from "./investigation.js";

import {
  renderSuspects,
  getSelectedSuspect,
  clearSuspectSelection
} from "./suspect.js";

import {
  checkAnswer,
  showResult,
  clearResult,
  updateScoreboard
} from "./scoring.js";

import {
  createNavigation
} from "./navigation.js";


function renderCase(currentCase) {

  // Показываем информацию о деле
  renderInvestigation(currentCase);

  // Показываем подозреваемых
  renderSuspects(currentCase);

  // Очищаем старый выбор
  clearSuspectSelection();

  // Очищаем предыдущий результат
  clearResult();

  // Проверяем сохранённый результат
  const previousResult = Storage.getScore(currentCase.id);

  if (previousResult !== undefined) {

    showResult(previousResult, currentCase);

  }

}


// Запуск игры
window.addEventListener("DOMContentLoaded", () => {

  console.log("CASE 404 запущен!");

  // Создаём навигацию
  const navigation = createNavigation(cases, renderCase);


  // Кнопка проверки ответа
  document
    .getElementById("check-answer")
    .addEventListener("click", () => {

      const currentCase = navigation.getCurrentCase();

      const answer = getSelectedSuspect();

      checkAnswer(currentCase, answer);

    });


  // Следующее дело
  document
    .getElementById("next-case")
    .addEventListener("click", () => {

      navigation.goNextCase();

    });


  // Предыдущее дело
  document
    .getElementById("prev-case")
    .addEventListener("click", () => {

      navigation.goPrevCase();

    });


  // Кнопка сброса результатов
  const resetButton = document.getElementById("reset-score");

  if (resetButton) {

    resetButton.addEventListener("click", () => {

      const confirmReset = confirm(
        "Ви впевнені, що хочете скинути весь прогрес?"
      );

      if (confirmReset) {

        Storage.clearScores();

        clearResult();

        clearSuspectSelection();

        updateScoreboard();

        alert("Прогрес успішно скинуто!");

      }

    });

  }


  // Загружаем первое дело
  navigation.loadCaseByIndex(0);

  // Обновляем очки
  updateScoreboard();

});
