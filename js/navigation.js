
export function createNavigation(cases, onLoad) {

  let currentCaseIndex = 0;

  function loadCaseByIndex(index) {

    if (index < 0 || index >= cases.length) {
      return;
    }

    currentCaseIndex = index;

    onLoad(cases[currentCaseIndex]);

    updateNavigation();

  }

  function updateNavigation() {

    document.getElementById("prev-case").disabled =
      currentCaseIndex === 0;

    document.getElementById("next-case").disabled =
      currentCaseIndex === cases.length - 1;

  }

  function goNextCase() {

    loadCaseByIndex(currentCaseIndex + 1);

  }

  function goPrevCase() {

    loadCaseByIndex(currentCaseIndex - 1);

  }

  function getCurrentCase() {

    return cases[currentCaseIndex];

  }

  return {
    loadCaseByIndex,
    goNextCase,
    goPrevCase,
    getCurrentCase
  };

}
