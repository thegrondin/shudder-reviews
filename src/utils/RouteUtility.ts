import { TomatoResult } from '../lib/scrapers/rottentomatoes-scraper';

interface Route {
  uri: string;
  scraper: (title: string) => Promise<void | TomatoResult>;
  component: (scraper: (title: string) => Promise<void | TomatoResult>, title: string) => HTMLElement;
}

interface UriComponentMapping {
  uris: string[];
  scraper: (title: string) => Promise<void | TomatoResult>;
  component: (scraper: (title: string) => Promise<void | TomatoResult>, title: string) => HTMLElement;
}

const getCurrentURL = (): string => {
  return window.location.href;
};

const getRoute = (uri: string, mapping: UriComponentMapping[]) => {
  const target = mapping.find((m) => {
    return m.uris.includes(uri);
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
