import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from './quiz.service';

import { Quiz } from './data-structure/quiz';

@Component({
  selector: 'quizzes',
  templateUrl: './quizzes.component.html',
})
export class QuizzesComponent implements OnInit {
  private quizzes: Quiz[];

  constructor(private quizService: QuizService) { }

  getQuizzes(): void {
    this.quizService.getQuizzes().then(quizzes => this.quizzes = quizzes);
  }

  ngOnInit(): void {
    this.getQuizzes();
  }
}
