import { QuizText } from './quiz-text';
import { QuizQuestion } from './quiz-question';
import { Type } from "class-transformer";

export class SubmissionResult {
  result: boolean;

  @Type(() => QuizText)
  correctAnswer: QuizText;

  @Type(() => QuizQuestion)
  nextQuestion: QuizQuestion;
}
