import { Component, ViewChild } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { BaseComponent } from "./base.component";
import { UserHistorySections } from "./data-structure/user-history-sections";
import { UserHistoryService } from "./rest-api-clients/user-history.service";
import { UserHistorySectionsComponent } from "./user-history-sections.component";

@Component({
  selector: "app-history",
  styleUrls: ["./history.component.css"],
  templateUrl: "./history.component.html",
})
export class HistoryComponent extends BaseComponent {

  public quizId: string = "";
  public quizTitle: string = "";
  @ViewChild(UserHistorySectionsComponent, { static: true })
  private sectionsComponent?: UserHistorySectionsComponent;

  constructor(private userHistoryService: UserHistoryService,
              titleService: Title) {
   super(titleService);
  }

  public onViewChildJsonParsed() {
    if (this.sectionsComponent) {
      const sections: UserHistorySections | undefined = this.sectionsComponent.userHistorySections;
      if (sections) {
        this.quizId = sections.quizId;
        this.quizTitle = sections.quizTitle;
      }
    }

    this.setTitle("History: " + this.quizTitle);
  }

  public onResetClicked() {
    this.userHistoryService.resetSections(this.quizId).
      then( (ok) => {
        // TODO: Refresh the UI.
      });
  }

}
