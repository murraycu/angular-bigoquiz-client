import { Component, OnInit, NgZone, Input } from '@angular/core';

import { UserService } from './rest-api-clients/user.service';
import { LoginInfo } from './data-structure/login-info';

// Google's login API namespace
declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // We don't want to show the logout button in the header,
  // but we do want to show it on the user/profile page.
  @Input() showLogOutWhenAppropriate: boolean;

  loginInfo: LoginInfo;

  constructor(private userService: UserService, private zone: NgZone) { }

  ngOnInit(): void {
    this.userService.getUser().then(loginInfo => this.loginInfo = loginInfo);
  }
}
