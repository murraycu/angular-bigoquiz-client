import { UserStats } from './user-stats';
import { Type } from "class-transformer";


export class UserHistoryQuizzes {
  @Type(() => UserStats)
  stats: UserStats[];
}
