import { Component, OnInit, NgZone, Input } from '@angular/core';

import { UserService } from './rest-api-clients/user.service';
import { LoginInfo } from './data-structure/login-info';
import { Config } from './config';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit {
  // We don't want to show the logout button in the header,
  // but we do want to show it on the user/profile page.
  @Input() showExtras: boolean;

  loginInfo: LoginInfo;
  logoutUrl = `${Config.baseApiUrl}/login/logout?redirect=${Config.baseUrl}/user`;

  private static redirectSuffix = `?redirect=${Config.baseUrl}/user`;
  googleLoginUrl = `${Config.googleLoginPrefix}${UserStatusComponent.redirectSuffix}`;
  gitHubLoginUrl = `${Config.gitHubLoginPrefix}${UserStatusComponent.redirectSuffix}`;
  facebookLoginUrl = `${Config.facebookLoginPrefix}${UserStatusComponent.redirectSuffix}`;

  constructor(private userService: UserService, private zone: NgZone) { }

  ngOnInit(): void {
    // This only gives us part of the URL, such as "/quiz/algorithms".
    // let currentUrl: string = this.location.prepareExternalUrl(this.location.path());

    const currentUrl: string = window.location.href;

    this.userService.getUser().then(loginInfo => this.loginInfo = loginInfo);
  }
}
