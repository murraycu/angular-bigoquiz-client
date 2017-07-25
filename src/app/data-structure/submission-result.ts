import { QuizText } from './quiz-text';
import { QuizQuestion } from './quiz-question';

export class SubmissionResult {
  result: boolean;
  correctAnswer: QuizText;
  nextQuestion: QuizQuestion;
}
