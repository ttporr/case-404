const STORAGE_KEY = "case404_scores";

export const Storage = {
  getScores() {
    try {
      return JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "{}"
      );
    } catch (error) {
      console.error(
        "Не вдалося прочитати збережені результати:",
        error
      );

      return {};
    }
  },

  getScore(caseId) {
    return this.getScores()[caseId];
  },

  saveScore(caseId, isCorrect) {
    const scores = this.getScores();

    scores[caseId] =
      scores[caseId] === true || isCorrect === true;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(scores)
    );

    return scores[caseId];
  },

  getTotalScore() {
    return (
      Object.values(this.getScores()).filter(Boolean).length * 100
    );
  },

  clearScores() {
    localStorage.removeItem(STORAGE_KEY);
  }
};