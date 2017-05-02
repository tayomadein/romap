import { RoMapsPage } from './app.po';

describe('ro-maps App', function() {
  let page: RoMapsPage;

  beforeEach(() => {
    page = new RoMapsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
