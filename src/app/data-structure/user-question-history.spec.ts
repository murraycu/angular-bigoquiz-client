import { UserQuestionHistory } from './user-question-history'

describe('UserQuestionHistory without the TestBed', () => {
  let history: UserQuestionHistory;

  beforeEach(() => {history = new UserQuestionHistory(); });

  it('answeredCorrectlyOnce should default to false.', () => {
    expect(history.answeredCorrectlyOnce).toBe(false);
  });

  it('countAnsweredWrong should default to 0.', () => {
    expect(history.countAnsweredWrong).toBe(0);
  });

  it('#adjustCount(true) updates counts correctly.', () => {
    history.adjustCount(true);
    expect(history.answeredCorrectlyOnce).toBe(true);
    expect(history.countAnsweredWrong).toBe(-1);
  });

  it('#adjustCount(false) updates counts correctly.', () => {
    history.adjustCount(false);
    expect(history.answeredCorrectlyOnce).toBe(false);
    expect(history.countAnsweredWrong).toBe(1);
  });

});
