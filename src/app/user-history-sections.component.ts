import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { UserHistoryService } from './rest-api-clients/user-history.service';
import { UserHistorySections} from './data-structure/user-history-sections';
import { UserQuestionHistory} from './data-structure/user-question-history';
import { UserStats} from './data-structure/user-stats';

import { QuestionResultsService } from './question-results.service';
import { QuestionResultEvent } from './question-result-event';

@Component({
  selector: 'user-history-sections',
  templateUrl: './user-history-sections.component.html',
  styleUrls: ['./user-history-sections.component.css']
})
export class UserHistorySectionsComponent implements OnInit, OnDestroy {
  private quizId: string;
  userHistorySections: UserHistorySections;
  private subscriptionQuestionResultsService: Subscription;

  constructor(private userHistoryService: UserHistoryService,
    private questionResultsService: QuestionResultsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap
    .switchMap((params: ParamMap) => {
      this.quizId = params.get('quiz-id');
      return this.userHistoryService.getUserHistorySectionsForQuiz(this.quizId);
    })
    .subscribe(userHistorySections => this.userHistorySections = userHistorySections);


    this.subscriptionQuestionResultsService =
      this.questionResultsService.notifyObservable$.subscribe(result => {
        this.onUserAnsweredQuestion(result);
      });
  }

  ngOnDestroy(): void {
    this.subscriptionQuestionResultsService.unsubscribe();
  }

  // Note: The code in the .html will happily call this function with the wrong type,
  // presumably because it's really running Javascript, not Typescript,
  // and there is no Typescript compiler checking of the code in the .html.
  /** Get a suitable title to show in the list of problem questions.
   */
  static questionTitle(question: UserQuestionHistory): string {
    if (!question || !question.questionTitle || !question.questionTitle.text) {
      return '';
    }

    if (question.subSectionTitle) {
      return `{{question.subSectionTitle}}: {{question.questionTitle.text}}`;
    } else {
      return question.questionTitle.text;
    }
  }

  /** This checks that each problem question is really still a problem,
   * because it might have been updated locally.
   */
  static problemQuestionsCount(stats: UserStats): number {
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

      // This shouldn't be necessary, because the server should not return too many,
      // but let's be sure:
      if (count >= UserStats.MAX_PROBLEM_QUESTIONS) {
        break;
      }

      count += 1;
    }

    return count;
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
