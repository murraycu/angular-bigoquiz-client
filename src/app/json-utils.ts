import { QuizSection } from './data-structure/quiz-section';
import { QuizSubSection } from './data-structure/quiz-sub-section';
import { QuizQuestionAndAnswer } from './data-structure/quiz-question-and-answer';
import { QuizQuestion } from './data-structure/quiz-question';
import { QuizText } from './data-structure/quiz-text';
import { Quiz } from './data-structure/quiz';
import { HasIdAndTitle } from './data-structure/has-id-and-title';
import { SubmissionResult } from './data-structure/submission-result';
import { LoginInfo } from './data-structure/login-info';
import { plainToClass } from "class-transformer";

export class JsonUtils {
  public static jsonObjectToQuizSection(obj: any): QuizSection {
    const section: QuizSection = plainToClass(QuizSection, obj as object)

    // Build the map:
    if (section.subSections) {
      section.subSectionsMap = new Map<string, QuizSubSection>();

      for (const subSection of section.subSections) {
        section.subSectionsMap.set(subSection.id, subSection);
      }
    }

    return section;
  }

  public static jsonObjectToQuizSubSection(obj: any): QuizSubSection {
    return plainToClass(QuizSubSection, obj as object)
  }

  public static jsonObjectToQuizQuestionAndAnswer(obj: any): QuizQuestionAndAnswer {
    return plainToClass(QuizQuestionAndAnswer, obj as object)
  }

  public static jsonObjectToQuizQuestion(obj: any): QuizQuestion {
    return plainToClass(QuizQuestion, obj as object)
  }

  public static jsonObjectToQuizText(obj: any): QuizText {
    return plainToClass(QuizText, obj as object)
  }

  public static jsonObjectToQuiz(obj: any): Quiz {
    return plainToClass(Quiz, obj as object)
  }

  public static jsonObjectToSubmissionResult(obj: any): SubmissionResult {
    return plainToClass(SubmissionResult, obj as object)
  }

  public static jsonObjectToLoginInfo(obj: any): LoginInfo {
    return plainToClass(LoginInfo, obj as object)
  }
}
