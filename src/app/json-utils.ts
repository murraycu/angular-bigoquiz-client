import { QuizSection } from './data-structure/quiz-section';
import { QuizSubSection } from './data-structure/quiz-sub-section';
import { QuizQuestionAndAnswer } from './data-structure/quiz-question-and-answer';
import { QuizQuestion } from './data-structure/quiz-question';
import { QuizText } from './data-structure/quiz-text';
import { Quiz } from './data-structure/quiz';
import { HasIdAndTitle } from './data-structure/has-id-and-title';

export class JsonUtils {
  public static jsonObjectToQuizSections(obj: any): QuizSection[] {
    if (!obj) {
      return null;
    }

    // TODO: We won't need to use this when the JSON of the sections is an array.
    let sectionsSequence: string[] = obj.sectionsSequence;

    let jsonSectionsInner = obj.sections;
    if (!jsonSectionsInner) {
      return null;
    }

    let result = new Array<QuizSection>();

    // The JSON here should really be an array,
    // with a order in the JSON,
    // but it is currently a map. See https://github.com/murraycu/gwt-bigoquiz/issues/1
    // for (let jsonSection of jsonSectionsInner)

    // Iterate over all properties in the object.
    // The name of the property is the name of a key in the map
    // (the ID of a section).
    for (let id of sectionsSequence) {
      let jsonSection: Object = jsonSectionsInner[id];
      let section = JsonUtils.jsonObjectToQuizSection(jsonSection);
      result.push(section);
    }

    return result;
  }

  private static jsonObjectToQuizSection(obj: any): QuizSection {
    let section: QuizSection = new QuizSection();

    JsonUtils.jsonLoadHasIdAndTitle(obj, section);

    if (obj.subSections) {
      section.subSections = new Array<QuizSubSection>();
      section.subSectionsMap = new Map<string, QuizSubSection>();

      for (let jsonSubSectionId in obj.subSections) {
        // TODO: Keep the sequence from the JSON:
        let jsonSubSection = obj.subSections[jsonSubSectionId];
        let subSection = JsonUtils.jsonObjectToQuizSubSection(jsonSubSection);
        section.subSections.push(subSection);
        section.subSectionsMap.set(subSection.id, subSection);
      }
    }

    if (obj.questions) {
      section.questions = new Array<QuizQuestionAndAnswer>();
      for (let jsonQA of obj.questions) {
        let qa: QuizQuestionAndAnswer = JsonUtils.jsonObjectToQuizQuestionAndAnswer(jsonQA);

        if (qa.question.subSectionId) {
          let subSection: QuizSubSection = section.getSubSectionById(qa.question.subSectionId);
          if (subSection) {
            subSection.addQuestion(qa);
          }
        } else {
          section.addQuestion(qa);
        }
      }
    }

    section.questionsCount = JsonUtils.numberOrZero(obj.questionsCount);

    return section;
  }

  private static jsonObjectToQuizSubSection(obj: any): QuizSubSection {
    let subSection: QuizSubSection = new QuizSubSection();

    JsonUtils.jsonLoadHasIdAndTitle(obj, subSection);

    return subSection;
  }

  public static jsonObjectToQuizQuestionAndAnswer(obj: any): QuizQuestionAndAnswer {
    let result: QuizQuestionAndAnswer = new QuizQuestionAndAnswer();
    result.question = JsonUtils.jsonObjectToQuizQuestion(obj.question);
    result.answer = JsonUtils.jsonObjectToQuizText(obj.answer);

    return result;
  }

  private static jsonObjectToQuizQuestion(obj: any): QuizQuestion {
    let result: QuizQuestion = new QuizQuestion();
    result.id = obj.id;
    result.sectionId = obj.sectionId;
    result.subSectionId = obj.subSectionId;
    result.text = JsonUtils.jsonObjectToQuizText(obj.text);
    result.link = obj.link;

    result.note = obj.note;
    result.videoUrl = obj.videoUrl;
    result.codeUrl = obj.codeUrl;

    // These are in the JSON for convenience,
    // so we don't need to get them from the quiz.
    result.quizTitle = obj.quizTitle;

    if (obj.section) {
      result.section = JsonUtils.jsonObjectToQuizSection(obj.section);
    }

    if (obj.subSection) {
      result.subSection = JsonUtils.jsonObjectToQuizSubSection(obj.subSection);
    }

    result.quizUsesMathML = obj.quizUsesMathML;

    return result;
  }

  private static jsonObjectToQuizText(obj: any): QuizText {
    let result: QuizText = new QuizText();
    result.text = obj.text;
    result.isHtml = obj.isHtml;

    return result;
  }

  public static jsonLoadHasIdAndTitle(obj: any, base: HasIdAndTitle) {
    if (obj) {
      base.id = obj.id;
      base.title = obj.title;
      base.link = obj.link;
    }
  }

  public static numberOrZero(obj: any): number {
    return obj ? obj : 0;
  }

  public static jsonObjectToQuiz(obj: any): Quiz {
    let quiz: Quiz = new Quiz();

    JsonUtils.jsonLoadHasIdAndTitle(obj, quiz);
    if (obj) {
      quiz.isPrivate = obj.isPrivate;
      quiz.usesMathML = obj.usesMathML;
    } else {
      quiz.isPrivate = false;
      quiz.usesMathML = false;
    }

    let jsonSections = obj.sections;
    if (jsonSections) {
      quiz.sections = JsonUtils.jsonObjectToQuizSections(jsonSections);
    }

    if (obj.questions) {
      for (let jsonQA of obj.questions) {
        let qa: QuizQuestionAndAnswer = JsonUtils.jsonObjectToQuizQuestionAndAnswer(jsonQA);
        if (!qa.question.sectionId) {
          quiz.addQuestion(qa);
        }
      }
    }

    return quiz;
  }
}
