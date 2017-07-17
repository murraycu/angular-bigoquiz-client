export class UserStats {
  quizId: string;
  sectionId: string;

  answered: number;
  correct: number;
  countQuestionsAnsweredOnce: number;
  countQuestionsCorrectOnce: number;

  // TODO: questionHistories

  percentAnsweredOnce(total: number): string {
    // Avoid divide by zero, and avoid negative results.
    if (total <= 0) {
      return "0%";
    }

    return (this.countQuestionsAnsweredOnce / total) + "%";
  }

  percentCorrectOnce(total: number): string {
    // Avoid divide by zero, and avoid negative results.
    if (total <= 0) {
      return "0%";
    }

    return (this.countQuestionsCorrectOnce / total) + "%";
  }

}
