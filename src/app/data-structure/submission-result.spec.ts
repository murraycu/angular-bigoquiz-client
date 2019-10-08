import { SubmissionResult } from "./submission-result";

describe("SubmissionResult without the TestBed", () => {
  it ("deserializes properly from JSON", () => {
    // TODO: Does Response.json() uses JSON.parse() too?
    const jsonObj: string = JSON.parse(`
{
  "result": false,
  "correctAnswer": {
    "text": "O(n log(n)) worst case time. Stable. Data Locality. Parallelizable. Can be External.",
    "isHtml": false
  },
  "nextQuestion": {
    "id": "algorithms-sort-time-mergesort",
    "sectionId": "algorithms-sort",
    "subSectionId": "algorithms-sort-time",
    "text": {
      "text": "Mergesort",
      "isHtml": false
    },
    "link": "https://en.wikipedia.org/wiki/Merge_sort",
    "choices": [
      {
        "text": "O(n + k)",
        "isHtml": false
      },
      {
        "text": "O(n log(n))",
        "isHtml": false
      },
      {
        "text": "O(n log(n)^2)",
        "isHtml": false
      },
      {
        "text": "O(nk)",
        "isHtml": false
      },
      {
        "text": "O(n ^ 2)",
        "isHtml": false
      }
    ],
    "note": "The worst time is also O(n log(n)).",
    "quizTitle": "Algorithms",
    "section": {
      "id": "algorithms-sort",
      "title": "Sorting Algorithms"
    },
    "subSection": {
      "id": "algorithms-sort-time",
      "title": "Average Time"
    },
    "quizUsesMathML": false
  }
}`);

    const obj: SubmissionResult = SubmissionResult.fromJson(jsonObj);
    expect(obj).toBeTruthy();
    expect(obj.result).toEqual(false);

    expect(obj.correctAnswer).toBeTruthy();
    expect(obj.correctAnswer.text).toEqual("O(n log(n)) worst case time. Stable. Data Locality. Parallelizable. Can be External.");
    expect(obj.correctAnswer.isHtml).toEqual(false);

    expect(obj.nextQuestion).toBeTruthy();
    expect(obj.nextQuestion.id).toBeTruthy();
    expect(obj.nextQuestion.id).toEqual("algorithms-sort-time-mergesort");
  });
});
