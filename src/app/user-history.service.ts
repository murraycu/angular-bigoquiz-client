import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { UserHistorySections} from './data-structure/user-history-sections';

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

    return result;
  }
}
