import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: "app-root",
    styleUrls: ["./app.component.css"],
    template: `
    <div class="parent-content-panel">
      <router-outlet></router-outlet>
    </div>
    `,
    imports: [RouterOutlet]
})
export class AppComponent {
}
