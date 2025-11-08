import { plainToClass } from 'class-transformer';

export class LoginInfo {
  public loggedIn: boolean = false;
  public nickname: string = "";

  public googleLinked: boolean = false;
  public googleProfileUrl: string= "";
  public gitHubLinked: boolean = false;
  public gitHubProfileUrl: string= "";
  public facebookLinked: boolean = false;
  public facebookProfileUrl: string= "";

  public errorMessage: string= "";

  public static fromJson(obj: any): LoginInfo {
    return plainToClass(LoginInfo, obj as Record<string, unknown>);
  }
}
