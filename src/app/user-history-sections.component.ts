
import { Component, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import {switchMap} from 'rxjs/operators';

import { BaseComponent } from './base.component';
import { UserHistorySections } from './data-structure/user-history-sections';
import { UserQuestionHistory } from './data-structure/user-question-history';
import { UserStats } from './data-structure/user-stats';
import { UserHistoryService } from './rest-api-clients/user-history.service';

import { QuestionResultEvent } from './question-result-event';
import { QuestionResultsService } from './question-results.service';

@Component({
    selector: "app-user-history-sections",
    styleUrls: ["./user-history-sections.component.css"],
    templateUrl: "./user-history-sections.component.html",
    standalone: false
})
export class UserHistorySectionsComponent extends BaseComponent implements OnInit, OnDestroy {
  private userHistoryService = inject(UserHistoryService);
  private questionResultsService = inject(QuestionResultsService);
  private route = inject(ActivatedRoute);

  @Output() public onJsonParsed = new EventEmitter<void>();
  public userHistorySections: UserHistorySections = new UserHistorySections();

  public readonly maxproblemquestions: number = 5;

  public quizId = "";
  private sectionId = "";
  private subscriptionQuestionResultsService: Subscription;

  constructor() {
    const titleService = inject(Title);

    super(titleService);
  }

  public ngOnInit(): void {
    this.route.queryParamMap.pipe(
    switchMap((params: ParamMap) => {
      const paramQuizId: string = params.get('quiz-id') ?? "";

      if (this.quizId === paramQuizId && this.userHistorySections && !this.userHistorySections.isEmpty()) {
        // Use the existing data:
        this.setServerSuccess();
        return new Promise<UserHistorySections>((resolve) => resolve(this.userHistorySections));
      }

      this.quizId = paramQuizId;
      this.sectionId = params.get('section-id') ?? "";

      this.setServerLoading();
      return this.userHistoryService.getUserHistorySectionsForQuiz(this.quizId);
    }))
    .subscribe(
      (userHistorySections) => {
        this.setServerSuccess();
        this.userHistorySections = userHistorySections;
        this.onJsonParsed.emit();
      },
      (err) => {
        this.setServerFailed();
      },
    );

    this.subscriptionQuestionResultsService =
      this.questionResultsService.notifyObservable$.subscribe((result) => {
        this.onUserAnsweredQuestion(result);
      });
  }

  public ngOnDestroy(): void {
    this.subscriptionQuestionResultsService.unsubscribe();
  }

  // This is not static because it is difficult to call static method from the .html template.
  // Note: The code in the .html will happily call this function with the wrong type,
  // presumably because it's really running Javascript, not Typescript,
  // and there is no Typescript compiler checking of the code in the .html.
  /** Get a suitable title to show in the list of problem questions.
   */
  public questionTitleForHistory(question: UserQuestionHistory): string {
    if (!question || !question.questionTitle || !question.questionTitle.text) {
      return '';
    }

    if (question.subSectionTitle) {
      return question.subSectionTitle + ': ' + question.questionTitle.text;
    } else {
      return question.questionTitle.text;
    }
  }

  public questionTitleForHistoryIsHtml(question: UserQuestionHistory): boolean {
    if (!question || !question.questionTitle || !question.questionTitle.text) {
      return false;
    }

    return question.questionTitle.isHtml;
  }

    // This is not static because it is difficult to call static method from the .html template.
  /** This checks that each problem question is really still a problem,
   * because it might have been updated locally.
   */
  public problemQuestionsCount(stats: UserStats): number {
    if (!stats) {
      return 0;
    }

    if (!stats.topProblemQuestionHistories) {
      return 0;
    }

    let count = 0;
    for (const problemQuestion of stats.topProblemQuestionHistories) {
      if (!problemQuestion || problemQuestion.countAnsweredWrong <= 0) {
        continue;
      }

      count += 1;
    }

    return count;
  }

  public generateQuestionLinkQueryParams(qh: UserQuestionHistory): Record<string, unknown> {
    const result = {'quiz-id': this.quizId, 'question-id': qh.questionId};
    if (this.sectionId && this.sectionId === qh.sectionId) {
      result['section-id'] = this.sectionId;
    }

    return result;
  }

  public onUserAnsweredQuestion(data: QuestionResultEvent): void {
    if ( !this.userHistorySections) {
      return;
    }

    if (!data.question.sectionId) {
      return;
    }

    const stats: UserStats = this.userHistorySections.getUserStatsForSection(data.question.sectionId);
    if (!stats) {
      return;
    }

    stats.answered++;

    if (data.result) {
      stats.correct++;
    }

    stats.updateProblemQuestion(data.question, data.result);

    // Properly update the UserHistorySections,
    // so it will be re-rendered.
    this.userHistorySections.setUserStatsForSection(data.question.sectionId, stats);
  }
}
