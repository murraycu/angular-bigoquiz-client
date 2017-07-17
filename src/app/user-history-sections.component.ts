import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { UserHistoryService } from './user-history.service';
import { UserHistorySections} from './data-structure/user-history-sections';

@Component({
  selector: 'user-history-sections',
  templateUrl: './user-history-sections.component.html',
})
export class UserHistorySectionsComponent implements OnInit {
  userHistorySections: UserHistorySections;

  constructor(private userHistoryService: UserHistoryService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.userHistoryService.getUserHistorySectionsForQuiz(params.get('id')))
      .subscribe(userHistorySections => this.userHistorySections = userHistorySections);
  }
}
