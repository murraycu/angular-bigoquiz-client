import { UserStats } from './user-stats';
import { QuizSection } from './quiz-section';

export class UserHistorySections {
  sections: QuizSection[];
  stats: Map<string, UserStats>;
}
