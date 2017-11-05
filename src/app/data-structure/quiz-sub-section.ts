import { HasIdAndTitle } from './has-id-and-title';
import { QuizQuestionAndAnswer } from './quiz-question-and-answer';
import { Type } from "class-transformer";

export class QuizSubSection extends HasIdAndTitle {

  @Type(() => QuizQuestionAndAnswer)
  questions: QuizQuestionAndAnswer[];

  addQuestion(qa: QuizQuestionAndAnswer): void {
    if (!this.questions) {
      this.questions = [];
    }

    this.questions.push(qa);
  }
}
