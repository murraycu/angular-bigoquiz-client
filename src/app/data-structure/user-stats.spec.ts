import { UserStats } from './user-stats'

describe('UserStats without the TestBed', () => {
  let userStats: UserStats;

  beforeEach(() => {userStats = new UserStats(); });

  it ('answered should default to 0.', () => {
    expect(userStats.answered).toBe(0);
  });

  it ('correct should default to 0.', () => {
    expect(userStats.correct).toBe(0);
  });

  it ('countQuestionsAnsweredOnce should default to 0.', () => {
    expect(userStats.countQuestionsAnsweredOnce).toBe(0);
  });

  it ('countQuestionsCorrectOnce should default to 0.', () => {
    expect(userStats.countQuestionsCorrectOnce).toBe(0);
  });
});
