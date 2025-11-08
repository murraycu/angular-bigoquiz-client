import { plainToClass, Type } from 'class-transformer';
import { QuizQuestion } from './quiz-question';
import { QuizText } from './quiz-text';

export class SubmissionResult {
  public result: boolean = false;

  @Type(() => QuizText)
  public correctAnswer: QuizText = new QuizText()

  @Type(() => QuizQuestion)
  public nextQuestion: QuizQuestion = new QuizQuestion;

  public static fromJson(obj: any): SubmissionResult {
    return plainToClass(SubmissionResult, obj as Record<string, unknown>);
  }
}
