import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { QuizQuestion } from '../data-structure/quiz-question';
import { JsonUtils } from '../json-utils';
import { Config } from '../config';

@Injectable()
export class QuestionService {
  constructor(private http: Http) { }

  getNextQuestion(quizId: string, sectionId: string): Promise<QuizQuestion> {
    // Note: We must use backticks: This is a template literal.
    const url = `${Config.baseApiUrl}/api/question/next?quiz-id=${quizId}`;
    const urlWhole = sectionId ? url + `&section-id=${sectionId}` : url;
    return this.http.get(urlWhole)
      .toPromise()
      .then(response => {
        return JsonUtils.jsonObjectToQuizQuestion(response.json());
      })
      .catch(QuestionService.handleError);
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    // console.error('An error occurred: JSON:', error.json());
    return Promise.reject(error.message || error);
  }
}
