import { Scraper } from '../lib/scrapers/Scraper';

interface MappingBase {
  scraper: new (name: string) => Scraper;
  component: (scraper: new (name: string) => Scraper, wrapper: string) => HTMLElement;
  linker: (component) => void;
}

interface Route extends MappingBase {
  uri: string;
}

interface UriComponentMapping extends MappingBase {
  uris: string[];
}

const getCurrentURL = (): string => {
  return window.location.href;
};

const getRoute = (uri: string, mapping: UriComponentMapping[]) => {
  const target = mapping.find((m) => {
    return m.uris.find((u) => {
      return uri.startsWith(u);
    });
  });

  return {
    uri,
    scraper: target.scraper,
    component: target.component,
    linker: target.linker,
  } as Route;
};

const RouteUtility = {
  getCurrentURL,
  getRoute,
};

export default RouteUtility;
export type { Route };
