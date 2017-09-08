import { UserQuestionHistory } from './user-question-history';
import { QuizQuestion } from './quiz-question';

export class UserStats {
  quizId: string;
  quizTitle: string;
  sectionId: string;
  sectionTitle: string;

  answered: number = 0;
  correct: number = 0;
  countQuestions: number = 0;
  countQuestionsAnsweredOnce: number = 0;
  countQuestionsCorrectOnce: number = 0;

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

  updateProblemQuestion(question: QuizQuestion, answerIsCorrect: boolean): void {
    const questionId = question.id;

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

      history = UserQuestionHistory.fromQuestion(question);
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

    this.updateTopProblemQuestions();
  }

  private updateTopProblemQuestions(): void {
    this.problemQuestionHistoriesCount = 0;

    this.topProblemQuestionHistories = undefined;

    if (!this.questionHistories) {
      return;
    }

    // Copy the values of the array.
    this.questionHistories.forEach((value: UserQuestionHistory, key: string) => {
      if (value.countAnsweredWrong > 0) {
        if (!this.topProblemQuestionHistories) {
          this.topProblemQuestionHistories = [];
        }

        this.topProblemQuestionHistories.push(value);
      }
    });

    if (!this.topProblemQuestionHistories) {
      return;
    }

    // Sort the array.
    this.topProblemQuestionHistories.sort((a, b) => {
      if (!a) {
        if (!b) {
          return 0;
        }
      }

      if (!b) {
        return 1;
      }

      const c1: number = a.countAnsweredWrong;
      const c2: number = b.countAnsweredWrong;
      if (c1 === c2) {
        return 0;
      }

      return (c1 > c2) ? -1 : 1;
    });

    // Cache the count of problem questions:
    for (const history of this.topProblemQuestionHistories) {
      if (history && history.countAnsweredWrong > 0) {
        this.problemQuestionHistoriesCount++;
      }
    }

    // The client only wants the first few.
    const size: number = this.topProblemQuestionHistories.length;
    const sublistSize: number = Math.min(size, UserStats.MAX_PROBLEM_QUESTIONS);
    if (sublistSize !== size && sublistSize > 0) {
      this.topProblemQuestionHistories = this.topProblemQuestionHistories.slice(0, sublistSize);
    }

    // Don't include questions that are not really problem questions:
    this.clearNonProblemQuestions();
  }

  private clearNonProblemQuestions() {
    // TODO: Use a Set when/if TypeScript has one.
    let idsToRemove: Map<string, boolean>;
    for (const history of this.topProblemQuestionHistories) {
      if (!history) {
        continue;
      }

      if (history.countAnsweredWrong <= 0) {
        if (!idsToRemove) {
          idsToRemove = new Map<string, boolean>();
        }

        idsToRemove.set(history.questionId, true);
      }
    }

    if (!idsToRemove) {
      return;
    }

    const list: UserQuestionHistory[] = [];
    for (const history of this.topProblemQuestionHistories) {
      if (!history) {
        continue;
      }

      if (idsToRemove.get(history.questionId)) {
        continue;
      }

      list.push(history);
    }

    this.topProblemQuestionHistories = list;
  }
}
