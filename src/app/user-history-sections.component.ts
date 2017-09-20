import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { UserHistoryService } from './rest-api-clients/user-history.service';
import { UserHistorySections } from './data-structure/user-history-sections';
import { UserQuestionHistory } from './data-structure/user-question-history';
import { UserStats } from './data-structure/user-stats';

import { QuestionResultsService } from './question-results.service';
import { QuestionResultEvent } from './question-result-event';

@Component({
  selector: 'app-user-history-sections',
  templateUrl: './user-history-sections.component.html',
  styleUrls: ['./user-history-sections.component.css']
})
export class UserHistorySectionsComponent implements OnInit, OnDestroy {
  @Output() onJsonParsed = new EventEmitter<void>()

  private quizId: string;
  private sectionId: string;
  userHistorySections: UserHistorySections;
  private subscriptionQuestionResultsService: Subscription;

  readonly MAX_PROBLEM_QUESTIONS: number = 5

  constructor(private userHistoryService: UserHistoryService,
    private questionResultsService: QuestionResultsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap
    .switchMap((params: ParamMap) => {
      this.quizId = params.get('quiz-id');
      this.sectionId = params.get('section-id');
      return this.userHistoryService.getUserHistorySectionsForQuiz(this.quizId);
    })
    .subscribe(userHistorySections => {
      this.userHistorySections = userHistorySections
      this.onJsonParsed.emit();
    });


    this.subscriptionQuestionResultsService =
      this.questionResultsService.notifyObservable$.subscribe(result => {
        this.onUserAnsweredQuestion(result);
      });
  }

  ngOnDestroy(): void {
    this.subscriptionQuestionResultsService.unsubscribe();
  }

  // This is not static because it is difficult to call static method from the .html template.
  // Note: The code in the .html will happily call this function with the wrong type,
  // presumably because it's really running Javascript, not Typescript,
  // and there is no Typescript compiler checking of the code in the .html.
  /** Get a suitable title to show in the list of problem questions.
   */
  questionTitle(question: UserQuestionHistory): string {
    if (!question || !question.questionTitle || !question.questionTitle.text) {
      return '';
    }

    if (question.subSectionTitle) {
      return question.subSectionTitle + ": " + question.questionTitle.text;
    } else {
      return question.questionTitle.text;
    }
  }

  // This is not static because it is difficult to call static method from the .html template.
  /** This checks that each problem question is really still a problem,
   * because it might have been updated locally.
   */
  problemQuestionsCount(stats: UserStats): number {
    if (!stats) {
      return 0;
    }

    if (!stats.topProblemQuestionHistories) {
      return 0;
    }

    let count: number = 0;
    for (const problemQuestion of stats.topProblemQuestionHistories) {
      if (!problemQuestion || problemQuestion.countAnsweredWrong <= 0) {
        continue;
      }

      count += 1;
    }

    return count;
  }

  generateQuestionLinkQueryParams(qh: UserQuestionHistory): Object {
    let result = {'quiz-id': this.quizId, 'question-id': qh.questionId};
    if (this.sectionId) {
      result['section-id'] = this.sectionId;
    }

    return result;
  }

  onUserAnsweredQuestion(data: QuestionResultEvent): void {
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
  }
}
