
export function renderSuspects(currentCase) {

  const suspectsList = document.getElementById("suspects");

  suspectsList.innerHTML = "";

  currentCase.suspects.forEach(suspect => {

    const li = document.createElement("li");

    const label = document.createElement("label");

    const input = document.createElement("input");

    input.type = "radio";

    input.name = "suspect";

    input.value = suspect.name;

    label.appendChild(input);

    label.appendChild(
      document.createTextNode(
        ` ${suspect.name} — ${suspect.description}`
      )
    );

    li.appendChild(label);

    suspectsList.appendChild(li);

  });

}

export function getSelectedSuspect() {

  const selected = document.querySelector(
    'input[name="suspect"]:checked'
  );

  return selected ? selected.value : null;

}

export function clearSuspectSelection() {

  const selected = document.querySelector(
    'input[name="suspect"]:checked'
  );

  if (selected) {
    selected.checked = false;
  }

}
