import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { UserHistoryService } from './rest-api-clients/user-history.service';
import { UserHistorySections} from './data-structure/user-history-sections';
import { QuizQuestion} from './data-structure/quiz-question';
import { UserQuestionHistory} from './data-structure/user-question-history';
import { UserStats} from './data-structure/user-stats';

import { QuestionResultsService } from './question-results.service';
import { QuestionResultEvent } from './question-result-event'

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
    private questionResultsService : QuestionResultsService,
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
  questionTitle(question: UserQuestionHistory): string {
    if (!question || !question.questionTitle || !question.questionTitle.text) {
      return "";
    }

    if (question.subSectionTitle) {
      return `{{question.subSectionTitle}}: {{question.questionTitle.text}}`;
    } else {
      return question.questionTitle.text;
    }
  }

  onUserAnsweredQuestion(data: QuestionResultEvent): void {
    if( !this.userHistorySections) {
      return;
    }

    let stats: UserStats = this.userHistorySections.getUserStatsForSection(data.sectionId);
    if (!stats) {
      return;
    }

    stats.answered++;

    if (data.result) {
      stats.correct++;
    }

    stats.updateProblemQuestion(data.questionId, data.result);
  }
}
