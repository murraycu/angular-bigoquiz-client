import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { HasIdAndTitle } from './has-id-and-title';
import { Quiz } from './quiz';
import { QuizSection } from './quiz-section';
import { QuizSubSection } from './quiz-sub-section';

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
          return this.jsonObjectToQuiz(o);
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
        return this.jsonObjectToQuiz(response.json());
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

  private jsonObjectToQuiz(obj: any): Quiz {
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
      // TODO: We won't need to use this when the JSON of the sections is an array.
      let sectionsSequence: string[] = jsonSections.sectionsSequence;

      let jsonSectionsInner = jsonSections.sections;
      if (jsonSectionsInner) {
        quiz.sections = new Array<QuizSection>();

        // The JSON here should really be an array,
        // with a order in the JSON,
        // but it is currently a map. See https://github.com/murraycu/gwt-bigoquiz/issues/1
        // for (let jsonSection of jsonSectionsInner)

        // Iterate over all properties in the object.
        // The name of the property is the name of a key in the map
        // (the ID of a section).
        for (let id of sectionsSequence) {
          let jsonSection: Object = jsonSectionsInner[id];
          let section = this.jsonObjectToQuizSection(jsonSection);
          quiz.sections.push(section);
        }
      }
    }

    return quiz;
  }

  private jsonObjectToQuizSection(obj: any): QuizSection {
    let section: QuizSection = new QuizSection();

    QuizService.jsonLoadHasIdAndTitle(obj, section);

    section.subSections = new Array<QuizSubSection>();
    for (let jsonSubSectionId in obj.subSections) {
      // TODO: Keep the sequence from the JSON:
      let jsonSubSection = obj.subSections[jsonSubSectionId];
      let subSection = this.jsonObjectToQuizSubSection(jsonSubSection);
      section.subSections.push(subSection);
    }

    return section;
  }

  private jsonObjectToQuizSubSection(obj: any): QuizSubSection {
    let subSection: QuizSubSection = new QuizSubSection();

    QuizService.jsonLoadHasIdAndTitle(obj, subSection);

    return subSection;
  }
}
