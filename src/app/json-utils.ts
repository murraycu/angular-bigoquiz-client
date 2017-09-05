import { QuizSection } from './data-structure/quiz-section';
import { QuizSubSection } from './data-structure/quiz-sub-section';
import { QuizQuestionAndAnswer } from './data-structure/quiz-question-and-answer';
import { QuizQuestion } from './data-structure/quiz-question';
import { QuizText } from './data-structure/quiz-text';
import { Quiz } from './data-structure/quiz';
import { HasIdAndTitle } from './data-structure/has-id-and-title';
import { SubmissionResult } from './data-structure/submission-result';
import { LoginInfo } from './data-structure/login-info';

export class JsonUtils {
  public static jsonObjectToQuizSections(obj: any): QuizSection[] {
    if (!obj) {
      return undefined;
    }

    const result = new Array<QuizSection>();

    for (const jsonSection of obj) {
      const section = JsonUtils.jsonObjectToQuizSection(jsonSection);
      result.push(section);
    }

    return result;
  }

  public static jsonObjectToQuizSection(obj: any): QuizSection {
    if (!obj) {
      return undefined;
    }

    const section: QuizSection = new QuizSection();

    JsonUtils.jsonLoadHasIdAndTitle(obj, section);

    if (obj.subSections) {
      section.subSections = [];
      section.subSectionsMap = new Map<string, QuizSubSection>();

      for (const jsonSubSection of obj.subSections) {
        const subSection = JsonUtils.jsonObjectToQuizSubSection(jsonSubSection);
        section.subSections.push(subSection);
        section.subSectionsMap.set(subSection.id, subSection);
      }
    }

    if (obj.questions && obj.questions.length) {
      for (const jsonQA of obj.questions) {
        const qa: QuizQuestionAndAnswer = JsonUtils.jsonObjectToQuizQuestionAndAnswer(jsonQA);
        section.addQuestion(qa);
      }
    }

    section.questionsCount = JsonUtils.numberOrZero(obj.questionsCount);

    return section;
  }

  public static jsonObjectToQuizSubSection(obj: any): QuizSubSection {
    if (!obj) {
      return undefined;
    }

    const subSection: QuizSubSection = new QuizSubSection();

    JsonUtils.jsonLoadHasIdAndTitle(obj, subSection);

    if (obj.questions && obj.questions.length) {
      for (const jsonQA of obj.questions) {
        const qa: QuizQuestionAndAnswer = JsonUtils.jsonObjectToQuizQuestionAndAnswer(jsonQA);
        subSection.addQuestion(qa);
      }
    }

    return subSection;
  }

  public static jsonObjectToQuizQuestionAndAnswer(obj: any): QuizQuestionAndAnswer {
    if (!obj) {
      return undefined;
    }

    const result: QuizQuestionAndAnswer = new QuizQuestionAndAnswer();

    if (obj.question) {
      result.question = JsonUtils.jsonObjectToQuizQuestion(obj.question);
    }

    if (obj.answer) {
      result.answer = JsonUtils.jsonObjectToQuizText(obj.answer);
    }

    return result;
  }

  public static jsonObjectToQuizQuestion(obj: any): QuizQuestion {
    if (!obj) {
      return undefined;
    }

    const result: QuizQuestion = new QuizQuestion();
    result.id = obj.id;
    result.sectionId = obj.sectionId;
    result.subSectionId = obj.subSectionId;

    if (obj.text) {
      result.text = JsonUtils.jsonObjectToQuizText(obj.text);
    }

    result.link = obj.link;

    result.note = obj.note;
    result.videoUrl = obj.videoUrl;
    result.codeUrl = obj.codeUrl;

    // These are in the JSON for convenience,
    // so we don't need to get them from the quiz.
    result.quizTitle = obj.quizTitle;

    if (obj.choices) {
      result.choices = [];
      for (const jsonChoice of obj.choices) {
        const choice = JsonUtils.jsonObjectToQuizText(jsonChoice);
        result.choices.push(choice);
      }
    }

    if (obj.section) {
      result.section = JsonUtils.jsonObjectToQuizSection(obj.section);
    }

    if (obj.subSection) {
      result.subSection = JsonUtils.jsonObjectToQuizSubSection(obj.subSection);
    }

    result.quizUsesMathML = obj.quizUsesMathML;

    return result;
  }

  public static jsonObjectToQuizText(obj: any): QuizText {
    if (!obj) {
      return undefined;
    }

    const result: QuizText = new QuizText();
    result.text = obj.text;
    result.isHtml = obj.isHtml;

    return result;
  }

  public static jsonLoadHasIdAndTitle(obj: any, base: HasIdAndTitle) {
    if (!obj) {
      return;
    }

    base.id = obj.id;
    base.title = obj.title;
    base.link = obj.link;
  }

  public static numberOrZero(obj: any): number {
    return obj ? obj : 0;
  }

  public static jsonObjectToQuiz(obj: any): Quiz {
    if (!obj) {
      return undefined;
    }

    const quiz: Quiz = new Quiz();

    JsonUtils.jsonLoadHasIdAndTitle(obj, quiz);
    if (obj) {
      quiz.isPrivate = obj.isPrivate;
      quiz.usesMathML = obj.usesMathML;
    } else {
      quiz.isPrivate = false;
      quiz.usesMathML = false;
    }

    const jsonSections = obj.sections;
    if (jsonSections) {
      quiz.sections = JsonUtils.jsonObjectToQuizSections(jsonSections);
    }

    if (obj.questions) {
      for (const jsonQA of obj.questions) {
        const qa: QuizQuestionAndAnswer = JsonUtils.jsonObjectToQuizQuestionAndAnswer(jsonQA);
        if (!qa.question.sectionId) {
          quiz.addQuestion(qa);
        }
      }
    }

    // This is only provided for UserHistoryQuizze, not UserHistorySections.
    if (obj.questionsCount) {
      quiz.questionsCount = obj.questionsCount;
    } else {
      obj.questionsCount = 0;
    }

    return quiz;
  }

  public static jsonObjectToSubmissionResult(obj: any): SubmissionResult {
    const result: SubmissionResult = new SubmissionResult();
    result.result = obj.result;

    if (obj.correctAnswer) {
      result.correctAnswer = JsonUtils.jsonObjectToQuizText(obj.correctAnswer);
    }

    if (obj.nextQuestion) {
      result.nextQuestion = JsonUtils.jsonObjectToQuizQuestion(obj.nextQuestion);
    }

    return result;
  }

  public static jsonObjectToLoginInfo(obj: any): LoginInfo {
    const result: LoginInfo = new LoginInfo();

    result.loggedIn = obj.loggedIn;

    result.userId = obj.userId;
    result.nickname = obj.nickname;

    return result;
  }
}
