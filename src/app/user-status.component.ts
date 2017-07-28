import { AfterViewChecked, Component, OnInit, NgZone, Input } from '@angular/core';

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
  // We don't want to show the logout button in the header,
  // but we do want to show it on the user/profile page.
  @Input() showLogOutWhenAppropriate: boolean;

  loginInfo: LoginInfo;

  googleLoginButtonId = 'google-login-button';
  private loginButtonRendered = false;

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
    // console.log('debug ngAfterViewChecked');

    if (!document.getElementById(this.googleLoginButtonId)) {
      // console.log('debug ngAfterViewChecked: div does not exist.');
      return;
    }

    // Avoid an infinite loop.
    // gapi.signin2.render() seems to trigger another ngAfterViewChecked().
    if (this.loginButtonRendered) {
      return;
    }

    // console.log('debug ngAfterViewChecked: rendering button.');

    this.loginButtonRendered = true;

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
