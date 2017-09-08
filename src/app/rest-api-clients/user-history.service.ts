import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { UserHistorySections} from '../data-structure/user-history-sections';
import { UserHistoryQuizzes} from '../data-structure/user-history-quizzes';
import { UserStats} from '../data-structure/user-stats';
import { SubmissionResult} from '../data-structure/submission-result';
import { UserQuestionHistory} from '../data-structure/user-question-history';
import { JsonUtils } from '../json-utils';
import { Config } from '../config';

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

  submitAnswer(quizId: string, questionId: string, answerText: string): Promise<SubmissionResult> {
    // Note: We must use backticks: This is a template literal.
    const url = `${Config.baseApiUrl}/api/user-history/submit-answer?quiz-id=${quizId}&question-id=${questionId}&answer=${answerText}`;
    return this.http.post(url, '')
      .toPromise()
      .then(response => {
        return JsonUtils.jsonObjectToSubmissionResult(response.json());
      })
      .catch(UserHistoryService.handleError);
  }

  submitDontKnowAnswer(quizId: string, questionId: string): Promise<SubmissionResult> {
    // Note: We must use backticks: This is a template literal.
    const url = `${Config.baseApiUrl}/api/user-history/submit-dont-know-answer?quiz-id=${quizId}&question-id=${questionId}`;
    return this.http.post(url, '')
      .toPromise()
      .then(response => {
        return JsonUtils.jsonObjectToSubmissionResult(response.json());
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
      result.loginInfo = JsonUtils.jsonObjectToLoginInfo(obj.loginInfo);
    }

    // stats:
    if (obj.stats) {
      result.stats = new Array<UserStats>()
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
    if (!obj) {
      return undefined;
    }

    const result: UserStats = new UserStats();
    result.quizId = obj.quizId;
    result.quizTitle = obj.quizTitle;
    result.sectionId = obj.sectionId;
    result.sectionTitle = obj.sectionTitle;

    result.answered = JsonUtils.numberOrZero(obj.answered);
    result.correct = JsonUtils.numberOrZero(obj.correct);
    result.countQuestions = JsonUtils.numberOrZero(obj.countQuestions);
    result.countQuestionsAnsweredOnce = JsonUtils.numberOrZero(obj.countQuestionsAnsweredOnce);
    result.countQuestionsCorrectOnce = JsonUtils.numberOrZero(obj.countQuestionsCorrectOnce);

    result.problemQuestionHistoriesCount = JsonUtils.numberOrZero(obj.problemQuestionHistoriesCount);

    if (obj.questionHistories) {
      result.questionHistories = new Map<string, UserQuestionHistory>();
      for (const questionId in obj.questionHistories) {
        const jsonQuestionHistory = obj.questionHistories[questionId];
        if (!jsonQuestionHistory) {
          continue;
        }

        const questionHistory = UserHistoryService.jsonObjectToUserQuestionHistory(jsonQuestionHistory);
        result.questionHistories.set(questionId, questionHistory);
      }
    }

    // This is actually based on questionHistories,
    // but it has been calculated for us by the server:
    if (obj.topProblemQuestionHistories) {
      result.topProblemQuestionHistories = [];
      for (const jsonQuestionHistory of obj.topProblemQuestionHistories) {
        const questionHistory = UserHistoryService.jsonObjectToUserQuestionHistory(jsonQuestionHistory);
        result.topProblemQuestionHistories.push(questionHistory);
      }
    }

    return result;
  }

  private static jsonObjectToUserQuestionHistory(obj: any):  UserQuestionHistory {
    if (!obj) {
      return undefined;
    }

    const result: UserQuestionHistory = new UserQuestionHistory();
    result.questionId = obj.questionId;

    if (obj.questionTitle) {
      result.questionTitle = JsonUtils.jsonObjectToQuizText(obj.questionTitle);
    }

    result.subSectionTitle = obj.sectionTitle;
    result.answeredCorrectlyOnce = obj.answeredCorrectlyOnce;
    result.countAnsweredWrong = obj.countAnsweredWrong;
    return result;
  }
}
