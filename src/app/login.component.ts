import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { BaseComponent } from './base.component';
import { Config } from './config';
import { LoginInfo } from './data-structure/login-info';
import { UserService } from './rest-api-clients/user.service';

// Google's login API namespace
declare let gapi: any;

@Component({
    selector: "app-login",
    styleUrls: ["./login.component.css"],
    templateUrl: "./login.component.html",
    standalone: false
})
export class LoginComponent extends BaseComponent implements OnInit {

  private static redirectSuffix = `?redirect=${Config.baseUrl}/user`;
  // We don't want to show the logout button in the header,
  // but we do want to show it on the user/profile page.
  @Input() public showLogOutWhenAppropriate: boolean = false;

  public loginInfo: LoginInfo;
  public loginFailed: boolean = false;
  public googleLoginUrl = `${Config.googleLoginPrefix}${LoginComponent.redirectSuffix}`;
  public gitHubLoginUrl = `${Config.gitHubLoginPrefix}${LoginComponent.redirectSuffix}`;
  public facebookLoginUrl = `${Config.facebookLoginPrefix}${LoginComponent.redirectSuffix}`;

  constructor(private userService: UserService,
              private zone: NgZone,
              private route: ActivatedRoute,
              titleService: Title) {
    super(titleService);
  }

  public ngOnInit(): void {
    this.setTitle('Login');

    // Get the "failed" query parameter:
    // We could instead do this, but it's theoretically possible that we might
    // change the parameters programatically.
    // this.loginFailed = this.route.snapshot.queryParams.failed;

    this.route.queryParamMap.subscribe((params: ParamMap) => {
        const str = params.get('failed') || '';
        this.loginFailed = (str === 'true');
      });

    // Get the login info from the server:
    this.userService.getUser().then((loginInfo) => this.loginInfo = loginInfo);
  }
}
