import { Component } from '@angular/core';

export enum ServerState {
  Loading,
  Failed, // Note: Using Error here instead causes some compiler confusion with ErrorConstructor.
  Success
};

export class PageBaseComponent {
  // Make the enum available to the html template.
  ServerStateEnum = ServerState;

  private serverState: ServerState = ServerState.Loading;

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
