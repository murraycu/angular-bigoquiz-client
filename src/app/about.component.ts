import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { BaseComponent } from "./base.component";

@Component({
    selector: "app-about",
    templateUrl: "./about.component.html",
    standalone: false
})
export class AboutComponent extends BaseComponent implements OnInit {
  constructor(titleService: Title) {
   super(titleService);
  }

  public ngOnInit(): void {
    this.setTitle("About");
  }
}
