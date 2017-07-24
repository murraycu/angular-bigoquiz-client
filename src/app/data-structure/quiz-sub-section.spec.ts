import { QuizSubSection } from './quiz-sub-section';
import { JsonUtils } from '../json-utils';

describe('QuizSubSection without the TestBed', () => {
  beforeEach(() => {
  });

  it ('deserializes properly from JSON', () => {
    // TODO: Does Response.json() uses JSON.parse() too?
    const jsonObj: string = JSON.parse('{"id":"dijkstra-with-fibonacci-heap","title":"Dijkstra\'s Algorithm for Shortest Path (Fibonacci heap as priority queue)","link":"https://en.wikipedia.org/wiki/Dijkstra\'s_algorithm"}');

    const obj = JsonUtils.jsonObjectToQuizSubSection(jsonObj);
    expect(obj).toBeTruthy(obj);
    expect(obj.id).toBeTruthy(obj);
    expect(obj.id).toEqual('dijkstra-with-fibonacci-heap');
    expect(obj.title).toBeTruthy(obj);
    expect(obj.title).toEqual('Dijkstra\'s Algorithm for Shortest Path (Fibonacci heap as priority queue)');
    expect(obj.link).toBeTruthy(obj);
    expect(obj.link).toEqual('https://en.wikipedia.org/wiki/Dijkstra\'s_algorithm');
  });
});
