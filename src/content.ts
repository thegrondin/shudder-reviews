import ReviewCardLarge from './components/ReviewCardLarge';
import ReviewCardSmall from './components/ReviewCardSmall';
import TomatoScraper from './lib/scrapers/TomatoScraper';
import RouteUtility, { Route, UriComponentMapping } from './utils/RouteUtility';
import { tailwind } from './utils/tailwind';

tailwind.appendTailwindToHead(document);

const uriComponentMapping: UriComponentMapping[] = [
  {
    uris: ['https://www.shudder.com/movies/watch'],
    scraper: TomatoScraper,
    component: ReviewCardLarge,
    linker: (component, scraper) => {
      const movieDescription: HTMLElement = document.querySelector('.detail-page__description');
      movieDescription.appendChild(component(scraper, 'Let the Wrong One In'));
    },
  },
  {
    uris: ['https://www.shudder.com/movies'],
    scraper: TomatoScraper,
    component: ReviewCardSmall,
    linker: (component, scraper) => {
      const cardWrapper: NodeListOf<HTMLElement> = document.querySelectorAll('.movie-card-wrapper');

      for (const wrapper of cardWrapper) {
        const title: string = JSON.parse(wrapper.getAttribute('data-track-set'))['Media Title'];
        wrapper.querySelector('.movie-card__overlay').prepend(component(scraper, title));
      }
    },
  },
];

const route: Route = RouteUtility.getRoute(RouteUtility.getCurrentURL(), uriComponentMapping);

if (route) {
  route.linker(route.component, route.scraper);
}
