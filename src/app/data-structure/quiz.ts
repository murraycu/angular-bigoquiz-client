import { HasIdAndTitle } from './has-id-and-title';
import { QuizSection } from './quiz-section'
import { QuizQuestionAndAnswer } from './quiz-question-and-answer';

export class Quiz extends HasIdAndTitle {
  isPrivate: boolean;
  usesMathML: boolean;

  sections: QuizSection[];

  // Top-level questions, not in a section.
  questions: QuizQuestionAndAnswer[];
}
