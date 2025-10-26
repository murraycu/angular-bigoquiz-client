import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { BaseComponent } from "./base.component";
import { UserHistoryQuizzes} from "./data-structure/user-history-quizzes";
import { UserHistoryService } from "./rest-api-clients/user-history.service";

@Component({
    selector: "app-user",
    styleUrls: ["./user.component.css", "./user-history-sections.component.css"],
    templateUrl: "./user.component.html",
    standalone: false
})
export class UserComponent extends BaseComponent implements OnInit {
  public userHistoryQuizzes: UserHistoryQuizzes;

  constructor(private userHistoryService: UserHistoryService,
              titleService: Title) {
   super(titleService);
  }

  public ngOnInit(): void {
    this.setTitle("Profile");
    this.setServerLoading();
    this.userHistoryService.getUserHistoryForQuizzes().then(
      (userHistoryQuizzes) => {
        this.setServerSuccess();
        this.userHistoryQuizzes = userHistoryQuizzes;
      },
      (err) => {
        this.setServerFailed();
      });
  }
}
