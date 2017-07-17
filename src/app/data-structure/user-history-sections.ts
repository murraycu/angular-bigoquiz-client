import { UserStats } from './user-stats';
import { QuizSection } from './quiz-section';

export class UserHistorySections {
  sections: QuizSection[];
  stats: Map<string, UserStats>;

  public getUserStatsForSection(sectionId: string): UserStats {
    if (!this.stats) {
      return null;
    }

    return this.stats.get(sectionId);
  }
}
