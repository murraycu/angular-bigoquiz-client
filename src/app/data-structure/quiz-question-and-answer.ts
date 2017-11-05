import { QuizQuestion } from './quiz-question';
import { QuizText } from './quiz-text';
import { Type } from "class-transformer";

export class QuizQuestionAndAnswer {
  @Type(() => QuizQuestion)
  question: QuizQuestion;

  @Type(() => QuizText)
  answer: QuizText;
}
