import { AfterViewChecked, Component, OnInit, NgZone } from '@angular/core';

import { UserService } from './rest-api-clients/user.service';
import { LoginInfo } from './data-structure/login-info';

// Google's login API namespace
declare var gapi: any;

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit, AfterViewChecked {
  loginInfo: LoginInfo;
  googleLoginButtonId = 'google-login-button';

  constructor(private userService: UserService, private zone: NgZone) { }

  ngOnInit(): void {
    // This only gives us part of the URL, such as "/quiz/algorithms".
    // let currentUrl: string = this.location.prepareExternalUrl(this.location.path());

    const currentUrl: string = window.location.href;

    this.userService.getUser(currentUrl).then(loginInfo => this.loginInfo = loginInfo);
  }

  // Other people seem to use ngAfterViewInit(), but the <div> does not exist yet at that point.
  // https://stackoverflow.com/questions/35530483/google-sign-in-for-websites-and-angular-2-using-typescript/42802835
  ngAfterViewChecked() {
    // Converts the Google login button stub to an actual button.
    gapi.signin2.render(
      this.googleLoginButtonId,
      {
        'onSuccess': this.onGoogleLoginSuccess,
        'scope': 'profile',
        'theme': 'dark'
      });
  }

  // A simple typescript method doesn't work: onGoogleLoginSuccess(loggedInUser): void {
  // and we need to use an NgZone.
  // See https://stackoverflow.com/questions/35530483/google-sign-in-for-websites-and-angular-2-using-typescript
  onGoogleLoginSuccess = (loggedInUser) => {
    this.zone.run(() => {
      // Update the loginInfo locally,
      // in case the login doesn't result in a complete page refresh.
      if (!this.loginInfo) {
        this.loginInfo = new LoginInfo();
      }

      this.loginInfo.userId = loggedInUser.userId;
      this.loginInfo.nickname = loggedInUser.getBasicProfile().getName();
      console.log(this);
    });
  }

  // TODO: Let the parent component specify whether the logout link should be visible,
  // so we can show it only on the /user page.
}
