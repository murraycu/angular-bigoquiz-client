import { QuizSection } from './quiz-section'

export class Quiz {
  id: string;
  title: string;
  isPrivate: boolean;
  usesMathML: boolean;

  sections: QuizSection[];
}
