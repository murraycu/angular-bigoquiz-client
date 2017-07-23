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

  it ('updateProblemQuestion(, true) creates questionHistories.', () => {
    const QUESTION_ID: string = 'testquestionid';
    userStats.updateProblemQuestion(QUESTION_ID, true);

    // questionHistories should now be defined.
    expect(userStats.questionHistories).toBeTruthy();
  });

  it ('updateProblemQuestion(, false) creates questionHistories.', () => {
    const QUESTION_ID: string = 'testquestionid';
    userStats.updateProblemQuestion(QUESTION_ID, false);

    // questionHistories should now be defined.
    expect(userStats.questionHistories).toBeTruthy();
  });

  it ('updateProblemQuestion(, false) fills questionHistories.', () => {
    const QUESTION_ID: string = 'testquestionid';
    userStats.updateProblemQuestion(QUESTION_ID, false);

    expect(userStats.questionHistories.size).toBe(1);
  });

  it ('updateProblemQuestion(, true) fills questionHistories.', () => {
    const QUESTION_ID: string = 'testquestionid';
    userStats.updateProblemQuestion(QUESTION_ID, true);

    expect(userStats.questionHistories.size).toBe(1);
  });
});
