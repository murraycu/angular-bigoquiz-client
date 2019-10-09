import { plainToClass, Type } from "class-transformer";
import { LoginInfo } from "./login-info";
import { UserStats } from "./user-stats";

export class UserHistorySections {
  public static fromJson(obj: any): UserHistorySections {
    const result: UserHistorySections = plainToClass(UserHistorySections, obj as object);

    // stats:
    if (result.stats) {
      result.statsMap = new Map<string, UserStats>();

      for (const jsonStats of result.stats) {
        const userStats = UserStats.fromJson(jsonStats);

        result.statsMap.set(userStats.sectionId, userStats);
      }
    }

    return result;
  }

  @Type(() => LoginInfo)
  public loginInfo: LoginInfo;

  public quizId: string;
  public quizTitle: string;

  @Type(() => UserStats)
  public stats: UserStats[];

  // Map of section IDs to stats.
  // This is built from stats
  public statsMap: Map<string, UserStats>;

  public getUserStatsForSection(sectionId: string): UserStats {
    if (!this.statsMap) {
      return undefined;
    }

    return this.statsMap.get(sectionId);
  }

  public setUserStatsForSection(sectionId: string, userStats: UserStats) {
    if (!this.statsMap) {
      return undefined;
    }

    // Update in stats.
    for (var i = 0; i < this.stats.length; i++) {
      if( this.stats[i].sectionId == sectionId){
        this.stats[i] = userStats;
      }
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
