import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Quiz } from '../data-structure/quiz';
import { QuizQuestion } from '../data-structure/quiz-question';
import { QuizSection } from '../data-structure/quiz-section';
import { Config } from '../config';

@Injectable()
export class QuizService {
  constructor(private http: Http) { }

  getQuizzes(): Promise<Quiz[]> {
   const url = Config.baseApiUrl + '/api/quiz?list-only=true';
   return this.http.get(url)
      .toPromise()
      .then(response => {
        const json = response.json();
        const result: Quiz[] = json.map(o => {
          return Quiz.fromJson(o);
        });
        return result;
      })
      .catch(QuizService.handleError);

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
    const url = `${Config.baseApiUrl}/api/quiz/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return Quiz.fromJson(response.json());
      })
      .catch(QuizService.handleError);

    /*
    const quiz: Quiz = {id: "123", title: "foo"};
    return Promise.resolve(quiz);
    */
  }

  getQuizSections(quizId: string): Promise<QuizSection[]> {
    // Note: We must use backticks: This is a template literal.
    const url = `${Config.baseApiUrl}/api/quiz/${quizId}/section?list-only=true`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        const json = response.json();
        const result: QuizSection[] = json.map(o => {
          return QuizSection.fromJson(o);
        });
        return result;
      })
      .catch(QuizService.handleError);
  }

  getQuizQuestion(quizId: string, questionId: string): Promise<QuizQuestion> {
    // Note: We must use backticks: This is a template literal.
    const url = `${Config.baseApiUrl}/api/quiz/${quizId}/question/${questionId}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return QuizQuestion.fromJson(response.json());
      })
      .catch(QuizService.handleError);
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    // console.error('An error occurred: JSON:', error.json());
    return Promise.reject(error.message || error);
  }
}
