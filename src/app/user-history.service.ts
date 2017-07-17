import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { UserHistorySections} from './data-structure/user-history-sections';
import { UserStats} from './data-structure/user-stats';
import { JsonUtils } from './json-utils';

@Injectable()
export class UserHistoryService {
  // When using gwt-bigoquiz with Jetty: private baseUrl = 'http://localhost:8080';
  private baseUrl = 'http://bigoquiz.com';

  constructor(private http: Http) { }

  getUserHistorySections(quizId: string): Promise<UserHistorySections> {
    // Note: We must use backticks: This is a template literal.
    const url = `${this.baseUrl}/api/user-history/${quizId}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return UserHistoryService.jsonObjectToUserHistorySections(response.json());
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

  private static jsonObjectToUserStats(obj: any): UserStats {
    let result: UserStats = new UserStats();
    result.sectionId = obj.sectionId;
    result.answered = obj.answered;
    result.correct = obj.correct;
    result.countQuestionsAnsweredOnce = obj.countQuestionsAnsweredOnce;
    result.countQuestionsCorrectOnce = obj.countQuestionsCorrectOnce;

    return result;
  }
}
