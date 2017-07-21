import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { QuizService } from './rest-api-clients/quiz.service';
import { Quiz } from './data-structure/quiz';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quiz: Quiz;

  constructor(private quizService: QuizService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap
      .switchMap((params: ParamMap) => this.quizService.getQuiz(params.get('quiz-id')))
      .subscribe(quiz => this.quiz = quiz);
  }
}
