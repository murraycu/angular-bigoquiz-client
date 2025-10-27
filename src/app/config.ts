export class Config {
  // When using gwt-bigoquiz with Jetty: static baseApiUrl: string = 'http://localhost:8080';
  public static baseApiUrl = 'https://api.bigoquiz.com';

  // TODO: Disover this dynamically?
  public static baseUrl = 'https://bigoquiz.com';
  // static baseUrl: string = 'http://localhost:4200';

  public static googleLoginPrefix = `${Config.baseApiUrl}/login/login-google`;
  public static gitHubLoginPrefix = `${Config.baseApiUrl}/login/login-github`;
  public static facebookLoginPrefix = `${Config.baseApiUrl}/login/login-facebook`;
}
