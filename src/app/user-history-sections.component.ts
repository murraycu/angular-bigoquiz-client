import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { UserHistoryService } from './user-history.service';
import { UserHistorySections} from './data-structure/user-history-sections';
import { QuizQuestion} from './data-structure/quiz-question';
import { UserQuestionHistory} from './data-structure/user-question-history';

@Component({
  selector: 'user-history-sections',
  templateUrl: './user-history-sections.component.html',
  styleUrls: ['./user-history-sections.component.css']
})
export class UserHistorySectionsComponent implements OnInit {
  private quizId: string;
  userHistorySections: UserHistorySections;

  constructor(private userHistoryService: UserHistoryService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap
    .switchMap((params: ParamMap) => {
      this.quizId = params.get('quiz-id');
      return this.userHistoryService.getUserHistorySectionsForQuiz(this.quizId)
    })
    .subscribe(userHistorySections => this.userHistorySections = userHistorySections);
  }

  // Note: The code in the .html will happily call this function with the wrong type,
  // presumably because it's really running Javascript, not Typescript,
  // and there is no Typescript compiler checking of the code in the .html.
  /** Get a suitable title to show in the list of problem questions.
   */
  questionTitle(question: UserQuestionHistory) {
    if (!question || !question.questionTitle || !question.questionTitle.text) {
      return "";
    }

    if (question.subSectionTitle) {
      return `{{question.subSectionTitle}}: {{question.questionTitle.text}}`;
    } else {
      return question.questionTitle.text;
    }
  }
}
