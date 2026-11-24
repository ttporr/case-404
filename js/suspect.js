let selectedSuspect = null;

export function renderSuspects(currentCase) {
  const suspectsList = document.getElementById("suspectList");

  suspectsList.replaceChildren();

  selectedSuspect = null;

  currentCase.suspects.forEach((suspect, index) => {
    const card = document.createElement("button");

    card.type = "button";
    card.className = "suspect-card";
    card.setAttribute("aria-pressed", "false");

    const image = document.createElement("img");

    image.src = suspect.image;
    image.alt = `Портрет підозрюваного: ${suspect.name}`;

    const name = document.createElement("h4");
    name.textContent = suspect.name;

    const description = document.createElement("p");
    description.textContent = suspect.description;

    const number = document.createElement("span");

    number.className = "suspect-number";
    number.textContent = `ПІДОЗРЮВАНИЙ №${index + 1}`;

    card.append(number, image, name, description);

    card.addEventListener("click", () => {
      selectedSuspect = suspect.name;

      suspectsList.querySelectorAll(".suspect-card").forEach((item) => {
        const isSelected = item === card;

        item.classList.toggle("selected", isSelected);
        item.setAttribute("aria-pressed", String(isSelected));
      });
    });

    suspectsList.appendChild(card);
  });
}

export function getSelectedSuspect() {
  return selectedSuspect;
}

export function clearSuspectSelection() {
  selectedSuspect = null;

  document.querySelectorAll(".suspect-card").forEach((card) => {
    card.classList.remove("selected");
    card.setAttribute("aria-pressed", "false");
  });
}