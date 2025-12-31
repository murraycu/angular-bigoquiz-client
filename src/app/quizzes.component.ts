import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { QuizService } from './rest-api-clients/quiz.service';

import { BaseComponent } from './base.component';
import { Quiz } from './data-structure/quiz';
import { ServerStatusComponent } from './server-status.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: "app-quizzes",
    styleUrls: ["./quizzes.component.css"],
    templateUrl: "./quizzes.component.html",
    imports: [ServerStatusComponent, RouterLink]
})
export class QuizzesComponent extends BaseComponent implements OnInit {
  private quizService = inject(QuizService);

  public quizzes: Quiz[];

  constructor() {
    const titleService = inject(Title);

    super(titleService);
    this.quizzes = [];
    this.setTitle('Quizzes');
  }

  public getQuizzes(): void {
    this.setServerLoading();
    this.quizService.getQuizzes().then(
      (quizzes) => {
        this.setServerSuccess();
        this.quizzes = quizzes;
      },
      (err) => {
        console.log('Error getting quizzes: ' + err);
        this.setServerFailed();
      });
  }

  public ngOnInit(): void {
    this.getQuizzes();
  }
}
