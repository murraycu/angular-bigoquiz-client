import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { UserService } from './user.service';
import { LoginInfo } from './data-structure/login-info';

@Component({
  selector: 'user-status',
  templateUrl: './user-status.component.html',
})
export class UserStatusComponent implements OnInit {
  loginInfo: LoginInfo;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser().then(loginInfo => this.loginInfo = loginInfo);
  }

  // TODO: Let the parent component specify whether the logout link should be visible,
  // so we can show it only on the /user page.
}
