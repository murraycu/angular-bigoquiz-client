import { Component, Input } from '@angular/core';

export enum ServerState {
  loading,
  failed, // Note: Using Error here instead causes some compiler confusion with ErrorConstructor.
  success,
}

@Component({
    selector: "app-server-status",
    styleUrls: ["./server-status.component.css"],
    templateUrl: "./server-status.component.html"
})
export class ServerStatusComponent {
  // Make the enum available to the html template.
  public serverStateEnum = ServerState;

  // Note: For some reason we need to define an explicit set,
  @Input() public state: ServerState;
}
