import { UserStats } from './user-stats';
import { QuizSection } from './quiz-section';
import { LoginInfo } from './login-info';

export class UserHistorySections {
  loginInfo: LoginInfo;
  quizId: string;
  quizTitle: string;

  stats: UserStats[];

  // Map of section IDs to stats.
  // This is built from stats
  statsMap: Map<string, UserStats>;

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

    if (!this.loginInfo.loggedIn) {
      return false;
    }

    if (this.loginInfo.nickname && this.loginInfo.nickname.length) {
      return true;
    }

    return false;
  }
}
