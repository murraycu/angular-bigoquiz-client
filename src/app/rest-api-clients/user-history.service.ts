import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { UserHistorySections} from '../data-structure/user-history-sections';
import { UserHistoryQuizzes} from '../data-structure/user-history-quizzes';
import { UserStats} from '../data-structure/user-stats';
import { Submission } from '../data-structure/submission';
import { SubmissionResult } from '../data-structure/submission-result';
import { UserQuestionHistory } from '../data-structure/user-question-history';
import { LoginInfo } from "../data-structure/login-info";
import { Config } from '../config';
import { plainToClass } from "class-transformer";

@Injectable()
export class UserHistoryService {
  constructor(private http: Http) { }

  /** Get the history for each section in an individual quiz.
   */
  getUserHistorySectionsForQuiz(quizId: string): Promise<UserHistorySections> {
    // Note: We must use backticks: This is a template literal.
    const url = `${Config.baseApiUrl}/api/user-history/${quizId}`;
    return this.http.get(url, {withCredentials: true})
      .toPromise()
      .then(response => {
        return UserHistoryService.jsonObjectToUserHistorySections(response.json());
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
        return UserHistoryService.jsonObjectToUserHistoryQuizzes(response.json());
      })
      .catch(UserHistoryService.handleError);
  }

  private createSubmitQueryParams(quizId: string, questionId: string, nextQuestionSectionId: string): URLSearchParams {
    const p = new URLSearchParams();
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
    const p: URLSearchParams = this.createSubmitQueryParams(quizId, questionId, nextQuestionSectionId);
    const submission = new Submission();
    submission.answer = answerText;

    return this.http.post(url, '', {
      params: p,
      body: submission,
      withCredentials: true,
    })
      .toPromise()
      .then(response => {
        return SubmissionResult.fromJson(response.json());
      })
      .catch(UserHistoryService.handleError);
  }

  submitDontKnowAnswer(quizId: string, questionId: string, nextQuestionSectionId: string): Promise<SubmissionResult> {
    // Note: We must use backticks: This is a template literal.
    const url = `${Config.baseApiUrl}/api/user-history/submit-dont-know-answer`;
    const p: URLSearchParams = this.createSubmitQueryParams(quizId, questionId, nextQuestionSectionId);

    return this.http.post(url, '', {
      params: p,
      withCredentials: true,
    })
      .toPromise()
      .then(response => {
        return SubmissionResult.fromJson(response.json());
      })
      .catch(UserHistoryService.handleError);
  }

  resetSections(quizId: string): Promise<boolean> {
    // Note: We must use backticks: This is a template literal.
    const url = `${Config.baseApiUrl}/api/user-history/reset-sections`;
    const p = new URLSearchParams();
    p.append('quiz-id', quizId);

    return this.http.post(url, '', {
      params: p,
      withCredentials: true,
    })
      .toPromise()
      .then(response => {
        return response.ok;
      })
      .catch(UserHistoryService.handleError);
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    // console.error('An error occurred: JSON:', error.json());
    return Promise.reject(error.message || error);
  }

  private static jsonObjectToUserHistorySections(obj: any): UserHistorySections {
    if (!obj) {
      return undefined;
    }

    const result: UserHistorySections = new UserHistorySections();

    if (obj.loginInfo) {
      result.loginInfo = LoginInfo.fromJson(obj.loginInfo);
    }

    result.quizId = obj.quizId;
    result.quizTitle = obj.quizTitle;

    // stats:
    if (obj.stats) {
      result.stats = new Array<UserStats>();
      result.statsMap = new Map<string, UserStats>();

      for (const jsonStats of obj.stats) {
        const userStats = UserHistoryService.jsonObjectToUserStats(jsonStats);

        result.stats.push(userStats);
        result.statsMap.set(userStats.sectionId, userStats);
      }
    }

    return result;
  }

  private static jsonObjectToUserHistoryQuizzes(obj: any): UserHistoryQuizzes {
    if (!obj) {
      return undefined;
    }

    const result: UserHistoryQuizzes = new UserHistoryQuizzes();

    // stats:
    if (obj.stats) {
      result.stats = new Array<UserStats>();

      for (const jsonStats of obj.stats) {
        const userStats = UserHistoryService.jsonObjectToUserStats(jsonStats);
        result.stats.push(userStats);
      }
    }

    return result;
  }

  private static jsonObjectToUserStats(obj: any): UserStats {
    const result: UserStats = plainToClass(UserStats, obj as object)

    if (result.questionHistories) {
      result.questionHistoriesMap = new Map<string, UserQuestionHistory>();
      for (const questionHistory of obj.questionHistories) {
        const questionId = questionHistory.questionId;
        if (!questionId) {
          continue;
        }

        result.questionHistoriesMap.set(questionId, questionHistory);
      }
    }

    // TODO: Do this on the server:
    result.updateTopProblemQuestions();

    return result;
  }

  private static jsonObjectToUserQuestionHistory(obj: any):  UserQuestionHistory {
    return plainToClass(UserQuestionHistory, obj as object)
  }
}
