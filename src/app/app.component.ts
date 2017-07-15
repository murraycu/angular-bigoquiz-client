import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="parent-content-panel">
      <div class="content-panel">
        <router-outlet></router-outlet>
      </div>
    </div>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
