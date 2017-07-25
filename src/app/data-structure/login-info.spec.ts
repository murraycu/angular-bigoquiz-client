import { LoginInfo } from './login-info';
import { JsonUtils } from '../json-utils';

describe('LoginInfo without the TestBed', () => {
  beforeEach(() => {
  });

  it ('deserializes properly from JSON', () => {
    // TODO: Does Response.json() uses JSON.parse() too?
    const jsonObj: string = JSON.parse(`
{
  "loggedIn": true,
  "loginUrl": null,
  "logoutUrl": "http://bigoquiz.com/exampleloginurl",
  "userId": "1234",
  "nickname": "example@example.com"
}`);

    const obj = JsonUtils.jsonObjectToLoginInfo(jsonObj);
    expect(obj).toBeTruthy(obj);

    expect(obj.loggedIn).toEqual(true);

    expect(obj.loginUrl).toBeUndefined();

    expect(obj.logoutUrl).toBeTruthy(obj);
    expect(obj.logoutUrl).toEqual('http://bigoquiz.com/exampleloginurl');

    expect(obj.userId).toBeTruthy(obj);
    expect(obj.userId).toEqual('1234');

    expect(obj.nickname).toBeTruthy(obj);
    expect(obj.nickname).toEqual('example@example.com');
  });
});
