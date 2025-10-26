import { Component, Input, NgZone, OnInit } from '@angular/core';

import { Config } from './config';
import { LoginInfo } from './data-structure/login-info';
import { UserService } from './rest-api-clients/user.service';

@Component({
    selector: "app-user-status",
    styleUrls: ["./user-status.component.css"],
    templateUrl: "./user-status.component.html",
    standalone: false
})
export class UserStatusComponent implements OnInit {

  private static redirectSuffix = `?redirect=${Config.baseUrl}/user`;
  // We don't want to show the logout button in the header,
  // but we do want to show it on the user/profile page.
  @Input() public showExtras: boolean;

  public loginInfo: LoginInfo;
  public logoutUrl = `${Config.baseApiUrl}/login/logout?redirect=${Config.baseUrl}/user`;
  public googleLoginUrl = `${Config.googleLoginPrefix}${UserStatusComponent.redirectSuffix}`;
  public gitHubLoginUrl = `${Config.gitHubLoginPrefix}${UserStatusComponent.redirectSuffix}`;
  public facebookLoginUrl = `${Config.facebookLoginPrefix}${UserStatusComponent.redirectSuffix}`;

  constructor(private userService: UserService, private zone: NgZone) { }

  public ngOnInit(): void {
    // This only gives us part of the URL, such as "/quiz/algorithms".
    // let currentUrl: string = this.location.prepareExternalUrl(this.location.path());

    const currentUrl: string = window.location.href;

    this.userService.getUser().then((loginInfo) => this.loginInfo = loginInfo);
  }
}
