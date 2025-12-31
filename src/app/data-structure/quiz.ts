import { plainToInstance, Type } from 'class-transformer';
import { HasIdAndTitle } from './has-id-and-title';
import { QuizSection } from './quiz-section';

export class Quiz extends HasIdAndTitle {
  public isPrivate = false;
  public usesMathML = false;

  @Type(() => QuizSection)
  public sections: QuizSection[] = [];


  public static fromJson(obj: any): Quiz {
    return plainToInstance(Quiz, obj as Record<string, unknown>);
  }
}
