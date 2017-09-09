import { Component, ViewChild } from '@angular/core';

import { UserHistorySectionsComponent } from './user-history-sections.component';
import { UserHistorySections } from './data-structure/user-history-sections';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  @ViewChild(UserHistorySectionsComponent)
  private sectionsComponent: UserHistorySectionsComponent

  quizTitle: string

  onViewChildJsonParsed() {
    this.quizTitle = this.sectionsComponent.userHistorySections.quizTitle;
  }

}
