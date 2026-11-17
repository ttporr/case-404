
export const Storage = {

  saveScore(caseId, correct) {
    const scores = this.getScores();

    scores[caseId] = correct;

    localStorage.setItem(
      "case404_scores",
      JSON.stringify(scores)
    );
  },

  getScores() {
    return JSON.parse(
      localStorage.getItem("case404_scores") || "{}"
    );
  },

  getScore(caseId) {
    const scores = this.getScores();

    return scores[caseId];
  },

  clearScores() {
    localStorage.removeItem("case404_scores");
  },

  getTotalScore() {
    const scores = this.getScores();

    return Object.values(scores).filter(
      score => score === true
    ).length;
  },

  getCompletedCases() {
    const scores = this.getScores();

    return Object.keys(scores).length;
  }

};