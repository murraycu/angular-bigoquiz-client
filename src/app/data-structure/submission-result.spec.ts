import { QuizText } from './quiz-text';
import { JsonUtils } from '../json-utils';

describe('QuizText without the TestBed', () => {
  beforeEach(() => {
  });

  it ('deserializes properly from JSON', () => {
    // TODO: Does Response.json() uses JSON.parse() too?
    const jsonObj: string = JSON.parse('{"text":"Foo Bar","isHtml":false}');

    const obj = JsonUtils.jsonObjectToQuizText(jsonObj);
    expect(obj).toBeTruthy(obj);
    expect(obj.text).toBeTruthy(obj);
    expect(obj.text).toEqual('Foo Bar');
    expect(obj.isHtml).toBeFalsy();
  });
});
