import { LoginInfo } from "./login-info";

describe("LoginInfo without the TestBed", () => {
  beforeEach(() => {
  });

  it ("deserializes properly from JSON", () => {
    // TODO: Does Response.json() uses JSON.parse() too?
    const jsonObj: string = JSON.parse(`
{
  "loggedIn": true,
  "nickname": "example@example.com"
}`);

    const obj: LoginInfo = LoginInfo.fromJson(jsonObj);
    expect(obj).toBeTruthy(obj);

    expect(obj.loggedIn).toEqual(true);

    expect(obj.nickname).toBeTruthy(obj);
    expect(obj.nickname).toEqual("example@example.com");
  });
});
