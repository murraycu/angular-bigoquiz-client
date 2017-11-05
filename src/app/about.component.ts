import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { BaseComponent } from './base.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent extends BaseComponent {
  constructor(titleService: Title) {
   super(titleService);
  }

  ngOnInit(): void {
    this.setTitle('About');
  }
}
