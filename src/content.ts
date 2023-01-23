import ReviewCardSmall from './components/ReviewCardSmall';
import TomatoScraper from './lib/scrapers/TomatoScraper';
import RouteUtility, { Route } from './utils/RouteUtility';
import { tailwind } from './utils/tailwind';

tailwind.appendTailwindToHead(document);

const uriComponentMapping = [
  {
    uris: ['https://www.shudder.com/movies'],
    scraper: TomatoScraper,
    component: ReviewCardSmall,
  },
];

const route: Route = RouteUtility.getRoute(RouteUtility.getCurrentURL(), uriComponentMapping);

if (route) {
  const cardWrapper: NodeListOf<HTMLElement> = document.querySelectorAll('.movie-card-wrapper');

  for (const wrapper of cardWrapper) {
    const title: string = JSON.parse(wrapper.getAttribute('data-track-set'))['Media Title'];
    const component = route.component(route.scraper, title);

    wrapper.querySelector('.movie-card__overlay').prepend(component);
  }
}
