import { plainToClass, Type } from 'class-transformer';
import { HasIdAndTitle } from './has-id-and-title';
import { QuizQuestionAndAnswer } from './quiz-question-and-answer';
import { QuizSection } from './quiz-section';

export class Quiz extends HasIdAndTitle {
  public isPrivate: boolean;
  public usesMathML: boolean;

  @Type(() => QuizSection)
  public sections: QuizSection[];

  public static fromJson(obj: any): Quiz {
    return plainToClass(Quiz, obj as object);
  }
}
