import { TomatoReview } from '../lib/scrapers/rottentomatoes-scraper';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const reviewCard = require('./reviewCard.html');

const ReviewCardSmall = (review: TomatoReview): HTMLElement => {
  const applyScore = (review: TomatoReview, card: HTMLElement) => {
    const tomatoMeterProgress = card.querySelector('.score.tomatometer progress') as HTMLElement;
    const audienceProgress = card.querySelector('.score.audience progress') as HTMLElement;

    tomatoMeterProgress.setAttribute('value', review.tomatoMeter.toString());
    audienceProgress.setAttribute('value', review.audience.toString());

    const tomatoMeterScore = card.querySelector('.score.tomatometer .score-tooltip p') as HTMLElement;
    const audienceScore = card.querySelector('.score.audience .score-tooltip p') as HTMLElement;

    tomatoMeterScore.innerText = `${review.tomatoMeter}%`;
    audienceScore.innerText = `${review.audience}%`;

    const tomatoMeterIcon = card.querySelector('.score.tomatometer img') as HTMLElement;
    const audienceIcon = card.querySelector('.score.audience img') as HTMLElement;

    tomatoMeterIcon.setAttribute('src', review.tomatoMeterIcon);
    audienceIcon.setAttribute('src', review.audienceIcon);
  };

  const positionToolTipToProgressbar = (card: HTMLElement) => {
    card.addEventListener('mouseenter', () => {
      setTimeout(() => {
        const scoresProgress = card.querySelectorAll('.score-progress');

        for (const scoreProgress of scoresProgress as NodeListOf<HTMLElement>) {
          const tooltip = scoreProgress.querySelector('.score-tooltip') as HTMLElement;
          const progressBar = scoreProgress.querySelector('progress') as any;

          const value = progressBar.value - (tooltip.offsetWidth / card.offsetWidth) * 100;
          const translation = progressBar.offsetWidth * (value / 100);

          tooltip.style.transform = `translate(${translation}px)`;
        }
      }, 520);
    });
  };

  const reviewCardContainer = document.createElement('div');

  reviewCardContainer.innerHTML = reviewCard.default;

  applyScore(review, reviewCardContainer.firstChild as HTMLElement);
  positionToolTipToProgressbar(reviewCardContainer.firstChild as HTMLElement);

  return reviewCardContainer;
};

export default ReviewCardSmall;
