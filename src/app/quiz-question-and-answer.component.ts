
import {Component, Input} from '@angular/core';

import { QuizQuestionAndAnswer } from './data-structure/quiz-question-and-answer';

@Component({
  selector: "app-quiz-question-and-answer",
  styleUrls: ["./quiz-question-and-answer.component.css"],
  templateUrl: "./quiz-question-and-answer.component.html",
  standalone: false
})

export class QuizQuestionAndAnswerComponent {
  @Input() public qa: QuizQuestionAndAnswer = new QuizQuestionAndAnswer();
}
