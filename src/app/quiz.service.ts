import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { HasIdAndTitle } from './data-structure/has-id-and-title';
import { Quiz } from './data-structure/quiz';
import { QuizSection } from './data-structure/quiz-section';
import { QuizSubSection } from './data-structure/quiz-sub-section';
import { QuizQuestionAndAnswer } from './data-structure/quiz-question-and-answer';
import { QuizQuestion } from './data-structure/quiz-question';
import { QuizText } from './data-structure/quiz-text';

@Injectable()
export class QuizService {
  // When using gwt-bigoquiz with Jetty: private baseUrl = 'http://localhost:8080';
  private baseUrl = 'http://bigoquiz.com';

  constructor(private http: Http) { }

  getQuizzes(): Promise<Quiz[]> {
   const url = this.baseUrl + '/api/quiz/?list-only=true';
   return this.http.get(url)
      .toPromise()
      .then(response => {
        let json = response.json()
        let result: Quiz[] = json.map(o => {
          return QuizService.jsonObjectToQuiz(o);
        });
        return result;
      })
      .catch(this.handleError);

    /*
    const QUIZZES: Quiz[] = [
      { id: "1", title: 'Foo' },
      { id: "2", title: 'Bar' }
    ];
    return Promise.resolve(QUIZZES);
    */
  }

  getQuiz(id: string): Promise<Quiz> {
    // Note: We must use backticks: This is a template literal.
    const url = `${this.baseUrl}/api/quiz/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return QuizService.jsonObjectToQuiz(response.json());
      })
      .catch(this.handleError);

    /*
    const quiz: Quiz = {id: "123", title: "foo"};
    return Promise.resolve(quiz);
    */
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    console.error('An error occurred: JSON:', error.json());
    return Promise.reject(error.message || error);
  }

  private static jsonLoadHasIdAndTitle(obj: any, base: HasIdAndTitle) {
    if (obj) {
      base.id = obj.id;
      base.title = obj.title;
      base.link = obj.link;
    }
  }

  private static jsonObjectToQuiz(obj: any): Quiz {
    let quiz: Quiz = new Quiz();

    QuizService.jsonLoadHasIdAndTitle(obj, quiz);
    if (obj) {
      quiz.isPrivate = obj.isPrivate;
      quiz.usesMathML = obj.usesMathML;
    } else {
      quiz.isPrivate = false;
      quiz.usesMathML = false;
    }

    let jsonSections = obj.sections;
    if (jsonSections) {
      quiz.sections = QuizService.jsonObjectToQuizSections(jsonSections);
    }

    if (obj.questions) {
      for (let jsonQA of obj.questions) {
        let qa: QuizQuestionAndAnswer = QuizService.jsonObjectToQuizQuestionAndAnswer(jsonQA);
        if (!qa.question.sectionId) {
          quiz.addQuestion(qa);
        }
      }
    }

    return quiz;
  }

  private static jsonObjectToQuizSections(obj: any): QuizSection[] {
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
      let section = QuizService.jsonObjectToQuizSection(jsonSection);
      result.push(section);
    }

    return result;
  }

  private static jsonObjectToQuizSection(obj: any): QuizSection {
    let section: QuizSection = new QuizSection();

    QuizService.jsonLoadHasIdAndTitle(obj, section);

    if (obj.subSections) {
      section.subSections = new Array<QuizSubSection>();
      section.subSectionsMap = new Map<string, QuizSubSection>();

      for (let jsonSubSectionId in obj.subSections) {
        // TODO: Keep the sequence from the JSON:
        let jsonSubSection = obj.subSections[jsonSubSectionId];
        let subSection = QuizService.jsonObjectToQuizSubSection(jsonSubSection);
        section.subSections.push(subSection);
        section.subSectionsMap.set(subSection.id, subSection);
      }
    }

    if (obj.questions) {
      section.questions = new Array<QuizQuestionAndAnswer>();
      for (let jsonQA of obj.questions) {
        let qa: QuizQuestionAndAnswer = QuizService.jsonObjectToQuizQuestionAndAnswer(jsonQA);

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

    return section;
  }

  private static jsonObjectToQuizSubSection(obj: any): QuizSubSection {
    let subSection: QuizSubSection = new QuizSubSection();

    QuizService.jsonLoadHasIdAndTitle(obj, subSection);

    return subSection;
  }

  private static jsonObjectToQuizQuestionAndAnswer(obj: any): QuizQuestionAndAnswer {
    let result: QuizQuestionAndAnswer = new QuizQuestionAndAnswer();
    result.question = QuizService.jsonObjectToQuizQuestion(obj.question);
    result.answer = QuizService.jsonObjectToQuizText(obj.answer);

    return result;
  }

  private static jsonObjectToQuizQuestion(obj: any): QuizQuestion {
    let result: QuizQuestion = new QuizQuestion();
    result.id = obj.id;
    result.sectionId = obj.sectionId;
    result.subSectionId = obj.subSectionId;
    result.text = QuizService.jsonObjectToQuizText(obj.text);
    result.link = obj.link;

    result.note = obj.note;
    result.videoUrl = obj.videoUrl;
    result.codeUrl = obj.codeUrl;

    // These are in the JSON for convenience,
    // so we don't need to get them from the quiz.
    result.quizTitle = obj.quizTitle;

    if (obj.section) {
      result.section = QuizService.jsonObjectToQuizSection(obj.section);
    }

    if (obj.subSection) {
      result.subSection = QuizService.jsonObjectToQuizSubSection(obj.subSection);
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
}
