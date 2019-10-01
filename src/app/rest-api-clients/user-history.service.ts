import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';



import { UserHistorySections} from '../data-structure/user-history-sections';
import { UserHistoryQuizzes} from '../data-structure/user-history-quizzes';
import { UserStats} from '../data-structure/user-stats';
import { Submission } from '../data-structure/submission';
import { SubmissionResult } from '../data-structure/submission-result';
import { LoginInfo } from '../data-structure/login-info';
import { Config } from '../config';

@Injectable()
export class UserHistoryService {
  constructor(private http: HttpClient) { }

  /** Get the history for each section in an individual quiz.
   */
  getUserHistorySectionsForQuiz(quizId: string): Promise<UserHistorySections> {
    // Note: We must use backticks: This is a template literal.
    const url = `${Config.baseApiUrl}/api/user-history/${quizId}`;
    return this.http.get(url, {withCredentials: true})
      .toPromise()
      .then(response => {
      return UserHistorySections.fromJson(response);
      })
      .catch(UserHistoryService.handleError);
      }

      /** Get the overall history for the current user, for all quizzes.
      */
      getUserHistoryForQuizzes(): Promise<UserHistoryQuizzes> {
        // Note: We must use backticks: This is a template literal.
        const url = `${Config.baseApiUrl}/api/user-history`;
        return this.http.get(url, {withCredentials: true})
        .toPromise()
        .then(response => {
        return UserHistoryQuizzes.fromJson(response);
        })
        .catch(UserHistoryService.handleError);
        }

        private createSubmitQueryParams(quizId: string, questionId: string, nextQuestionSectionId: string): HttpParams {
        const p = new HttpParams();
        p.append('quiz-id', quizId);
        p.append('question-id', questionId);

        if (nextQuestionSectionId) {
        p.append('next-question-section-id', nextQuestionSectionId);
        }

        return p;
        }

        submitAnswer(quizId: string, questionId: string, answerText: string, nextQuestionSectionId: string): Promise<SubmissionResult> {
          // Note: We must use backticks: This is a template literal.
          const url = `${Config.baseApiUrl}/api/user-history/submit-answer`;
          const p: HttpParams = this.createSubmitQueryParams(quizId, questionId, nextQuestionSectionId);
          const submission = new Submission();
          submission.answer = answerText;

          return this.http.post(url, submission, {
          params: p,
          withCredentials: true,
          })
          .toPromise()
          .then(response => {
          return UserHistorySections.fromJson(response);
          })
          .catch(UserHistoryService.handleError);
          }

          submitDontKnowAnswer(quizId: string, questionId: string, nextQuestionSectionId: string): Promise<SubmissionResult> {
            // Note: We must use backticks: This is a template literal.
            const url = `${Config.baseApiUrl}/api/user-history/submit-dont-know-answer`;
            const p: HttpParams = this.createSubmitQueryParams(quizId, questionId, nextQuestionSectionId);

            return this.http.post(url, '', {
            params: p,
            withCredentials: true,
            })
            .toPromise()
            .then(response => {
              return SubmissionResult.fromJson(response);
            })
            .catch(UserHistoryService.handleError);
            }

            resetSections(quizId: string): Promise<boolean> {
              // Note: We must use backticks: This is a template literal.
              const url = `${Config.baseApiUrl}/api/user-history/reset-sections`;
              const p = new HttpParams();
              p.append('quiz-id', quizId);

              return this.http.post(url, '', {
              params: p,
              withCredentials: true,
              })
              .toPromise()
              .then(response => {
                return true;
              })
      .catch(UserHistoryService.handleError);
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    // console.error('An error occurred: JSON:', error.json());
    return Promise.reject(error.message || error);
  }
}
