import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Quiz } from './data-structure/quiz';
import { QuizQuestion } from './data-structure/quiz-question';
import { JsonUtils } from './json-utils'
import { Config } from './config';

@Injectable()
export class QuizService {
  constructor(private http: Http) { }

  getQuizzes(): Promise<Quiz[]> {
   const url = Config.baseUrl + '/api/quiz/?list-only=true';
   return this.http.get(url)
      .toPromise()
      .then(response => {
        let json = response.json()
        let result: Quiz[] = json.map(o => {
          return JsonUtils.jsonObjectToQuiz(o);
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
    const url = `${Config.baseUrl}/api/quiz/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return JsonUtils.jsonObjectToQuiz(response.json());
      })
      .catch(this.handleError);

    /*
    const quiz: Quiz = {id: "123", title: "foo"};
    return Promise.resolve(quiz);
    */
  }

  getQuizQuestion(quizId: string, questionId: string): Promise<QuizQuestion> {
    // Note: We must use backticks: This is a template literal.
    const url = `${Config.baseUrl}/api/quiz/${quizId}/question/${questionId}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return JsonUtils.jsonObjectToQuizQuestion(response.json());
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    console.error('An error occurred: JSON:', error.json());
    return Promise.reject(error.message || error);
  }
}
