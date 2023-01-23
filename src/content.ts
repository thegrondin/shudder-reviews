import RouteUtility, { Route } from './utils/RouteUtility';
import { tailwind } from './utils/tailwind';

tailwind.appendTailwindToHead(document);

const route: Route = RouteUtility.getRoute(RouteUtility.getCurrentURL());

if (route) {
  const overlays = document.querySelectorAll('.movie-card-wrapper');

  for (const element of overlays as NodeListOf<HTMLElement>) {
    const title = JSON.parse(element.getAttribute('data-track-set'))['Media Title'];
    const component = route.component(route.scraper, title);

    element.querySelector('.movie-card__overlay').prepend(component);
  }
}
