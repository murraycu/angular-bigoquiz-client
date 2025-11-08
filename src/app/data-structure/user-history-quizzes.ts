import { plainToClass, Type } from 'class-transformer';
import { UserStats } from './user-stats';

export class UserHistoryQuizzes {
  @Type(() => UserStats)
  public stats: UserStats[] = [];

  public static fromJson(obj: any): UserHistoryQuizzes {
    return plainToClass(UserHistoryQuizzes, obj as Record<string, unknown>);
  }
}
