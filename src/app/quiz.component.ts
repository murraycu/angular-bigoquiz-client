
import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {switchMap} from 'rxjs/operators';

import { BaseComponent } from './base.component';
import { Quiz } from './data-structure/quiz';
import { QuizService } from './rest-api-clients/quiz.service';

@Component({
    selector: "app-quiz",
    styleUrls: ["./quiz.component.css"],
    templateUrl: "./quiz.component.html",
    standalone: false
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
      .subscribe(
        (quiz) => {
          this.setServerSuccess();
          this.quiz = quiz;
          this.setTitle('Quiz: ' + this.quiz.title);
        },
        (err) => {
          this.setServerFailed();
          this.setTitle('Quiz');
        });
   }
}
