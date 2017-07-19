import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { QuizService } from './quiz.service';
import { QuestionService } from './question.service';
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
  private sectionId: string;
  private question: QuizQuestion;
  private submissionResult: SubmissionResult;

  constructor(private quizService: QuizService,
    private questionService : QuestionService,
    private userHistoryService : UserHistoryService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap
    .switchMap((params: ParamMap) => {
      this.quizId = params.get('quiz-id');
      this.questionId = params.get('question-id');
      this.sectionId = params.get('section-id');

      if (this.questionId) {
        // Show the question specified by the URL:
        return this.quizService.getQuizQuestion(this.quizId, this.questionId)
      } else if (this.quizId) {
        // Show a random(ish) question chosen by the server:
        return this.questionService.getNextQuestion(this.quizId, this.sectionId)
        // TODO: Update the URL.
      } else {
        // TODO: Show an error message?
        return undefined;
      }
    })
    .subscribe(question => {
      if (this.questionId) {
        this.question = question
      } else {
        // The question comes from getNextQuestion(),
        // so just navigate to the appropriate URL.
        this.router.navigate(['/question'], {queryParams: {"quiz-id": this.quizId, "question-id": question.id, "section-id": this.sectionId}});
      }
    });
  }

  onChoiceClicked(answerText: string): void {
    this.userHistoryService.submitAnswer(this.quizId, this.questionId, answerText).
      then(submissionResult => this.submissionResult = submissionResult);
  }
}
