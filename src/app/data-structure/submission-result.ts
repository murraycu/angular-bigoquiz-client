import { plainToClass, Type } from "class-transformer";
import { QuizQuestion } from "./quiz-question";
import { QuizText } from "./quiz-text";

export class SubmissionResult {
  public static fromJson(obj: any): SubmissionResult {
    return plainToClass(SubmissionResult, obj as object);
  }

  public result: boolean;

  @Type(() => QuizText)
  public correctAnswer: QuizText;

  @Type(() => QuizQuestion)
  public nextQuestion: QuizQuestion;
}
