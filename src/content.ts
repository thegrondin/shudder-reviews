import ReviewCardLarge from './components/ReviewCardLarge';
import ReviewCardSmall from './components/ReviewCardSmall';
import TomatoScraper from './lib/scrapers/TomatoScraper';
import RouteUtility, { Route } from './utils/RouteUtility';
import { tailwind } from './utils/tailwind';

tailwind.appendTailwindToHead(document);

const uriComponentMapping = [
  {
    uris: ['https://www.shudder.com/movies/watch'],
    scraper: TomatoScraper,
    component: ReviewCardLarge,
    linker: (component) => {
      const movieDescription: HTMLElement = document.querySelector('.detail-page__description');

      movieDescription.appendChild(component(route.scraper, 'Let the Wrong One In'));
    },
  },
  {
    uris: ['https://www.shudder.com/movies'],
    scraper: TomatoScraper,
    component: ReviewCardSmall,
    linker: (component) => {
      const cardWrapper: NodeListOf<HTMLElement> = document.querySelectorAll('.movie-card-wrapper');

      for (const wrapper of cardWrapper) {
        const title: string = JSON.parse(wrapper.getAttribute('data-track-set'))['Media Title'];
        wrapper.querySelector('.movie-card__overlay').prepend(component(route.scraper, title));
      }
    },
  },
];

const route: Route = RouteUtility.getRoute(RouteUtility.getCurrentURL(), uriComponentMapping);

if (route) {
  route.linker(route.component);
}
