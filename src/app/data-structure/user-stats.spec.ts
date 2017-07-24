import { UserStats } from './user-stats';
import { QuizQuestion } from './quiz-question';

describe('UserStats without the TestBed', () => {
  let userStats: UserStats;
  let QUESTION_ID1: string;
  let question1: QuizQuestion;

  beforeEach(() => {
    userStats = new UserStats();

    // TODO: Use a createQuestion() utility function instead.
    QUESTION_ID1 = "questionid1";
    question1 = new QuizQuestion();
    question1.id = QUESTION_ID1;
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
    expect(userStats.questionHistories).toBeTruthy();
  });

  it ('updateProblemQuestion(, false) creates questionHistories.', () => {
    userStats.updateProblemQuestion(question1, false);

    // questionHistories should now be defined.
    expect(userStats.questionHistories).toBeTruthy();
  });

  it ('updateProblemQuestion(, false) fills questionHistories.', () => {
    userStats.updateProblemQuestion(question1, false);

    expect(userStats.questionHistories.size).toBe(1);
  });

  it ('updateProblemQuestion(, true) fills questionHistories.', () => {
    userStats.updateProblemQuestion(question1, true);

    expect(userStats.questionHistories.size).toBe(1);
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
    const QUESTION_ID2: string = "questionid2";
    const question2: QuizQuestion = new QuizQuestion();
    question2.id = QUESTION_ID2

    userStats.updateProblemQuestion(question1, false);
    userStats.updateProblemQuestion(question2, false);

    expect(userStats.topProblemQuestionHistories.length).toBe(2);
  });
});
