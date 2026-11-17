
import { Storage } from "./storage.js";
import { cases } from "./cases.js";

export function checkAnswer(currentCase, answer) {

  if (!answer) {

    alert("Будь ласка, виберіть підозрюваного.");

    return null;

  }

  const isCorrect = answer === currentCase.correct;

  Storage.saveScore(currentCase.id, isCorrect);

  showResult(isCorrect, currentCase);

  updateScoreboard();

  return isCorrect;

}

export function showResult(isCorrect, currentCase) {

  const result = document.getElementById("result");

  if (isCorrect) {

    result.textContent =
      `Правильно! ${currentCase.explanation}`;

    result.style.color = "green";

  } else {

    result.textContent =
      `Неправильно. Правильна відповідь: ${currentCase.correct}. ${currentCase.explanation}`;

    result.style.color = "red";

  }

}

export function clearResult() {

  const result = document.getElementById("result");

  result.textContent = "";

}

export function updateScoreboard() {

  const score = Storage.getTotalScore();

  const scoreboard = document.getElementById("score");

  scoreboard.textContent =
    `Рахунок: ${score} / ${cases.length}`;

}
