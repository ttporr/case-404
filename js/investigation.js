
export function renderInvestigation(currentCase) {

  const title = document.getElementById("case-title");

  const description = document.getElementById("case-description");

  const evidenceList = document.getElementById("case-evidences");

  title.textContent =
    `СПРАВА №${currentCase.id} - ${currentCase.title}`;

  description.textContent = currentCase.description;

  evidenceList.innerHTML = "";

  currentCase.evidences.forEach((evidence, index) => {

    const li = document.createElement("li");

    li.textContent = `${index + 1}. ${evidence}`;

    evidenceList.appendChild(li);

  });

}
