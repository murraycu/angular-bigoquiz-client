import { plainToClass, Type } from "class-transformer";
import { QuizQuestion } from "./quiz-question";
import { QuizText } from "./quiz-text";

export class SubmissionResult {
  public static fromJson(obj: any): SubmissionResult {
    return plainToClass(SubmissionResult, obj as object);
  }

  public result: boolean = false;

  @Type(() => QuizText)
  public correctAnswer?: QuizText = undefined;

  @Type(() => QuizQuestion)
  public nextQuestion?: QuizQuestion = undefined;
}
