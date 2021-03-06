import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Config } from "../config";
import { QuizQuestion } from "../data-structure/quiz-question";

@Injectable()
export class QuestionService {

  private static handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    // console.error('An error occurred: JSON:', error);
    return Promise.reject(error.message || error);
  }
  constructor(private http: HttpClient) { }

  public getNextQuestion(quizId: string, sectionId: string): Promise<QuizQuestion> {
    // Note: We must use backticks: This is a template literal.
    const url = `${Config.baseApiUrl}/api/question/next`;

    let p = new HttpParams();
    p = p.set("quiz-id", quizId);
    if (sectionId) {
      p = p.set("section-id", sectionId);
    }

    return this.http.get(url, {
      params: p,
      withCredentials: true,
    })
      .toPromise()
      .then((response) => {
        return QuizQuestion.fromJson(response);
      })
      .catch(QuestionService.handleError);
  }
}
