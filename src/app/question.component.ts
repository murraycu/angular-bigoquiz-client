import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";

import { BaseComponent } from "./base.component";
import { HasIdAndTitle } from "./data-structure/has-id-and-title";
import { QuizQuestion } from "./data-structure/quiz-question";
import { QuizSection } from "./data-structure/quiz-section";
import { QuizText } from "./data-structure/quiz-text";
import { SubmissionResult } from "./data-structure/submission-result";
import { QuestionService } from "./rest-api-clients/question.service";
import { QuizService } from "./rest-api-clients/quiz.service";
import { UserHistoryService } from "./rest-api-clients/user-history.service";

import { QuestionResultEvent } from "./question-result-event";
import { QuestionResultsService } from "./question-results.service";

@Component({
    selector: "app-question",
    styleUrls: ["./question.component.css"],
    templateUrl: "./question.component.html",
    standalone: false
})
export class QuestionComponent extends BaseComponent implements OnInit {

  private static titleForHasIdAndTitle(obj: HasIdAndTitle): string {
    if (!obj) {
      return "";
    }

    return obj.title;
  }

  /** Gets the title, if it is not HTML.
   * Otherwise, this returns an empty string.
   */
  private static titleWithoutHtmlForText(text: QuizText): string {
    if (!text) {
      return "";
    }

    if (text.isHtml) {
      return "";
    }

    return text.text;
  }

  /** Get a suitable title,
   * avoiding use of unparsed HTML * and avoiding duplication where the quiz,
   * section, and subsection titles are duplicates of each other.
   */
  private static questionTitle(question: QuizQuestion): string {
    if (!question) {
      return "";
    }

    // Avoiding using HTML directly.
    let text: string = QuestionComponent.titleWithoutHtmlForText(question.text);
    const sectionText: string = QuestionComponent.titleForHasIdAndTitle(question.section);
    const subSectionText: string = QuestionComponent.titleForHasIdAndTitle(question.subSection);

    if (subSectionText && sectionText !== subSectionText) {
      text = subSectionText + ": " + text;
    }

    if (sectionText && sectionText !== question.quizTitle) {
      text = sectionText + ": " + text;
    }

    if (question.quizTitle) {
      text = question.quizTitle + ": " + text;
    }

    return text;
  }

  public quizId: string;

  public question: QuizQuestion;
  public submissionResult: SubmissionResult;
  public showAnswer: boolean;
  public chosenAnswer: string;
  public enableChoices = true;

  public sections: QuizSection[];

  // The section to show questions from.
  // Not just the section ID of the question.
  public sectionId: string;
  private questionId: string;

  constructor(private quizService: QuizService,
              private questionService: QuestionService,
              private userHistoryService: UserHistoryService,
              private questionResultsService: QuestionResultsService,
              private router: Router,
              private route: ActivatedRoute,
              titleService: Title) {
    super(titleService);
  }

