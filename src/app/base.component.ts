import { Title } from '@angular/platform-browser';

import { ServerState } from './server-status.component';

export class BaseComponent {
  public serverState: ServerState = ServerState.loading;

  public constructor(private titleService: Title) {
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  // Show a Loading... message.
  public setServerLoading() {
    this.serverState = ServerState.loading;
  }

  // Show an error message.
  public setServerFailed() {
    this.serverState = ServerState.failed;
  }

  // Hide the Loading.. and error messages.
  public setServerSuccess() {
    this.serverState = ServerState.success;
  }
}
