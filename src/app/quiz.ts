import { HasIdAndTitle } from './has-id-and-title';
import { QuizSection } from './quiz-section'

export class Quiz extends HasIdAndTitle {
  isPrivate: boolean;
  usesMathML: boolean;

  sections: QuizSection[];
}
