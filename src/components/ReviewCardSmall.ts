import { TomatoResult } from '../lib/scrapers/rottentomatoes-scraper';
import Score from './Score';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const reviewCard = require('./reviewCard.html');

const ReviewCardSmall = (scraper: (title: string) => Promise<void | TomatoResult>, title: string): HTMLElement => {
  const handleHover = (reviewSection: HTMLElement) => {
    const result: Promise<void | TomatoResult> = scraper(title);

    result.then((r?: TomatoResult) => {
      const existingScores = reviewSection.querySelectorAll('.score');

      for (const score of existingScores as NodeListOf<HTMLElement>) {
        score.remove();
      }

      reviewSection.appendChild(Score(r.tomatoMeter));
      reviewSection.appendChild(Score(r.audience));
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
