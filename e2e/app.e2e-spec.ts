import { WebsitePWAPage } from './app.po';

describe('website-pwa App', () => {
  let page: WebsitePWAPage;

  beforeEach(() => {
    page = new WebsitePWAPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
