import { Component } from '@angular/core';

@Component({
    selector: "app-root",
    styleUrls: ["./app.component.css"],
    template: `
    <div class="parent-content-panel">
      <router-outlet></router-outlet>
    </div>
    `,
    standalone: false
})
export class AppComponent {
}
