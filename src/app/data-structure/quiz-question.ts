import { plainToClass, Type } from 'class-transformer';
import { HasIdAndTitle } from './has-id-and-title';
import { QuizText } from './quiz-text';

export class QuizQuestion extends HasIdAndTitle {
  @Type(() => QuizText)
  public text: QuizText = new QuizText();

  public note= "";
  public videoUrl= "";
  public codeUrl= "";

  @Type(() => QuizText)
  public choices: QuizText[] = [];

  public sectionId = "";
  public subSectionId= "";

  public quizTitle= "";

  @Type(() => HasIdAndTitle)
  public section: HasIdAndTitle = new HasIdAndTitle();

  @Type(() => HasIdAndTitle)
  public subSection: HasIdAndTitle = new HasIdAndTitle() ;

  public quizUsesMathML = false;

  public static fromJson(obj: any): QuizQuestion {
    return plainToClass(QuizQuestion, obj as Record<string, unknown>);
  }
}
