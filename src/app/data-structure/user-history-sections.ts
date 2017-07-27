import { UserStats } from './user-stats';
import { QuizSection } from './quiz-section';
import { LoginInfo } from './login-info';

export class UserHistorySections {
  loginInfo: LoginInfo;
  sections: QuizSection[];

  // Map of section IDs to stats.
  stats: Map<string, UserStats>;

  public getUserStatsForSection(sectionId: string): UserStats {
    if (!this.stats) {
      return undefined;
    }

    return this.stats.get(sectionId);
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
