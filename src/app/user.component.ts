import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { BaseComponent } from './base.component';
import { UserHistoryService } from './rest-api-clients/user-history.service';
import { UserHistoryQuizzes} from './data-structure/user-history-quizzes';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css', './user-history-sections.component.css']
})
export class UserComponent extends BaseComponent implements OnInit {
  userHistoryQuizzes: UserHistoryQuizzes;

  constructor(private userHistoryService: UserHistoryService) {
   super();
  }

  ngOnInit(): void {
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
