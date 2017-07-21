import { HasIdAndTitle } from './has-id-and-title';
import { QuizSection } from './quiz-section';
import { QuizQuestionAndAnswer } from './quiz-question-and-answer';

export class Quiz extends HasIdAndTitle {
  isPrivate: boolean;
  usesMathML: boolean;
  questionsCount: number;

  sections: QuizSection[];

  // Top-level questions, not in a section.
  questions: QuizQuestionAndAnswer[];

  // TOOD: Avoid duplication with other addQuestion() methods.
  addQuestion(qa: QuizQuestionAndAnswer): void {
    if (!this.questions) {
      this.questions = new Array<QuizQuestionAndAnswer>();
    }

    this.questions.push(qa);
  }
}
