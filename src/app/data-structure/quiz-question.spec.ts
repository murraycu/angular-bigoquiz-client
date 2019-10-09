import { QuizQuestion } from "./quiz-question";

describe("QuizQuestion without the TestBed", () => {
  beforeEach(() => {
  });

  it ("deserializes properly from JSON", () => {
    // TODO: Does Response.json() uses JSON.parse() too?
    const jsonObj: string = JSON.parse(`
{
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
}`);

    const obj: QuizQuestion = QuizQuestion.fromJson(jsonObj);
    expect(obj).toBeTruthy(obj);

    expect(obj.id).toBeTruthy(obj);
    expect(obj.id).toEqual("dijkstra-with-fibonacci-time");

    expect(obj.sectionId).toBeTruthy(obj);
    expect(obj.sectionId).toEqual("graph-search");

    expect(obj.subSectionId).toBeTruthy(obj);
    expect(obj.subSectionId).toEqual("dijkstra-with-fibonacci-heap");

    expect(obj.text).toBeTruthy(obj);
    expect(obj.text.text).toBeTruthy(obj);
    expect(obj.text.text).toEqual("Time");
    expect(obj.text.isHtml).toEqual(false);

    expect(obj.choices).toBeTruthy(obj);
    expect(obj.choices.length).toEqual(6);

    expect(obj.choices[0]).toBeTruthy(obj);
    expect(obj.choices[0].text).toBeTruthy(obj);
    expect(obj.choices[0].text).toEqual("O(V ⋅ |E|²)");
    expect(obj.choices[0].isHtml).toEqual(false);
  });

  it ("deserializes properly from undefined object.", () => {
    const obj = QuizQuestion.fromJson(undefined);
    expect(obj).toBeUndefined(obj);
  });
});
