import { HasIdAndTitle } from './has-id-and-title';
import { QuizQuestionAndAnswer } from './quiz-question-and-answer';

export class QuizSubSection extends HasIdAndTitle {
  questions: QuizQuestionAndAnswer[];

  addQuestion(qa: QuizQuestionAndAnswer): void {
    if (!this.questions) {
      this.questions = [];
    }

    this.questions.push(qa);
  }
}
