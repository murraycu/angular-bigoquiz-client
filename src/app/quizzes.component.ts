import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { QuizService } from "./rest-api-clients/quiz.service";

import { BaseComponent } from "./base.component";
import { Quiz } from "./data-structure/quiz";

@Component({
  selector: "app-quizzes",
  templateUrl: "./quizzes.component.html",
  styleUrls: ["./quizzes.component.css"],
})
export class QuizzesComponent extends BaseComponent implements OnInit {
  public quizzes: Quiz[];

  constructor(private quizService: QuizService, titleService: Title) {
    super(titleService);
    this.setTitle("Quizzes");
  }

  public getQuizzes(): void {
    this.setServerLoading();
    this.quizService.getQuizzes().then(
      (quizzes) => {
        this.setServerSuccess();
        this.quizzes = quizzes;
      },
      (err) => {
        this.setServerFailed();
      });
  }

  public ngOnInit(): void {
    this.getQuizzes();
  }
}
