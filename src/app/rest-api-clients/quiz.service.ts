import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Config } from "../config";
import { Quiz } from "../data-structure/quiz";
import { QuizQuestion } from "../data-structure/quiz-question";
import { QuizSection } from "../data-structure/quiz-section";

@Injectable()
export class QuizService {

  private static handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    // console.error('An error occurred: JSON:', error.json());
    return Promise.reject(error.message || error);
  }
  constructor(private http: HttpClient) { }

  public getQuizzes(): Promise<Quiz[]> {
   const url = Config.baseApiUrl + "/api/quiz?list-only=true";
   return this.http.get(url)
      .toPromise()
      .then((response) => {
        return Quiz.fromJson(response);
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

  public getQuiz(id: string): Promise<Quiz> {
    // Note: We must use backticks: This is a template literal.
    const url = `${Config.baseApiUrl}/api/quiz/${id}`;
    return this.http.get(url)
      .toPromise()
      .then((response) => {
        return Quiz.fromJson(response);
      })
      .catch(QuizService.handleError);

    /*
    const quiz: Quiz = {id: "123", title: "foo"};
    return Promise.resolve(quiz);
    */
  }

  public getQuizSections(quizId: string): Promise<QuizSection[]> {
    // Note: We must use backticks: This is a template literal.
    const url = `${Config.baseApiUrl}/api/quiz/${quizId}/section?list-only=true`;
    return this.http.get(url)
      .toPromise()
      .then((response) => {
        return QuizSection.fromJson(response);
      })
      .catch(QuizService.handleError);
  }

  public getQuizQuestion(quizId: string, questionId: string): Promise<QuizQuestion> {
    // Note: We must use backticks: This is a template literal.
    const url = `${Config.baseApiUrl}/api/quiz/${quizId}/question/${questionId}`;
    return this.http.get(url)
      .toPromise()
      .then((response) => {
        return QuizQuestion.fromJson(response);
      })
      .catch(QuizService.handleError);
  }
}
