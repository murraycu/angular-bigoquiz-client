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

  it ('updateProblemQuestion(, false) creates topProblemquestionHistories.', () => {
    const QUESTION_ID: string = 'testquestionid';
    userStats.updateProblemQuestion(QUESTION_ID, false);

    expect(userStats.topProblemQuestionHistories).toBeTruthy();
  });

  it ('updateProblemQuestion(, true) does not create topProblemquestionHistories.', () => {
    const QUESTION_ID: string = 'testquestionid';
    userStats.updateProblemQuestion(QUESTION_ID, true);

    expect(userStats.topProblemQuestionHistories).toBeUndefined();
  });

  it ('updateProblemQuestion(, false) fills topProblemquestionHistories.', () => {
    const QUESTION_ID: string = 'testquestionid';
    userStats.updateProblemQuestion(QUESTION_ID, false);

    expect(userStats.topProblemQuestionHistories.length).toBe(1);
    expect(userStats.topProblemQuestionHistories[0].questionId).toBe(QUESTION_ID);
  });

  it ('updateProblemQuestion(, false) twice fills topProblemquestionHistories.', () => {
    const QUESTION_ID1: string = 'testquestionid1';
    const QUESTION_ID2: string = 'testquestionid2';
    userStats.updateProblemQuestion(QUESTION_ID1, false);
    userStats.updateProblemQuestion(QUESTION_ID2, false);

    expect(userStats.topProblemQuestionHistories.length).toBe(2);
  });
});
