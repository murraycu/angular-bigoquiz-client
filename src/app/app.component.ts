import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="parent-content-panel">
      <router-outlet></router-outlet>
    </div>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
