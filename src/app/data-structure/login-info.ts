import { plainToClass } from 'class-transformer';

export class LoginInfo {
  public static fromJson(obj: any): LoginInfo {
    return plainToClass(LoginInfo, obj as object);
  }

  loggedIn: boolean;
  userId: string;
  nickname: string;

  googleLinked: boolean;
  googleProfileUrl: string;
  gitHubLinked: boolean;
  gitHubProfileUrl: string;
  facebookLinked: boolean;
  facebookProfileUrl: string;

  errorMessage: string;
}
