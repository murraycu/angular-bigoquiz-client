import { plainToClass, Type } from "class-transformer";
import { HasIdAndTitle } from "./has-id-and-title";
import { QuizQuestionAndAnswer } from "./quiz-question-and-answer";
import { QuizSection } from "./quiz-section";

export class Quiz extends HasIdAndTitle {
  public static fromJson(obj: any): Quiz {
    return plainToClass(Quiz, obj as object);
  }

  public isPrivate: boolean;
  public usesMathML: boolean;

  @Type(() => QuizSection)
  public sections: QuizSection[];

  // Top-level questions, not in a section.
  @Type(() => QuizQuestionAndAnswer)
  public questions: QuizQuestionAndAnswer[];
}
