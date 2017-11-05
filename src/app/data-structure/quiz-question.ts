import { HasIdAndTitle } from './has-id-and-title';
import { QuizSubSection } from './quiz-sub-section';
import { QuizText } from './quiz-text';
import { Type, plainToClass } from 'class-transformer';

export class QuizQuestion extends HasIdAndTitle {
  public static fromJson(obj: any): QuizQuestion {
    return plainToClass(QuizQuestion, obj as object);
  }

  @Type(() => QuizText)
  text: QuizText;

  note: string;
  videoUrl: string;
  codeUrl: string;

  @Type(() => QuizText)
  choices: QuizText[];

  sectionId: string;
  subSectionId: string;

  quizTitle: string;

  @Type(() => HasIdAndTitle)
  section: HasIdAndTitle;

  @Type(() => QuizSubSection)
  subSection: QuizSubSection;

  quizUsesMathML: boolean;
}
