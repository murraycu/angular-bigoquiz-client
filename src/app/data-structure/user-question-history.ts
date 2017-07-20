import { QuizText } from './quiz-text';

export class UserQuestionHistory {
  questionId: string;

  questionTitle: QuizText;
  subSectionTitle: string;

  answeredCorrectlyOnce: boolean;
  countAnsweredWrong: number;
}
