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
    // This only gives us part of the URL, such as "/quiz/algorithms".
    // let currentUrl: string = this.location.prepareExternalUrl(this.location.path());

    let currentUrl: string = window.location.href;

    this.userService.getUser(currentUrl).then(loginInfo => this.loginInfo = loginInfo);
  }

  // TODO: Let the parent component specify whether the logout link should be visible,
  // so we can show it only on the /user page.
}
