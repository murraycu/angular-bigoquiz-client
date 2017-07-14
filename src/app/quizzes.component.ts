import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from './quiz.service';

import { Quiz } from './quiz';

@Component({
  selector: 'quizzes',
  templateUrl: './quizzes.component.html',
})
export class QuizzesComponent implements OnInit {
  quizzes: Quiz[];

  constructor(private quizService: QuizService,
    private router : Router) { }

  getQuizzes(): void {
    this.quizService.getQuizzes().then(quizzes => this.quizzes = quizzes);
  }

  ngOnInit(): void {
    this.getQuizzes();
  }
}
