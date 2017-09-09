import { Component, ViewChild } from '@angular/core';

import { UserHistorySectionsComponent } from './user-history-sections.component';
import { UserHistorySections } from './data-structure/user-history-sections';
import { UserHistoryService } from './rest-api-clients/user-history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  @ViewChild(UserHistorySectionsComponent)
  private sectionsComponent: UserHistorySectionsComponent

  quizId: string
  quizTitle: string

  constructor(private userHistoryService: UserHistoryService) {
  }

  onViewChildJsonParsed() {
    let sections: UserHistorySections = this.sectionsComponent.userHistorySections
    this.quizId = sections.quizId;
    this.quizTitle = sections.quizTitle;
  }

  onResetClicked() {
    this.userHistoryService.resetSections(this.quizId).
      then( ok => {
        // TODO: Refresh the UI.
      });
  }

}