  public ngOnInit(): void {
    this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        this.quizId = params.get("quiz-id");
        this.questionId = params.get("question-id");
        this.sectionId = params.get("section-id");

        if (this.submissionResult && this.submissionResult.nextQuestion &&
          this.submissionResult.nextQuestion.id === this.questionId) {
          // We already have the next question:
          const question = this.submissionResult.nextQuestion;
          this.submissionResult = undefined;
          return new Promise<QuizQuestion>((resolve) => resolve(question));
        } else {
          // Get question from the server.

          this.setServerLoading();

          // If the sectionId was specifed, we need to show the list of other sections.
          if (this.quizId && this.sectionId) {
            this.getSections();
          }

          if (this.questionId) {
            // Show the question specified by the URL:
            return this.quizService.getQuizQuestion(this.quizId, this.questionId);
          } else if (this.quizId) {
            // Show a random(ish) question chosen by the server:
            return this.questionService.getNextQuestion(this.quizId, this.sectionId);
            // TODO: Update the URL.
          } else {
            // TODO: Show an error message?
            return undefined;
          }
        }
      }))
      .subscribe(
        (question) => {
          this.setServerSuccess();

          if (this.questionId) {
            this.question = question;

            this.setTitle("Question: " + QuestionComponent.questionTitle(this.question));
          } else {
            // The question comes from getNextQuestion(),
            // so just navigate to the appropriate URL.
            this.router.navigate(["/question"], {
              queryParams: {
                "question-id": question.id,
                "quiz-id": this.quizId,
                "section-id": this.sectionId,
              },
            });
          }
        },
        (err) => {
          this.setServerFailed();
          this.question = undefined;
        });
  }

  public getSections(): void {
    this.quizService.getQuizSections(this.quizId).then((sections) => this.sections = sections);
  }

  public queryParamsForNextQuestion(question: QuizQuestion): object {
    if (this.sectionId) {
      return {
        "question-id": question.id,
        "quiz-id": this.quizId,
        "section-id": this.sectionId,
      };
    } else {
      return {"quiz-id": this.quizId, "question-id": question.id};
    }
  }

  public choiceIsCorrect(answerText: string): boolean {
    if (!this.submissionResult || !this.submissionResult.correctAnswer
      || !this.submissionResult.correctAnswer.text) {
      return false;
    }

    return answerText === this.submissionResult.correctAnswer.text;
  }

  public choiceIsWrongAnswer(answerText: string): boolean {
    if (!this.submissionResult || this.submissionResult.result) {
      return false;
    }

    return answerText === this.chosenAnswer;
  }

  /** Update the sections sidebar,
   * to change the progress bars and, if necessary,
   * change the list of problem questions.
   */
  public updateSectionsSidebar(result: boolean): void {
    const data: QuestionResultEvent = {question: this.question, result};
    this.questionResultsService.notify(data);
  }

  public onChoiceClicked(answerText: string): void {
    // Ignore clicks on the choices if we are already showing the correct answer,
    // We already prevent this with the <input>'s disabled attribute,
    // but that still lets the user click on the input's associated label.
    if (!this.enableChoices) {
      return;
    }

    this.submissionResult = undefined;
    this.chosenAnswer = answerText;

    this.userHistoryService.submitAnswer(this.quizId, this.questionId, answerText, this.sectionId).
      then((submissionResult) => {
        this.submissionResult = submissionResult;

        // Disable further choices if the user already chose the correct one:
        this.enableChoices = !submissionResult.result;

        this.updateSectionsSidebar(this.submissionResult.result);

        // Go to the next question automatically after 5 seconds.
        if (submissionResult.result) {
          setTimeout(() => {
              this.onNext();
            },
            5000);
        }
      });
  }

  public onSectionIdSelected(sectionId: string): void {
    if (this.sectionId === sectionId) {
      // There was no change, so do nothing.
      return;
    }

    // TODO:
    // Stop the next question from being shown automatically
    // because then the question would change yet again:

    // TODO:
    // Don't get a new question if we are already waiting for an answer
    // and the current question is already from a correct section.

    // Show a question from the specified section:
    if (sectionId === "all") {
      this.router.navigate(["/question"], {queryParams: {"quiz-id": this.quizId}});
    } else {
      this.router.navigate(["/question"], {
        queryParams: {
          "quiz-id": this.quizId,
          "section-id": sectionId,
        },
      });
    }
  }

  public onShowAnswer(): void {
    // Update this ngModel used in the HTML.
    // TODO: Is there some more direct way to do this?
    this.showAnswer = true;
    this.enableChoices = false;

    this.updateSectionsSidebar(false);

    // This is much like submitting a wrong answer.
    // It records it as a wrong answer on the server, and gives us the correct answer.
    this.userHistoryService.submitDontKnowAnswer(this.quizId, this.questionId, this.sectionId).
      then((submissionResult) => this.submissionResult = submissionResult);
  }

  public onNext(): void {
    // The previous submission has already given us the next question,
    // so we navigate to that question.
    // ngOnInit() will then use submissionResult.nextQuestion instead of
    // retrieving the question from the server.

    if (!this.submissionResult) {
      return;
    }

    const nextQuestion = this.submissionResult.nextQuestion;
    if (!nextQuestion) {
      return;
    }

    // Wipe these:
    this.chosenAnswer = undefined;
    this.showAnswer = false;
    this.enableChoices = true;

    const params = this.queryParamsForNextQuestion(nextQuestion);
    this.router.navigate(["/question"], {queryParams: params});
  }
}
