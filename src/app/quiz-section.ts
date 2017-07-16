import { HasIdAndTitle } from './has-id-and-title';
import { QuizSubSection } from './quiz-sub-section';

export class QuizSection extends HasIdAndTitle {
  subSections: QuizSubSection[];
}
