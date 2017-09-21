import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { BaseComponent } from './base.component';
import { QuizService } from './rest-api-clients/quiz.service';
import { Quiz } from './data-structure/quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent extends BaseComponent implements OnInit {
  quiz: Quiz;

  constructor(private quizService: QuizService,
    private route: ActivatedRoute) {
    super()
  }

  ngOnInit(): void {
    this.setServerLoading();
    this.route.queryParamMap
      .switchMap((params: ParamMap) => this.quizService.getQuiz(params.get('quiz-id')))
      .subscribe(
        (quiz) => {
          this.setServerSuccess();
          this.quiz = quiz;
        },
        (err) => {
          this.setServerFailed();
        })
   }
}
