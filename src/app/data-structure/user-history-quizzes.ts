import { plainToClass, Type } from "class-transformer";
import { UserStats } from "./user-stats";

export class UserHistoryQuizzes {
  public static fromJson(obj: any): UserHistoryQuizzes {
    return plainToClass(UserHistoryQuizzes, obj as object);
  }

  @Type(() => UserStats)
  public stats: UserStats[];
}
