import { plainToClass, Type } from 'class-transformer';
import { LoginInfo } from './login-info';
import { UserStats } from './user-stats';

export class UserHistorySections {
  @Type(() => LoginInfo)
  public loginInfo: LoginInfo | null = null;

  public quizId = "";
  public quizTitle = "";

  // Only used when parsing from JSON.
  @Type(() => UserStats)
  public stats: UserStats[] = [];

  // Map of section IDs to stats.
  // This is built from stats
  public statsMap: Map<string, UserStats> = new Map<string, UserStats>();

  public static fromJson(obj: any): UserHistorySections {
    const result: UserHistorySections = plainToClass(UserHistorySections, obj as Record<string, unknown>);

    // stats:
    if (result.stats) {
      result.statsMap = new Map<string, UserStats>();

      for (const jsonStats of result.stats) {
        const userStats = UserStats.fromJson(jsonStats);

        result.statsMap.set(userStats.sectionId, userStats);
      }

      // After parsing, we will use only statsMap.
      result.stats = undefined;
    }

    return result;
  }

  public getUserStatsForSection(sectionId: string): UserStats {
    if (!this.statsMap) {
      return undefined;
    }

    return this.statsMap.get(sectionId);
  }

  public setUserStatsForSection(sectionId: string, userStats: UserStats) {
    if (!this.statsMap) {
      this.statsMap = new Map<string, UserStats>();
    }

    // Update in the map.
    this.statsMap.set(sectionId, userStats);
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
