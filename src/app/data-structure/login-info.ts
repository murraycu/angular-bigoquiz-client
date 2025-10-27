import { plainToClass } from 'class-transformer';

export class LoginInfo {
  public loggedIn: boolean;
  public nickname: string;

  public googleLinked: boolean;
  public googleProfileUrl: string;
  public gitHubLinked: boolean;
  public gitHubProfileUrl: string;
  public facebookLinked: boolean;
  public facebookProfileUrl: string;

  public errorMessage: string;

  public static fromJson(obj: any): LoginInfo {
    return plainToClass(LoginInfo, obj as Record<string, unknown>);
  }
}
