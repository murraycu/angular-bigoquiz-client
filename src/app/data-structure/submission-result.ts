import { QuizText } from './quiz-text';
import { QuizQuestion } from './quiz-question';
import { Type, plainToClass } from "class-transformer";

export class SubmissionResult {
  public static fromJson(obj: any): SubmissionResult {
    return plainToClass(SubmissionResult, obj as object)
  }

  result: boolean;

  @Type(() => QuizText)
  correctAnswer: QuizText;

  @Type(() => QuizQuestion)
  nextQuestion: QuizQuestion;
}
