export class Config {
  // When using gwt-bigoquiz with Jetty: static baseApiUrl: string = 'http://localhost:8080';
  static baseApiUrl = 'https://api.bigoquiz.com';

  // TODO: Disover this dynamically?
  static baseUrl = 'https://beta.bigoquiz.com';
  // static baseUrl: string = 'http://localhost:4200';

  static googleLoginPrefix = `${Config.baseApiUrl}/login/login-google`;
  static gitHubLoginPrefix = `${Config.baseApiUrl}/login/login-github`;
  static facebookLoginPrefix = `${Config.baseApiUrl}/login/login-facebook`;
}
