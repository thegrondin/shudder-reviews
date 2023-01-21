import ReviewCardSmall from '../components/ReviewCardSmall';
import { rottenTomatoesSummaryScraper, TomatoReview } from '../lib/scrapers/rottentomatoes-scraper';

interface Route {
  uri: string;
  scraper: (title: string) => Promise<void | TomatoReview>;
  component: (review: TomatoReview) => HTMLElement;
}

const uriComponentMapping = [
  {
    uris: ['https://www.shudder.com/movies'],
    scraper: rottenTomatoesSummaryScraper,
    component: ReviewCardSmall,
  },
];

const getCurrentURL = () => {
  return window.location.href;
};

const getRoute = (uri) => {
  const target = uriComponentMapping.find((mapping) => {
    return mapping.uris.includes(uri);
  });

  return {
    uri,
    scraper: target.scraper,
    component: target.component,
  } as Route;
};

const RouteUtility = {
  getCurrentURL,
  getRoute,
};

export default RouteUtility;
export type { Route };
