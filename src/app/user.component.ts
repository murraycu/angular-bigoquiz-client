import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { UserHistoryService } from './rest-api-clients/user-history.service';
import { UserHistoryQuizzes} from './data-structure/user-history-quizzes';
import { Config } from './config';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userHistoryQuizzes: UserHistoryQuizzes;

  logoutUrl: string = `${Config.baseUrl}/login/logout?redirect=http://beta.bigoquiz.com/user`

  constructor(private userHistoryService: UserHistoryService) { }

  ngOnInit(): void {
    this.userHistoryService.getUserHistoryForQuizzes().then(userHistoryQuizzes => this.userHistoryQuizzes = userHistoryQuizzes);
  }
}
