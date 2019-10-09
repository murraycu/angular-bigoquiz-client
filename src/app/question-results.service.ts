import { QuestionResultEvent } from "./question-result-event";

import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

/**
 * This lets QuestionComponent notify UserSectionsHistoryComponent
 * about question results (whether the user answered correctly),
 * so the UserSectionHistoryComponent doesn't need to get the
 * full set of results from the server just to appear up-to-date.
 *
 * This involves no communication with the server.
 */
@Injectable()
export class QuestionResultsService {
  private subject = new Subject<QuestionResultEvent>();

  /**
   * Observable string streams
   */
  public notifyObservable$ = this.subject.asObservable();

  constructor() {}

  public notify(data: QuestionResultEvent) {
    if (data) {
      this.subject.next(data);
    }
  }
}
