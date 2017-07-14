import { AngularBigoquizClientPage } from './app.po';

describe('angular-bigoquiz-client App', () => {
  let page: AngularBigoquizClientPage;

  beforeEach(() => {
    page = new AngularBigoquizClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
