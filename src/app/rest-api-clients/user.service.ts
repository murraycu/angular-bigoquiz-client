import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { LoginInfo} from '../data-structure/login-info';
import { JsonUtils} from '../json-utils';

import { Config } from '../config';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  /** Get the overall history for the current user, for all quizzes.
   */
  getUser(currentUrl: string): Promise<LoginInfo> {
    // Note: We must use backticks: This is a template literal.
    const url = `${Config.baseUrl}/api/user?request-url=${currentUrl}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return JsonUtils.jsonObjectToLoginInfo(response.json());
      })
      .catch(UserService.handleError);
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    console.error('An error occurred: JSON:', error.json());
    return Promise.reject(error.message || error);
  }
}
