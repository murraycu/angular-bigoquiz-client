import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { QuizService } from './rest-api-clients/quiz.service';

import { Quiz } from './data-structure/quiz';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {
  quizzes: Quiz[];

  constructor(private quizService: QuizService) { }

  getQuizzes(): void {
    this.quizService.getQuizzes().then(quizzes => this.quizzes = quizzes);
  }

  ngOnInit(): void {
    this.getQuizzes();
  }
}
