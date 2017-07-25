import { QuizQuestionAndAnswer } from './quiz-question-and-answer';
import { JsonUtils } from '../json-utils';

describe('QuizQuestionAndAnswer without the TestBed', () => {
  beforeEach(() => {
  });

  it ('deserializes properly from JSON', () => {
    // TODO: Does Response.json() uses JSON.parse() too?
    const jsonObj: string = JSON.parse(`
{
  "question": {
    "id": "dijkstra-with-fibonacci-time",
    "sectionId": "graph-search",
    "subSectionId": "dijkstra-with-fibonacci-heap",
    "text": {
      "text": "Time",
      "isHtml": false
    },
    "choices": [
      {
        "text": "O(V ⋅ |E|²)",
        "isHtml": false
      },
      {
        "text": "O((|V|+|E|) log(|V|))",
        "isHtml": false
      },
      {
        "text": "O(|V|²)",
        "isHtml": false
      },
      {
        "text": "O(|V|³)",
        "isHtml": false
      },
      {
        "text": "O(|V| ⋅ |E|)",
        "isHtml": false
      },
      {
        "text": "O(|E| + |V| log(|V|))",
        "isHtml": false
      }
    ],
    "quizUsesMathML": false
  },
  "answer": {
    "text": "O(|E| + |V| log(|V|))",
    "isHtml": false
  }
}`);

    const obj: QuizQuestionAndAnswer = JsonUtils.jsonObjectToQuizQuestionAndAnswer(jsonObj);
    expect(obj).toBeTruthy(obj);

    expect(obj.question).toBeTruthy(obj);
    expect(obj.question.id).toEqual('dijkstra-with-fibonacci-time');

    expect(obj.answer).toBeTruthy();
    expect(obj.answer.text).toBeTruthy();
    expect(obj.answer.text).toEqual('O(|E| + |V| log(|V|))');
  });

  it ('deserializes properly from undefined object.', () => {
    const obj = JsonUtils.jsonObjectToQuizQuestionAndAnswer(undefined);
    expect(obj).toBeUndefined(obj);
  });
});
