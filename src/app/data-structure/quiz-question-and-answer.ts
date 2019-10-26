import { Type } from "class-transformer";
import { QuizQuestion } from "./quiz-question";
import { QuizText } from "./quiz-text";

export class QuizQuestionAndAnswer {
  @Type(() => QuizQuestion)
  public question?: QuizQuestion;

  @Type(() => QuizText)
  public answer?: QuizText;
}
