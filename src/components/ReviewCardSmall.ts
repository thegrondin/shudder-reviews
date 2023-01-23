import { ScrapeResult } from '../lib/scrapers/Scraper';
import TomatoScraper from '../lib/scrapers/TomatoScraper';
import Score from './Score';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const reviewCard = require('./reviewCard.html');

const ReviewCardSmall = (scraper: new (name: string) => TomatoScraper, title: string): HTMLElement => {
  const handleHover = (reviewSection: HTMLElement) => {
    const result: Promise<void | ScrapeResult> = new scraper('https://www.rottentomatoes.com/search?search=').getResult(
      title
    );

    result.then((r?: ScrapeResult) => {
      const existingScores = reviewSection.querySelectorAll('.score');

      for (const score of existingScores as NodeListOf<HTMLElement>) {
        score.remove();
      }

      const tomatoMeter = r.reviews.find((review) => review.name === 'TomatoMeter');
      const audience = r.reviews.find((review) => review.name === 'Audience');

      reviewSection.appendChild(Score(tomatoMeter));
      reviewSection.appendChild(Score(audience));
    });
  };

  const reviewCardContainer: HTMLElement = document.createElement('div');

  reviewCardContainer.innerHTML = reviewCard.default;

  const reviewSection: HTMLElement = reviewCardContainer.querySelector('.review-section');
  reviewSection.appendChild(Score());
  reviewSection.appendChild(Score());

  reviewCardContainer.removeEventListener('mouseenter', () => {
    handleHover(reviewSection);
  });

  reviewCardContainer.addEventListener('mouseenter', () => {
    handleHover(reviewSection);
  });

  return reviewCardContainer;
};

export default ReviewCardSmall;
