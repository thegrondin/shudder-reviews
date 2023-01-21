import RouteUtility, { Route } from './utils/RouteUtility';
import { tailwind } from './utils/tailwind';

tailwind.appendTailwindToHead(document);

const route: Route = RouteUtility.getRoute(RouteUtility.getCurrentURL());

if (route) {
  const component = route.component({
    tomatoMeter: 85,
    tomatoMeterIcon:
      'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-fresh.149b5e8adc3.svg',
    audience: 30,
    audienceIcon:
      'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-rotten.f1ef4f02ce3.svg',
  });

  const overlay = document.querySelector('.movie-card__overlay');
  overlay.prepend(component);
}
