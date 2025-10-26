import { Exclude, plainToClass, Type } from 'class-transformer';
import { QuizQuestion } from './quiz-question';
import { UserQuestionHistory } from './user-question-history';

export class UserStats {
  public static fromJson(obj: any): UserStats {
    const result: UserStats = plainToClass(UserStats, obj as object);

    if (result.questionHistories) {
      result.questionHistoriesMap = new Map<string, UserQuestionHistory>();
      for (const questionHistory of obj.questionHistories) {
        const questionId = questionHistory.questionId;
        if (!questionId) {
          continue;
        }

        result.questionHistoriesMap.set(questionId, questionHistory);

        // After this point, we will only use questionHistoriesMap.
        result.questionHistories = undefined;
      }
    }

    // TODO: Do this on the server:
    result.updateTopProblemQuestions();

    return result;
  }

  public static percentageString(total: number, part: number): string {
    // Avoid returning percentages over 100.
    if (total < part) {
      part = total;
    }

    // Avoid divide by zero, and avoid negative results.
    if (part <= 0) {
      return '0.00%';
    }

    return Number((part / total) * 100).toFixed(2) + '%';
  }

  public quizId: string;
  public quizTitle: string;
  public sectionId: string;
  public sectionTitle: string;

  public answered = 0;
  public correct = 0;
  public countQuestions = 0;
  public countQuestionsAnsweredOnce = 0;
  public countQuestionsCorrectOnce = 0;

  public problemQuestionHistoriesCount: number;

  @Type(() => UserQuestionHistory)
  public topProblemQuestionHistories: UserQuestionHistory[];

  // Only used for parsing from JSON.
  @Type(() => UserQuestionHistory)
  public questionHistories: UserQuestionHistory[];

  // Built from questionHistories.
  @Exclude()
  public questionHistoriesMap: Map<string, UserQuestionHistory>;

  public percentAnsweredOnce(total: number): string {
    return UserStats.percentageString(total, this.countQuestionsAnsweredOnce);
  }

  public percentCorrectOnce(total: number): string {
    return UserStats.percentageString(total, this.countQuestionsCorrectOnce);
  }

  public updateProblemQuestion(question: QuizQuestion, answerIsCorrect: boolean): void {
    const questionId = question.id;

    let firstTimeAsked = false;
    let firstTimeCorrect = false;

    if (!this.questionHistoriesMap) {
      this.questionHistoriesMap = new Map<string, UserQuestionHistory>();
    }

    let history: UserQuestionHistory = this.questionHistoriesMap.get(questionId);

    // Add a new one, if necessary:
    if (!history) {
      firstTimeAsked = true;
      if (answerIsCorrect) {
        firstTimeCorrect = true;
      }

      history = UserQuestionHistory.fromQuestion(question);
      this.questionHistoriesMap.set(questionId, history);
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

    if (!this.questionHistoriesMap) {
      return;
    }

    // Copy the values of the array.
    this.questionHistoriesMap.forEach((value: UserQuestionHistory, key: string) => {
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
