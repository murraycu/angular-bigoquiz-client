import { UserStats } from './user-stats';
import { QuizSection } from './quiz-section';

export class UserHistorySections {
  sections: QuizSection[];

  // Map of section IDs to stats.
  stats: Map<string, UserStats>;

  public getUserStatsForSection(sectionId: string): UserStats {
    if (!this.stats) {
      return undefined;
    }

    return this.stats.get(sectionId);
  }
}
