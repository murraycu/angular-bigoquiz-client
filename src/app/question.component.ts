import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { QuizService } from './rest-api-clients/quiz.service';
import { QuestionService } from './rest-api-clients/question.service';
import { UserHistoryService } from './rest-api-clients/user-history.service';
import { QuizQuestion } from './data-structure/quiz-question';
import { QuizSection } from './data-structure/quiz-section';
import { SubmissionResult } from './data-structure/submission-result';

import { QuestionResultsService } from './question-results.service';
import { QuestionResultEvent } from './question-result-event';

enum ServerState {
  Loading,
  Failed, // Note: Using Error here instead causes some compiler confusion with ErrorConstructor.
  Success
};

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  // Make the enum available to the html template.
  ServerStateEnum = ServerState;
  serverState: ServerState = ServerState.Loading;

  quizId: string;
  private questionId: string;

  // The section to show questions from.
  // Not just the section ID of the question.
  private sectionId: string;

  question: QuizQuestion;
  submissionResult: SubmissionResult;
  showAnswer: boolean;
  chosenAnswer: string;

  sections: QuizSection[];

  constructor(private quizService: QuizService,
    private questionService: QuestionService,
    private userHistoryService: UserHistoryService,
    private questionResultsService: QuestionResultsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap
    .switchMap((params: ParamMap) => {
      this.quizId = params.get('quiz-id');
      this.questionId = params.get('question-id');
      this.sectionId = params.get('section-id');

      this.serverState = ServerState.Loading;

      // If the sectionId was specifed, we need to show the list of other sections.
      if (this.quizId && this.sectionId) {
        this.getSections()
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
    })
    .subscribe(
      (question) => {
        this.serverState = ServerState.Success;

        if (this.questionId) {
          this.question = question;
        } else {
          // The question comes from getNextQuestion(),
          // so just navigate to the appropriate URL.
          this.router.navigate(['/question'], {queryParams: {'quiz-id': this.quizId, 'question-id': question.id, 'section-id': this.sectionId}});
        }
      },
      (err) => {
        this.serverState = ServerState.Failed;
        this.question = undefined;
      });
  }

  getSections(): void {
    this.quizService.getQuizSections(this.quizId).then(sections => this.sections = sections);
  }

  queryParamsForNextQuestion(): Object {
    if (this.sectionId) {
      return {'quiz-id': this.quizId, 'section-id': this.sectionId};
    } else {
      return {'quiz-id': this.quizId};
    }
  }

  choiceIsCorrect(answerText: string): boolean {
    if (!this.submissionResult || !this.submissionResult.correctAnswer
      || !this.submissionResult.correctAnswer.text) {
      return false;
    }

    return answerText === this.submissionResult.correctAnswer.text;
  }

  choiceIsWrongAnswer(answerText: string): boolean {
    if (!this.submissionResult || this.submissionResult.result) {
      return false;
    }

    return answerText === this.chosenAnswer;
  }

  /** Update the sections sidebar,
   * to change the progress bars and, if necessary,
   * change the list of problem questions.
   */
  updateSectionsSidebar(result: boolean): void {
    const data: QuestionResultEvent = {question: this.question, result: result};
    this.questionResultsService.notify(data);
  }

  onChoiceClicked(answerText: string): void {
    this.submissionResult = undefined
    this.chosenAnswer = answerText

    this.userHistoryService.submitAnswer(this.quizId, this.questionId, answerText, this.sectionId).
      then(submissionResult => {
        this.submissionResult = submissionResult;
        this.updateSectionsSidebar(this.submissionResult.result);
      });
  }

  onSectionIdSelected(sectionId: string): void {
    if (this.sectionId == sectionId) {
      // There was no change, so do nothing.
      return;
    }

    // TODO:
    //Stop the next question from being shown automatically
    //because then the question would change yet again:

    // TODO:
    // Don't get a new question if we are already waiting for an answer
    // and the current question is already from a correct section.

    // Show a question from the specified section:
    if (sectionId == 'all') {
      this.router.navigate(['/question'], {queryParams: {'quiz-id': this.quizId}});
    } else {
      this.router.navigate(['/question'], {queryParams: {'quiz-id': this.quizId, 'section-id': sectionId}});
    }
  }

  onShowAnswer(): void {
    // Update this ngModel used in the HTML.
    // TODO: Is there some more direct way to do this?
    this.showAnswer = true;

    this.updateSectionsSidebar(false);

    // This is much like submitting a wrong answer.
    // It records it as a wrong answer on the server, and gives us the correct answer.
    this.userHistoryService.submitDontKnowAnswer(this.quizId, this.questionId, this.sectionId).
      then(submissionResult => this.submissionResult = submissionResult);
  }

  onNext(): void {
    // The previous submission has already given us the next question,
    // so we just change the member variable and the HTML will update itself
    // to use the new value of the variable.

    if (!this.submissionResult) {
      return
    }

    this.question = this.submissionResult.nextQuestion
    if (this.question) {
      this.questionId = this.question.id
      this.sectionId = this.question.sectionId
    }

    this.submissionResult = undefined
    this.chosenAnswer = undefined
    this.showAnswer = false
  }
}
