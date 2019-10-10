import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Config } from "../config";
import { Submission } from "../data-structure/submission";
import { SubmissionResult } from "../data-structure/submission-result";
import { UserHistoryQuizzes} from "../data-structure/user-history-quizzes";
import { UserHistorySections} from "../data-structure/user-history-sections";

@Injectable()
export class UserHistoryService {

  private static handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    // console.error('An error occurred: JSON:', error.json());
    return Promise.reject(error.message || error);
  }

  private static createSubmitQueryParams(quizId: string, questionId: string,
                                         nextQuestionSectionId: string): HttpParams {
    let p = new HttpParams();
    p = p.set("quiz-id", quizId);
    p = p.set("question-id", questionId);

    if (nextQuestionSectionId) {
      p = p.set ("next-question-section-id", nextQuestionSectionId);
    }

    return p;
  }

  constructor(private http: HttpClient) { }

  /** Get the history for each section in an individual quiz.
   */
  public getUserHistorySectionsForQuiz(quizId: string): Promise<UserHistorySections> {
    // Note: We must use backticks: This is a template literal.
    const url = `${Config.baseApiUrl}/api/user-history/${quizId}`;
    return this.http.get(url, {withCredentials: true})
      .toPromise()
      .then((response) => {
      return UserHistorySections.fromJson(response);
      })
      .catch(UserHistoryService.handleError);
      }

      /** Get the overall history for the current user, for all quizzes.
       */
      public getUserHistoryForQuizzes(): Promise<UserHistoryQuizzes> {
        // Note: We must use backticks: This is a template literal.
        const url = `${Config.baseApiUrl}/api/user-history`;
        return this.http.get(url, {withCredentials: true})
        .toPromise()
        .then((response) => {
        return UserHistoryQuizzes.fromJson(response);
        })
        .catch(UserHistoryService.handleError);
        }

        public submitAnswer(quizId: string, questionId: string, answerText: string,
                            nextQuestionSectionId: string): Promise<SubmissionResult> {
          // Note: We must use backticks: This is a template literal.
          const url = `${Config.baseApiUrl}/api/user-history/submit-answer`;
          const p: HttpParams = UserHistoryService.createSubmitQueryParams(quizId, questionId, nextQuestionSectionId);
          const submission = new Submission();
          submission.answer = answerText;

          return this.http.post(url, submission, {
          params: p,
          withCredentials: true,
          })
          .toPromise()
          .then((response) => {
          return UserHistorySections.fromJson(response);
          })
          .catch(UserHistoryService.handleError);
          }

          public submitDontKnowAnswer(quizId: string, questionId: string,
                                      nextQuestionSectionId: string): Promise<SubmissionResult> {
            // Note: We must use backticks: This is a template literal.
            const url = `${Config.baseApiUrl}/api/user-history/submit-dont-know-answer`;
            const p: HttpParams = UserHistoryService.createSubmitQueryParams(quizId, questionId, nextQuestionSectionId);

            return this.http.post(url, "", {
            params: p,
            withCredentials: true,
            })
            .toPromise()
            .then((response) => {
              return SubmissionResult.fromJson(response);
            })
            .catch(UserHistoryService.handleError);
            }

            public resetSections(quizId: string): Promise<boolean> {
              // Note: We must use backticks: This is a template literal.
              const url = `${Config.baseApiUrl}/api/user-history/reset-sections`;
              let p = new HttpParams();
              p = p.set("quiz-id", quizId);

              return this.http.post(url, "", {
              params: p,
              withCredentials: true,
              })
              .toPromise()
              .then((response) => {
                return true;
              })
      .catch(UserHistoryService.handleError);
  }
}
