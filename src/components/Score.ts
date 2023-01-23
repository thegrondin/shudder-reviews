import { Review } from '../lib/scrapers/rottentomatoes-scraper';
import Utils from '../utils/Utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const score = require('./score.html');

const Score = (review?: Review): HTMLElement => {
  const apply = (review: Review, score: HTMLElement) => {
    const scoreProgress = score.querySelector('.score-progress progress') as HTMLElement;
    const scoreTooltip = score.querySelector('.score-tooltip p') as HTMLElement;
    const scoreIcon = score.querySelector('img') as HTMLElement;

    scoreProgress.setAttribute('value', review.score.toString());
    scoreTooltip.innerText = `${review.score}%`;
    scoreIcon.setAttribute('src', review.icon);
  };

  const positionToolTip = (score: HTMLElement) => {
    const scoreProgress = score.querySelector('.score-progress progress') as any;
    const scoreTooltip = score.querySelector('.score-tooltip') as HTMLElement;

    const value = scoreProgress.value - (scoreTooltip.offsetWidth / score.offsetWidth) * 100;
    const translation = scoreProgress.offsetWidth * (value / 100);

    scoreTooltip.style.transform = `translate(${translation}px)`;
  };

  const scoreContainer = document.createElement('div');
  scoreContainer.innerHTML = score.default;

  const scoreElement = scoreContainer.querySelector('.score') as HTMLElement;

  if (review) {
    apply(review, scoreElement);

    Utils.waitForElement('.score').then(() => {
      setTimeout(() => {
        positionToolTip(scoreElement);
      }, 600);
    });
  }

  return scoreElement as HTMLElement;
};

export default Score;
