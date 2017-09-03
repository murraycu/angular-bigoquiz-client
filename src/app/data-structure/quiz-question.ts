import { HasIdAndTitle } from './has-id-and-title';
import { QuizSubSection } from './quiz-sub-section';
import { QuizText } from './quiz-text';

export class QuizQuestion extends HasIdAndTitle {
  text: QuizText;
  note: string;
  videoUrl: string;
  codeUrl: string;
  choices: QuizText[];

  sectionId: string;
  subSectionId: string;

  quizTitle: string;
  section: HasIdAndTitle;
  subSection: QuizSubSection;
  quizUsesMathML: boolean;
}
