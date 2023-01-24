import log from '../lib/log';
import TomatoScraper from '../lib/scrapers/TomatoScraper';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const reviewCard = require('./reviewCardLarge.html');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ReviewCardLarge = (scraper: new (name: string) => TomatoScraper, title: string): HTMLElement => {
  log('ReviewCardLarge: ');

  const reviewCardContainer: HTMLElement = document.createElement('div');

  reviewCardContainer.innerHTML = reviewCard.default;

  return reviewCardContainer;
};

export default ReviewCardLarge;
