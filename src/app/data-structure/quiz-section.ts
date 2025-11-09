import { plainToInstance, Type } from 'class-transformer';
import { HasIdAndTitle } from './has-id-and-title';
import { QuizQuestionAndAnswer } from './quiz-question-and-answer';
import { QuizSubSection } from './quiz-sub-section';

export class QuizSection extends HasIdAndTitle {
  @Type(() => QuizSubSection)
  public subSections: QuizSubSection[] = [];

  // defaultChoices
  @Type(() => QuizQuestionAndAnswer)
  public questions: QuizQuestionAndAnswer[];

  public static fromJson(obj: any): QuizSection {
    if (obj === undefined) {
      return undefined;
    }

    return plainToInstance(QuizSection, obj as Record<string, unknown>);
  }
}
