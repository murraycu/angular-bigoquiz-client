import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { LoginInfo} from './data-structure/login-info';

@Injectable()
export class UserService {
  // When using gwt-bigoquiz with Jetty: private baseUrl = 'http://localhost:8080';
  private baseUrl = 'http://bigoquiz.com';

  constructor(private http: Http) { }

  /** Get the overall history for the current user, for all quizzes.
   */
  getUser(): Promise<LoginInfo> {
    // Note: We must use backticks: This is a template literal.
    const url = `${this.baseUrl}/api/user`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return UserService.jsonObjectToLoginInfo(response.json());
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    console.error('An error occurred: JSON:', error.json());
    return Promise.reject(error.message || error);
  }

  private static jsonObjectToLoginInfo(obj: any): LoginInfo {
    let result: LoginInfo = new LoginInfo();
    result.loggedIn = obj.loggedIn;
    result.loginUrl = obj.loginUrl;
    result.logoutUrl = obj.logoutUrl;
    result.userId = obj.userId;
    result.nickname = obj.nickname;

    return result;
  }

}
