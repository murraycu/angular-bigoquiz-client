import { UserStats } from './user-stats';
import { Quiz } from './quiz';

export class UserHistoryQuizzes {
  // Just the IDs and Titles of the quizzes.
  quizzes: Quiz[];

  // Map of quiz IDs to stats.
  stats: Map<string, UserStats>;

  public getUserStatsForQuiz(quizId: string): UserStats {
    if (!this.stats) {
      return undefined;
    }

    return this.stats.get(quizId);
  }
}
