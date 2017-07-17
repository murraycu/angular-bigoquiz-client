import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Quiz } from './data-structure/quiz';
import { QuizQuestionAndAnswer } from './data-structure/quiz-question-and-answer';
import { JsonUtils } from './json-utils';

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

  private static jsonObjectToQuiz(obj: any): Quiz {
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
