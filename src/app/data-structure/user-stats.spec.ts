import { QuizQuestion } from './quiz-question';
import { QuizText } from './quiz-text';
import { UserStats } from './user-stats';

describe('UserStats without the TestBed', () => {
  let userStats: UserStats;
  let QUESTION_ID1: string;
  let QUESTION_TEXT1: string;
  let question1: QuizQuestion;

  beforeEach(() => {
    userStats = new UserStats();

    // TODO: Use a createQuestion() utility function instead.
    QUESTION_ID1 = 'questionid1';
    QUESTION_TEXT1 = 'questiontitle1';
    question1 = new QuizQuestion();
    question1.id = QUESTION_ID1;
    question1.text = new QuizText();
    question1.text.text = QUESTION_TEXT1;
  });

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
    userStats.updateProblemQuestion(question1, true);

    // questionHistories should now be defined.
    expect(userStats.questionHistoriesMap).toBeTruthy();
  });

  it ('updateProblemQuestion(, false) creates questionHistories.', () => {
    userStats.updateProblemQuestion(question1, false);

    // questionHistories should now be defined.
    expect(userStats.questionHistoriesMap).toBeTruthy();
  });

  it ('updateProblemQuestion(, false) fills questionHistoriesMap.', () => {
    userStats.updateProblemQuestion(question1, false);

    expect(userStats.questionHistoriesMap.size).toBe(1);
    expect(userStats.questionHistoriesMap.get(QUESTION_ID1)).toBeTruthy();
    expect(userStats.questionHistoriesMap.get(QUESTION_ID1).questionId).toBeTruthy();
    expect(userStats.questionHistoriesMap.get(QUESTION_ID1).questionTitle).toBeTruthy();
  });

  it ('updateProblemQuestion(, true) fills questionHistoriesMap.', () => {
    userStats.updateProblemQuestion(question1, true);

    expect(userStats.questionHistoriesMap.size).toBe(1);
    expect(userStats.questionHistoriesMap.get(QUESTION_ID1)).toBeTruthy();
    expect(userStats.questionHistoriesMap.get(QUESTION_ID1).questionId).toBeTruthy();
    expect(userStats.questionHistoriesMap.get(QUESTION_ID1).questionTitle).toBeTruthy();
  });

  it ('updateProblemQuestion(, false) creates topProblemquestionHistories.', () => {
    userStats.updateProblemQuestion(question1, false);

    expect(userStats.topProblemQuestionHistories).toBeTruthy();
  });

  it ('updateProblemQuestion(, true) does not create topProblemquestionHistories.', () => {
    userStats.updateProblemQuestion(question1, true);

    expect(userStats.topProblemQuestionHistories).toBeUndefined();
  });

  it ('updateProblemQuestion(, false) fills topProblemquestionHistories.', () => {
    userStats.updateProblemQuestion(question1, false);

    expect(userStats.topProblemQuestionHistories.length).toBe(1);
    expect(userStats.topProblemQuestionHistories[0].questionId).toBe(QUESTION_ID1);
  });

  it ('updateProblemQuestion(, false) twice fills topProblemquestionHistories.', () => {
    const QUESTION_ID2 = 'questionid2';
    const question2: QuizQuestion = new QuizQuestion();
    question2.id = QUESTION_ID2;

    userStats.updateProblemQuestion(question1, false);
    userStats.updateProblemQuestion(question2, false);

    expect(userStats.topProblemQuestionHistories).toBeTruthy();
    expect(userStats.topProblemQuestionHistories.length).toBe(2);
  });

  it ('updateProblemQuestion() false, true re-empties topProblemquestionHistories.',
    () => {
    userStats.updateProblemQuestion(question1, false);
    userStats.updateProblemQuestion(question1, true);

    expect(userStats.topProblemQuestionHistories).toBeUndefined();
  });

  it (
    'updateProblemQuestion() false (id1), false (id2), true (id2) results in just id1 in topProblemquestionHistories.',
    () => {
    const QUESTION_ID2 = 'questionid2';
    const question2: QuizQuestion = new QuizQuestion();
    question2.id = QUESTION_ID2;

    userStats.updateProblemQuestion(question1, false);
    userStats.updateProblemQuestion(question2, false);
    userStats.updateProblemQuestion(question2, true);

    expect(userStats.topProblemQuestionHistories).toBeTruthy();
    expect(userStats.topProblemQuestionHistories.length).toBe(1);
  });

  it ('percentageString should produce an expected string', () => {
    expect(UserStats.percentageString(100, 10)).toBe('10.00%');
  });

  it ('percentageString should not fail with a 0 part value', () => {
    expect(UserStats.percentageString(100, 0)).toBe('0.00%');
  });

  it ('percentageString should not fail with a 0 total value', () => {
    expect(UserStats.percentageString(0, 10)).toBe('0.00%');
  });
});
