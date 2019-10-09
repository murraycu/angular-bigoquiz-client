import { Type } from "class-transformer";
import { HasIdAndTitle } from "./has-id-and-title";
import { QuizQuestionAndAnswer } from "./quiz-question-and-answer";

export class QuizSubSection extends HasIdAndTitle {

  @Type(() => QuizQuestionAndAnswer)
  public questions: QuizQuestionAndAnswer[];

  public addQuestion(qa: QuizQuestionAndAnswer): void {
    if (!this.questions) {
      this.questions = [];
    }

    this.questions.push(qa);
  }
}
