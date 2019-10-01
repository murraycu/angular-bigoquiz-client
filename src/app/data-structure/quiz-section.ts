import { HasIdAndTitle } from './has-id-and-title';
import { QuizSubSection } from './quiz-sub-section';
import { QuizQuestionAndAnswer } from './quiz-question-and-answer';
import { Type, plainToClass } from 'class-transformer';
import {isUndefined} from 'util';

export class QuizSection extends HasIdAndTitle {
  public static fromJson(obj: any): QuizSection {
    if (isUndefined(obj)) {
      return undefined;
    }

    return plainToClass(QuizSection, obj as object);
  }

  @Type(() => QuizSubSection)
  subSections: QuizSubSection[];

  // defaultChoices
  @Type(() => QuizQuestionAndAnswer)
  questions: QuizQuestionAndAnswer[];

  questionsCount: number;
}
