import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoginInfo} from '../data-structure/login-info';

import { Config } from '../config';

@Injectable()
export class UserService {

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    // console.error('An error occurred: JSON:', error.json());
    return Promise.reject(error.message || error);
  }

  constructor(private http: HttpClient) { }

  /** Get the overall history for the current user, for all quizzes.
   */
  public getUser(): Promise<LoginInfo> {
    // Note: We must use backticks: This is a template literal.
    const url = `${Config.baseApiUrl}/api/user`;
    return this.http.get(url, {withCredentials: true})
      .toPromise()
      .then((response) => LoginInfo.fromJson(response))
      .catch(UserService.handleError);
  }
}
