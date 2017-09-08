import { UserStats } from './user-stats';
import { QuizSection } from './quiz-section';
import { LoginInfo } from './login-info';

export class UserHistorySections {
  loginInfo: LoginInfo;
  quizTitle: string;

  // Map of section IDs to stats.
  statsMap: Map<string, UserStats>;
  stats: UserStats[];

  public getUserStatsForSection(sectionId: string): UserStats {
    if (!this.statsMap) {
      return undefined;
    }

    return this.statsMap.get(sectionId);
  }

  public hasUser(): boolean {
    if (!this.loginInfo) {
      return false;
    }

    if (this.loginInfo.userId && this.loginInfo.userId.length) {
      return true;
    }

    return false;
  }
}
