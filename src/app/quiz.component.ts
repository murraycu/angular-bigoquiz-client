
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, ParamMap } from "@angular/router";
import {switchMap} from "rxjs/operators";

import { BaseComponent } from "./base.component";
import { Quiz } from "./data-structure/quiz";
import { QuizService } from "./rest-api-clients/quiz.service";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.css"],
})
export class QuizComponent extends BaseComponent implements OnInit {
  public quiz: Quiz;

  constructor(private quizService: QuizService,
              private route: ActivatedRoute,
              titleService: Title) {
    super(titleService);
  }

  public ngOnInit(): void {
    this.setServerLoading();
    this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => this.quizService.getQuiz(params.get("quiz-id"))))
      .subscribe(
        (quiz) => {
          this.setServerSuccess();
          this.quiz = quiz;
          this.setTitle("Quiz: " + this.quiz.title);
        },
        (err) => {
          this.setServerFailed();
          this.setTitle("Quiz");
        });
   }
}
