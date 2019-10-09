import { plainToClass, Type } from "class-transformer";
import { HasIdAndTitle } from "./has-id-and-title";
import { QuizText } from "./quiz-text";

export class QuizQuestion extends HasIdAndTitle {
  public static fromJson(obj: any): QuizQuestion {
    return plainToClass(QuizQuestion, obj as object);
  }

  @Type(() => QuizText)
  public text: QuizText;

  public note: string;
  public videoUrl: string;
  public codeUrl: string;

  @Type(() => QuizText)
  public choices: QuizText[];

  public sectionId: string;
  public subSectionId: string;

  public quizTitle: string;

  @Type(() => HasIdAndTitle)
  public section: HasIdAndTitle;

  @Type(() => HasIdAndTitle)
  public subSection: HasIdAndTitle;

  public quizUsesMathML: boolean;
}
