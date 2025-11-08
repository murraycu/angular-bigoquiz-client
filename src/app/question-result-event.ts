import { QuizQuestion } from './data-structure/quiz-question';

export class QuestionResultEvent {
  public question: QuizQuestion = new QuizQuestion();
  public result: boolean = false;
}
