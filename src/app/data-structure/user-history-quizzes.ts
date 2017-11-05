import { UserStats } from './user-stats';
import { Type, plainToClass } from 'class-transformer';


export class UserHistoryQuizzes {
  public static fromJson(obj: any): UserHistoryQuizzes {
    return plainToClass(UserHistoryQuizzes, obj as object);
  }

  @Type(() => UserStats)
  stats: UserStats[];
}
