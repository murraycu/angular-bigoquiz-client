import { HasIdAndTitle } from './has-id-and-title';
import { QuizSubSection } from './quiz-sub-section';
import { QuizQuestionAndAnswer } from './quiz-question-and-answer';

export class QuizSection extends HasIdAndTitle {
  subSections: QuizSubSection[];

  // defaultChoices
  questions: QuizQuestionAndAnswer[];
}
