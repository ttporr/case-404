import { Storage } from "./storage.js";
import { cases } from "./cases.js";

export function updateScoreboard() {
  document.getElementById("points").textContent =
    Storage.getTotalScore();
}

export function clearResult() {
  document.getElementById("resultTitle").textContent =
    "Результат розслідування";

  document.getElementById("resultText").textContent =
    "Тут з'явиться результат твого розслідування.";
}

export function showResult(isCorrect, currentCase) {
  const title = document.getElementById("resultTitle");
  const text = document.getElementById("resultText");

  if (isCorrect) {
    title.textContent = "Справу розкрито!";

    text.textContent =
      `Правильна відповідь. ${currentCase.explanation} За цю справу нараховано 100 балів.`;

    title.style.color = "#65c982";
  } else {
    title.textContent = "Версія не підтвердилася";

    text.textContent =
      `Правильна відповідь: ${currentCase.correct}. ${currentCase.explanation} Можеш повернутися до справи та спробувати ще раз.`;

    title.style.color = "#d92735";
  }
}

export function checkAnswer(currentCase, answer) {
  if (!currentCase) return;

  if (!answer) {
    alert("Спочатку обери підозрюваного.");
    return;
  }

  const isCorrect = answer === currentCase.correct;

  Storage.saveScore(currentCase.id, isCorrect);

  showResult(isCorrect, currentCase);

  updateScoreboard();

  return isCorrect;
}

export function renderCaseCards(onSelect) {
  const caseList = document.getElementById("caseList");

  caseList.replaceChildren();

  cases.forEach((currentCase) => {
    const card = document.createElement("article");
    card.className = "case-card";

    const image = document.createElement("img");

    image.src = currentCase.image;
    image.alt = `Ілюстрація до справи «${currentCase.title}»`;

    const number = document.createElement("p");

    number.className = "case-label";
    number.textContent = `СПРАВА №${currentCase.id}`;

    const title = document.createElement("h3");
    title.textContent = currentCase.title;

    const description = document.createElement("p");
    description.textContent = currentCase.description;

    const button = document.createElement("button");

    button.type = "button";
    button.className = "btn btn-primary";
    button.textContent = "Відкрити справу";

    button.addEventListener("click", () => {
      onSelect(currentCase);
    });

    card.append(image, number, title, description, button);

    caseList.appendChild(card);
  });
}
export function resetProgress() {
    Storage.clearScores();
    updateScoreboard();

    alert("Прогрес успішно скинуто!");
}