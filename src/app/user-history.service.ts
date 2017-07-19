import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { UserHistorySections} from './data-structure/user-history-sections';
import { UserHistoryQuizzes} from './data-structure/user-history-quizzes';
import { UserStats} from './data-structure/user-stats';
import { Quiz} from './data-structure/quiz';
import { SubmissionResult} from './data-structure/submission-result';
import { JsonUtils } from './json-utils';
import { Config } from './config';

@Injectable()
export class UserHistoryService {
  constructor(private http: Http) { }

  /** Get the history for each section in an individual quiz.
   */
  getUserHistorySectionsForQuiz(quizId: string): Promise<UserHistorySections> {
    // Note: We must use backticks: This is a template literal.
    const url = `${Config.baseUrl}/api/user-history/${quizId}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return UserHistoryService.jsonObjectToUserHistorySections(response.json());
      })
      .catch(this.handleError);
  }

  /** Get the overall history for the current user, for all quizzes.
   */
  getUserHistoryForQuizzes(): Promise<UserHistoryQuizzes> {
    // Note: We must use backticks: This is a template literal.
    const url = `${Config.baseUrl}/api/user-history`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return UserHistoryService.jsonObjectToUserHistoryQuizzes(response.json());
      })
      .catch(this.handleError);
  }

  submitAnswer(quizId: string, questionId: string, answerText: string) : Promise<SubmissionResult> {
    // Note: We must use backticks: This is a template literal.
    const url = `${Config.baseUrl}/api/user-history/submit-answer?quiz-id=${quizId}&question-id=${questionId}&answer=${answerText}`;
    return this.http.post(url, "")
      .toPromise()
      .then(response => {
        return UserHistoryService.jsonObjectToSubmissionResult(response.json());
      })
      .catch(this.handleError);
    }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    console.error('An error occurred: JSON:', error.json());
    return Promise.reject(error.message || error);
  }

  private static jsonObjectToUserHistorySections(obj: any): UserHistorySections {
    let result: UserHistorySections = new UserHistorySections();
    result.sections = JsonUtils.jsonObjectToQuizSections(obj.sections);

    // stats:
    if (obj.stats) {
      result.stats = new Map<string, UserStats>();

      for (let sectionId in obj.stats) {
        let jsonStats = obj.stats[sectionId];
        let userStats = UserHistoryService.jsonObjectToUserStats(jsonStats);
        result.stats.set(userStats.sectionId, userStats);
      }
    }

    return result;
  }

  private static jsonObjectToUserHistoryQuizzes(obj: any): UserHistoryQuizzes {
    let result: UserHistoryQuizzes = new UserHistoryQuizzes();
    result.quizzes = new Array<Quiz>();
    for (let jsonQuiz in obj.quizzes) {
      let quiz = JsonUtils.jsonObjectToQuiz(jsonQuiz);
      result.quizzes.push(quiz);
      }

    // stats:
    if (obj.stats) {
      result.stats = new Map<string, UserStats>();

      for (let quizId in obj.stats) {
        let jsonStats = obj.stats[quizId];
        let userStats = UserHistoryService.jsonObjectToUserStats(jsonStats);
        result.stats.set(userStats.quizId, userStats);
      }
    }

    return result;
  }

  private static jsonObjectToUserStats(obj: any): UserStats {
    let result: UserStats = new UserStats();
    result.quizId = obj.quizId;
    result.sectionId = obj.sectionId;

    result.answered = JsonUtils.numberOrZero(obj.answered);
    result.correct = JsonUtils.numberOrZero(obj.correct);
    result.countQuestionsAnsweredOnce = JsonUtils.numberOrZero(obj.countQuestionsAnsweredOnce);
    result.countQuestionsCorrectOnce = JsonUtils.numberOrZero(obj.countQuestionsCorrectOnce);

    return result;
  }

  private static jsonObjectToSubmissionResult(obj: any): SubmissionResult {
    let result: SubmissionResult = new SubmissionResult();
    result.result = obj.result;
    // TODO.
    return result;
  }
}
