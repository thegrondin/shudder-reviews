import { ScrapeResult } from '../lib/scrapers/Scraper';
import TomatoScraper from '../lib/scrapers/TomatoScraper';
import Score from './Score';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const reviewCard = require('./reviewCardLarge.html');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ReviewCardLarge = (scraper: new (name: string) => TomatoScraper, title: string): HTMLElement => {
  const handlePopulate = (reviewSection: HTMLElement) => {
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

      const tomatoScore = Score(tomatoMeter);
      const audienceScore = Score(audience);

      tomatoScore.classList.add('large');
      audienceScore.classList.add('large');

      reviewSection.appendChild(tomatoScore);
      reviewSection.appendChild(audienceScore);
    });
  };

  if (document.querySelector('.review-card-large-wrapper')) {
    document.querySelector('.review-card-large-wrapper').remove();
  }

  const reviewCardContainer: HTMLElement = document.createElement('div');
  reviewCardContainer.classList.add('review-card-large-wrapper');

  reviewCardContainer.innerHTML = reviewCard.default;

  const reviewSection: HTMLElement = reviewCardContainer.querySelector('.review-section-large .scores');
  reviewSection.appendChild(Score());
  reviewSection.appendChild(Score());

  handlePopulate(reviewSection);

  return reviewCardContainer;
};

export default ReviewCardLarge;
