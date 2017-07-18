import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { QuizService } from './quiz.service';
import { QuizQuestion } from './data-structure/quiz-question';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
})
export class QuestionComponent implements OnInit {
  question: QuizQuestion;

  constructor(private quizService: QuizService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap
    .switchMap((params: ParamMap) => {
      let quizId: string = params.get('quizId');
      let questionId: string = params.get('questionId');
      return this.quizService.getQuizQuestion(quizId, questionId)
    })
    .subscribe(question => this.question = question);
  }
}
