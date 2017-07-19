import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { UserHistoryService } from './user-history.service';
import { UserHistoryQuizzes} from './data-structure/user-history-quizzes';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  private userHistoryQuizzes: UserHistoryQuizzes;

  constructor(private userHistoryService: UserHistoryService) { }

  ngOnInit(): void {
    this.userHistoryService.getUserHistoryForQuizzes().then(userHistoryQuizzes => this.userHistoryQuizzes = userHistoryQuizzes);
  }
}
