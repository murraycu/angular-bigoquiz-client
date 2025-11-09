import { plainToInstance } from 'class-transformer';

export class LoginInfo {
  public loggedIn = false;
  public nickname = "";

  public googleLinked = false;
  public googleProfileUrl= "";
  public gitHubLinked = false;
  public gitHubProfileUrl= "";
  public facebookLinked = false;
  public facebookProfileUrl= "";

  public errorMessage= "";

  public static fromJson(obj: any): LoginInfo {
    return plainToInstance(LoginInfo, obj as Record<string, unknown>);
  }
}
