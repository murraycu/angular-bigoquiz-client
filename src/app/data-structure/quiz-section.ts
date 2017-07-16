import { HasIdAndTitle } from './has-id-and-title';
import { QuizSubSection } from './quiz-sub-section';
import { QuizQuestionAndAnswer } from './quiz-question-and-answer';

export class QuizSection extends HasIdAndTitle {
  subSections: QuizSubSection[];
  subSectionsMap: Map<string, QuizSubSection>;

  // defaultChoices
  questions: QuizQuestionAndAnswer[];

  public getSubSectionById(subSectionId: string): QuizSubSection {
    if (!this.subSectionsMap) {
      return null;
    }

    return this.subSectionsMap.get(subSectionId);
  }

  addQuestion(qa: QuizQuestionAndAnswer): void {
    if (!this.questions) {
      this.questions = new Array<QuizQuestionAndAnswer>();
    }

    this.questions.push(qa);
  }
}
