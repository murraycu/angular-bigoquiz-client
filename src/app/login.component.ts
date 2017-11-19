import { Component, OnInit, NgZone, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { BaseComponent } from './base.component';
import { UserService } from './rest-api-clients/user.service';
import { LoginInfo } from './data-structure/login-info';
import { Config } from './config';

// Google's login API namespace
declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {
  // We don't want to show the logout button in the header,
  // but we do want to show it on the user/profile page.
  @Input() showLogOutWhenAppropriate: boolean;

  loginInfo: LoginInfo;
  loginFailed: boolean;

  private static redirectSuffix = `?redirect=${Config.baseUrl}/user`;
  googleLoginUrl = `${Config.googleLoginPrefix}${LoginComponent.redirectSuffix}`;
  gitHubLoginUrl = `${Config.gitHubLoginPrefix}${LoginComponent.redirectSuffix}`;
  facebookLoginUrl = `${Config.facebookLoginPrefix}${LoginComponent.redirectSuffix}`;

  constructor(private userService: UserService,
    private zone: NgZone,
    private route: ActivatedRoute,
    titleService: Title) {
    super(titleService);
  }

  ngOnInit(): void {
    this.setTitle('Login');

    // Get the "failed" query parameter:
    // We could instead do this, but it's theoretically possible that we might
    // change the parameters programatically.
    // this.loginFailed = this.route.snapshot.queryParams.failed;

    this.route.queryParams.subscribe((params: ParamMap) => {
      const str = params['failed'];
      this.loginFailed = (str === 'true');
    });

    // Get the login info from the server:
    this.userService.getUser().then(loginInfo => this.loginInfo = loginInfo);
  }
}
