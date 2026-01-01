import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { BaseComponent } from './base.component';

@Component({
    selector: "app-about",
    templateUrl: "./about.component.html"
})
export class AboutComponent extends BaseComponent implements OnInit {
  constructor() {
   const titleService = inject(Title);

   super(titleService);
  }

  public ngOnInit(): void {
    this.setTitle('About');
  }
}
