import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-server-status',
  templateUrl: './server-status.component.html',
  styleUrls: ['./server-status.component.css']
})
export class ServerStatusComponent {
  @Input() showLoading: boolean;
  @Input() showError: boolean;
}
