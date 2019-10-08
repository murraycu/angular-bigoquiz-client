import { QuizSection } from "./quiz-section";

describe("QuizSection without the TestBed", () => {
  it ("deserializes properly from JSON", () => {
    // TODO: Does Response.json() uses JSON.parse() too?
    const jsonObj: string = JSON.parse(`
{
  "id": "graph-search",
  "title": "Graph Search",
  "subSections": [
    {
      "id": "dijkstra-with-fibonacci-heap",
      "title": "Dijkstra\'s Algorithm for Shortest Path (Fibonacci heap as priority queue)",
      "link": "https://en.wikipedia.org/wiki/Dijkstra\'s_algorithm",
      "questions": [
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
        },
        {
          "question": {
            "id": "dijkstra-with-fibonacci-space",
            "sectionId": "graph-search",
            "subSectionId": "dijkstra-with-fibonacci-heap",
            "text": {
              "text": "Space (Worst)",
              "isHtml": false
            },
            "choices": [
              {
                "text": "O(|V|)",
                "isHtml": false
              },
              {
                "text": "O(|V|² ⋅ E)",
                "isHtml": false
              },
              {
                "text": "O(|V|³)",
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
                "text": "O(|E| log(|E|))",
                "isHtml": false
              }
            ],
            "quizTitle": "Big-O of Algorithms and Data Structures",
            "section": {
              "id": "graph-search",
              "title": "Graph Search"
            },
            "subSection": {
              "id": "dijkstra-with-fibonacci-heap",
              "title": "Dijkstra\'s Algorithm for Shortest Path (Fibonacci heap as priority queue)",
              "link": "https://en.wikipedia.org/wiki/Dijkstra\'s_algorithm"
            },
            "quizUsesMathML": false
          },
          "answer": {
            "text": "O(|V|)",
            "isHtml": false
          }
        }
      ]
    },
    {
      "id": "prims-mst",
      "title": "Prim\'s Minimum Spanning Tree",
      "link": "https://en.wikipedia.org/wiki/Prim\'s_algorithm",
      "questions": [
        {
          "question": {
            "id": "prims-mst-time",
            "sectionId": "graph-search",
            "subSectionId": "prims-mst",
            "text": {
              "text": "Time",
              "isHtml": false
            },
            "choices": [
              {
                "text": "O(|E| log(|V|))",
                "isHtml": false
              },
              {
                "text": "O(|V|² ⋅ E)",
                "isHtml": false
              },
              {
                "text": "O(|V|³)",
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
                "text": "O((|V|+|E|)",
                  "isHtml": false
              }
            ],
            "note": "When using a binary heap (priority queue). Or O(|E| + |V| log(|V|)) with a fibonacci heap (Fredman-Tarjan).",
            "quizUsesMathML": false
          },
          "answer": {
            "text": "O(|E| log(|V|))",
            "isHtml": false
          }
        }
      ]
    }
  ]
}
`);

    const obj: QuizSection = QuizSection.fromJson(jsonObj);
    expect(obj).toBeTruthy(obj);

    expect(obj.id).toBeTruthy(obj);
    expect(obj.id).toEqual("graph-search");

    expect(obj.title).toBeTruthy(obj);
    expect(obj.title).toEqual("Graph Search");

    expect(obj.subSections).toBeTruthy(obj);
    expect(obj.subSections.length).toEqual(2);

    expect(obj.subSections[0]).toBeTruthy(obj);
    expect(obj.subSections[0].id).toEqual("dijkstra-with-fibonacci-heap");
    expect(obj.subSections[0].title).toEqual(
      "Dijkstra's Algorithm for Shortest Path (Fibonacci heap as priority queue)");
    expect(obj.subSections[0].questions).toBeTruthy();
    expect(obj.subSections[0].questions.length).toEqual(2);

    expect(obj.subSections[1]).toBeTruthy(obj);
    expect(obj.subSections[1].id).toEqual("prims-mst");

    // None of the questions are not in a sub-section.
    expect(obj.questions).toBeUndefined();
  });

  it ("deserializes properly from undefined object.", () => {
    const obj = QuizSection.fromJson(undefined);
    expect(obj).toBeUndefined(obj);
  });
});
