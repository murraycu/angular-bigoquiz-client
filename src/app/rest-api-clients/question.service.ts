import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';



import { QuizQuestion } from '../data-structure/quiz-question';
import { Config } from '../config';

@Injectable()
export class QuestionService {
  constructor(private http: HttpClient) { }

  getNextQuestion(quizId: string, sectionId: string): Promise<QuizQuestion> {
    // Note: We must use backticks: This is a template literal.
    const url = `${Config.baseApiUrl}/api/question/next`;

    const p = new HttpParams();
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
        return QuizQuestion.fromJson(response);
      })
      .catch(QuestionService.handleError);
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    // console.error('An error occurred: JSON:', error);
    return Promise.reject(error.message || error);
  }
}
