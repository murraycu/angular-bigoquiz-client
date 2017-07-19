import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { QuizService } from './quiz.service';
import { UserHistoryService } from './user-history.service';
import { QuizQuestion } from './data-structure/quiz-question';
import { SubmissionResult } from './data-structure/submission-result';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
})
export class QuestionComponent implements OnInit {
  private quizId: string;
  private questionId: string;
  private question: QuizQuestion;
  private submissionResult: SubmissionResult;

  constructor(private quizService: QuizService,
    private userHistoryService : UserHistoryService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap
    .switchMap((params: ParamMap) => {
      this.quizId = params.get('quiz-id');
      this.questionId = params.get('question-d');
      return this.quizService.getQuizQuestion(this.quizId, this.questionId)
    })
    .subscribe(question => this.question = question);
  }

  onChoiceClicked(answerText: string): void {
    this.userHistoryService.submitAnswer(this.quizId, this.questionId, answerText).
      then(submissionResult => this.submissionResult = submissionResult);
  }
}
