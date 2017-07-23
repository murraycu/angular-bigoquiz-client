import { QuizText } from './quiz-text';

export class UserQuestionHistory {
  questionId: string;

  questionTitle: QuizText;
  subSectionTitle: string;

  answeredCorrectlyOnce: boolean = false;
  countAnsweredWrong: number = 0;

  /** Adjust the counts in response to a correct or wrong answer.
   * This is also updated on the server, but this lets us update
   * the local data too, until we refresh it all again from the
   * server sometime.
   */
  adjustCount(result: boolean): void {
    if (result) {
      this.answeredCorrectlyOnce = true;
    }

    if (result) {
      this.countAnsweredWrong -= 1;
    } else {
      this.countAnsweredWrong += 1;
    }
  }
}
