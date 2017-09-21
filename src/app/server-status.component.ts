import { Component, Input } from '@angular/core';

export enum ServerState {
  Loading,
  Failed, // Note: Using Error here instead causes some compiler confusion with ErrorConstructor.
  Success
};

@Component({
  selector: 'app-server-status',
  templateUrl: './server-status.component.html',
  styleUrls: ['./server-status.component.css']
})
export class ServerStatusComponent {
  // Make the enum available to the html template.
  ServerStateEnum = ServerState;

  // Note: For some reason we need to define an explicit set,
  @Input() state: ServerState;
}
