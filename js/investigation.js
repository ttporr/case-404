export function renderInvestigation(currentCase) {
  document.getElementById("caseTitle").textContent =
    currentCase.title;

  document.getElementById("caseStory").textContent =
    currentCase.description;

  const evidenceList = document.getElementById("evidenceList");

  evidenceList.replaceChildren();

  currentCase.evidences.forEach((evidence, index) => {
    const item = document.createElement("div");
    item.className = "evidence-item";

    const number = document.createElement("strong");
    number.textContent =
      `ДОКАЗ ${String(index + 1).padStart(2, "0")}`;

    const text = document.createElement("p");
    text.textContent = evidence;

    item.append(number, text);

    evidenceList.appendChild(item);
  });
}