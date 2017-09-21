import { Component } from '@angular/core';

import { ServerState } from './server-status.component';

export class BaseComponent {
  serverState: ServerState = ServerState.Loading;

  // Show a Loading... message.
  setServerLoading() {
    this.serverState = ServerState.Loading;
  }

  // Show an error message.
  setServerFailed() {
    this.serverState = ServerState.Failed;
  }

  // Hide the Loading.. and error messages.
  setServerSuccess() {
    this.serverState = ServerState.Success;
  }
}
