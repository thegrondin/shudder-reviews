import { TomatoResult } from '../lib/scrapers/rottentomatoes-scraper';
import Score from './Score';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const reviewCard = require('./reviewCard.html');

const ReviewCardSmall = (scraper, card): HTMLElement => {
  const reviewCardContainer = document.createElement('div');

  reviewCardContainer.innerHTML = reviewCard.default;

  const reviewSection = reviewCardContainer.querySelector('.review-section');
  reviewSection.appendChild(Score());
  reviewSection.appendChild(Score());

  reviewCardContainer.addEventListener('mouseenter', () => {
    const title = JSON.parse(card.getAttribute('data-track-set'))['Media Title'];
    const result: Promise<void | TomatoResult> = scraper(title);

    result.then((r?: TomatoResult) => {
      const existingScores = reviewSection.querySelectorAll('.score');

      for (const score of existingScores as NodeListOf<HTMLElement>) {
        score.remove();
      }

      reviewSection.appendChild(Score(r.tomatoMeter));
      reviewSection.appendChild(Score(r.audience));
    });
  });

  return reviewCardContainer;
};

export default ReviewCardSmall;
