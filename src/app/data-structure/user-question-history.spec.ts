import { UserQuestionHistory } from './user-question-history';
import { QuizQuestion } from './quiz-question';

describe('UserQuestionHistory without the TestBed', () => {
  let history: UserQuestionHistory;

  beforeEach(() => {
    const question: QuizQuestion = new QuizQuestion();
    question.id = "questionid1";
    history = UserQuestionHistory.fromQuestion(question);
  });

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
