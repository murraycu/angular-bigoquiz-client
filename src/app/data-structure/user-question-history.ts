import { Type } from 'class-transformer';
import { QuizQuestion } from './quiz-question';
import { QuizText } from './quiz-text';

export class UserQuestionHistory {
  public questionId: string = "";

  @Type(() => QuizText)
  public questionTitle: QuizText = new QuizText();

  public sectionId: string = "";
  public subSectionTitle: string = "";

  public answeredCorrectlyOnce = false;
  public countAnsweredWrong = 0;

  public static fromQuestion(question: QuizQuestion): UserQuestionHistory {
    const result: UserQuestionHistory = new UserQuestionHistory();
    result.questionId = question.id;
    result.questionTitle = question.text;

    if (question.subSection) {
      result.subSectionTitle = question.subSection.title;
    }

    return result;
  }

  /** Adjust the counts in response to a correct or wrong answer.
   * This is also updated on the server, but this lets us update
   * the local data too, until we refresh it all again from the
   * server sometime.
   */
  public adjustCount(result: boolean): void {
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
