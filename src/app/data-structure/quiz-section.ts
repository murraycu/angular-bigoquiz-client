import { HasIdAndTitle } from './has-id-and-title';
import { QuizSubSection } from './quiz-sub-section';
import { QuizQuestionAndAnswer } from './quiz-question-and-answer';
import { Exclude, Type, plainToClass } from "class-transformer";

export class QuizSection extends HasIdAndTitle {
  @Type(() => QuizSubSection)
  subSections: QuizSubSection[];

  // Built from subSections.
  @Exclude()
  subSectionsMap: Map<string, QuizSubSection>;

  // defaultChoices
  @Type(() => QuizQuestionAndAnswer)
  questions: QuizQuestionAndAnswer[];

  questionsCount: number;

  public getSubSectionById(subSectionId: string): QuizSubSection {
    if (!this.subSectionsMap) {
      return undefined;
    }

    return this.subSectionsMap.get(subSectionId);
  }
}
