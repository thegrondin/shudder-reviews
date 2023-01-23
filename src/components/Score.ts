import { Review } from '../lib/scrapers/rottentomatoes-scraper';
import Utils from '../utils/Utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const score = require('./score.html');

const Score = (review?: Review): HTMLElement => {
  const apply = (review: Review, score: HTMLElement) => {
    const scoreProgress: HTMLElement = score.querySelector('.score-progress progress');
    const scoreTooltip: HTMLElement = score.querySelector('.score-tooltip p');
    const scoreIcon: HTMLElement = score.querySelector('img');

    scoreProgress.setAttribute('value', review.score.toString());
    scoreTooltip.innerText = `${review.score}%`;
    scoreIcon.setAttribute('src', review.icon);
  };

  const positionToolTip = (score: HTMLElement) => {
    const scoreProgress: HTMLElement = score.querySelector('.score-progress progress');
    const scoreTooltip: HTMLElement = score.querySelector('.score-tooltip');

    const value = parseInt(scoreProgress.getAttribute('value')) - (scoreTooltip.offsetWidth / score.offsetWidth) * 100;
    const translation = scoreProgress.offsetWidth * (value / 100);

    scoreTooltip.style.transform = `translate(${translation}px)`;
  };

  const scoreContainer: HTMLElement = document.createElement('div');
  scoreContainer.innerHTML = score.default;

  const scoreElement: HTMLElement = scoreContainer.querySelector('.score');

  if (review) {
    apply(review, scoreElement);

    Utils.waitForElement('.score').then(() => {
      setTimeout(() => {
        positionToolTip(scoreElement);
      }, 600);
    });
  }

  return scoreElement;
};

export default Score;
