import { HasIdAndTitle } from './has-id-and-title';
import { QuizSection } from './quiz-section';
import { QuizQuestionAndAnswer } from './quiz-question-and-answer';
import { Type } from "class-transformer";

export class Quiz extends HasIdAndTitle {
  isPrivate: boolean;
  usesMathML: boolean;
  questionsCount: number;

  @Type(() => QuizSection)
  sections: QuizSection[];

  // Top-level questions, not in a section.
  @Type(() => QuizQuestionAndAnswer)
  questions: QuizQuestionAndAnswer[];
}
