import { UserQuestionHistory } from './user-question-history';

export class UserStats {
  quizId: string;
  sectionId: string;

  answered: number;
  correct: number;
  countQuestionsAnsweredOnce: number;
  countQuestionsCorrectOnce: number;

  static MAX_PROBLEM_QUESTIONS: number = 5;

  problemQuestionHistoriesCount: number;

  topProblemQuestionHistories: UserQuestionHistory[];

  questionHistories: Map<string, UserQuestionHistory>;

  percentAnsweredOnce(total: number): string {
    // Avoid divide by zero, and avoid negative results.
    if (total <= 0) {
      return '0%';
    }

    return (this.countQuestionsAnsweredOnce / total) + '%';
  }

  percentCorrectOnce(total: number): string {
    // Avoid divide by zero, and avoid negative results.
    if (total <= 0) {
      return '0%';
    }

    return (this.countQuestionsCorrectOnce / total) + '%';
  }

  updateProblemQuestion(questionId: string, answerIsCorrect: boolean): void {
    if (!questionId) {
      return;
    }

    let firstTimeAsked: boolean = false;
    let firstTimeCorrect: boolean = false;

    if (!this.questionHistories) {
      this.questionHistories = new Map<string, UserQuestionHistory>();
    }

    let history: UserQuestionHistory = this.questionHistories.get(questionId);

    // Add a new one, if necessary:
    if (!history) {
      firstTimeAsked = true;
      if (answerIsCorrect) {
        firstTimeCorrect = true;
      }

      history = new UserQuestionHistory();
      history.questionId = questionId;
      this.questionHistories.set(questionId, history);
    } else if (answerIsCorrect && !history.answeredCorrectlyOnce) {
      firstTimeCorrect = true;
    }

    history.adjustCount(answerIsCorrect);

    if (firstTimeAsked) {
      this.countQuestionsAnsweredOnce++;
    }

    if (firstTimeCorrect) {
      this.countQuestionsCorrectOnce++;
    }

    // TODO: Update the cache of top questions.
  }

}
