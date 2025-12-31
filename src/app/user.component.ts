import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { BaseComponent } from './base.component';
import { UserHistoryQuizzes} from './data-structure/user-history-quizzes';
import { UserHistoryService } from './rest-api-clients/user-history.service';
import { ServerStatusComponent } from './server-status.component';
import { UserStatusComponent } from './user-status.component';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';

@Component({
    selector: "app-user",
    styleUrls: ["./user.component.css", "./user-history-sections.component.css"],
    templateUrl: "./user.component.html",
    imports: [ServerStatusComponent, UserStatusComponent, RouterLink, NgStyle]
})
export class UserComponent extends BaseComponent implements OnInit {
  private userHistoryService = inject(UserHistoryService);

  public userHistoryQuizzes: UserHistoryQuizzes;

  constructor() {
   const titleService = inject(Title);

   super(titleService);
  }

  public ngOnInit(): void {
    this.setTitle('Profile');
    this.setServerLoading();
    this.userHistoryService.getUserHistoryForQuizzes().then(
      (userHistoryQuizzes) => {
        this.setServerSuccess();
        this.userHistoryQuizzes = userHistoryQuizzes;
      },
      (err) => {
        console.log('Error getting user history for quizzes: ' + err);
        this.setServerFailed();
      });
  }
}
