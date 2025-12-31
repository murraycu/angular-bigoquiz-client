
import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import {switchMap} from 'rxjs/operators';

import { BaseComponent } from './base.component';
import { Quiz } from './data-structure/quiz';
import { QuizService } from './rest-api-clients/quiz.service';
import { ServerStatusComponent } from './server-status.component';
import { QuizQuestionAndAnswerComponent } from './quiz-question-and-answer.component';
import { UserHistorySectionsComponent } from './user-history-sections.component';

@Component({
    selector: "app-quiz",
    styleUrls: ["./quiz.component.css"],
    templateUrl: "./quiz.component.html",
    imports: [ServerStatusComponent, RouterLink, QuizQuestionAndAnswerComponent, UserHistorySectionsComponent]
})
export class QuizComponent extends BaseComponent implements OnInit {
  private quizService = inject(QuizService);
  private route = inject(ActivatedRoute);

  public quiz: Quiz = new Quiz();

  constructor() {
    const titleService = inject(Title);

    super(titleService);
  }

  public ngOnInit(): void {
    this.setServerLoading();
    this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => this.quizService.getQuiz(params.get('quiz-id') ?? "")))
      .subscribe({

        next: (quiz) => {
          this.setServerSuccess();
          this.quiz = quiz;
          this.setTitle('Quiz: ' + this.quiz.title);
        },
        error: (err) => {
          console.log('Error getting quiz: ' + err);
          this.setServerFailed();
          this.setTitle('Quiz');
        }
      });
   }
}
