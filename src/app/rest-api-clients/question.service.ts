import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { QuizQuestion } from '../data-structure/quiz-question';
import { JsonUtils } from '../json-utils';
import { Config } from '../config';

@Injectable()
export class QuestionService {
  constructor(private http: Http) { }

  getNextQuestion(quizId: string, sectionId: string): Promise<QuizQuestion> {
    // Note: We must use backticks: This is a template literal.
    const url = `${Config.baseApiUrl}/api/question/next`;

    const p = new URLSearchParams();
    p.append('quiz-id', quizId);
    if (sectionId) {
      p.append('section-id', sectionId);
    }

    return this.http.get(url, {
      params: p,
      withCredentials: true,
    })
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
