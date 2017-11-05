import { HasIdAndTitle } from './has-id-and-title';
import { QuizSection } from './quiz-section';
import { QuizQuestionAndAnswer } from './quiz-question-and-answer';
import { Type, plainToClass } from "class-transformer";

export class Quiz extends HasIdAndTitle {
  public static fromJson(obj: any): Quiz {
    return plainToClass(Quiz, obj as object)
  }

  isPrivate: boolean;
  usesMathML: boolean;
  questionsCount: number;

  @Type(() => QuizSection)
  sections: QuizSection[];

  // Top-level questions, not in a section.
  @Type(() => QuizQuestionAndAnswer)
  questions: QuizQuestionAndAnswer[];
}
