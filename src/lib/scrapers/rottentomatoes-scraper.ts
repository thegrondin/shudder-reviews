import log from '../log';

const SEARCH_URI = 'https://www.rottentomatoes.com/search?search=';

interface SearchResult {
  link: string;
  releaseYear: number;
  title: string;
}

interface Review {
  tomatoMeter: number;
  tomatoMeterIcon: string;
  audience: number;
  audienceIcon: string;
}

const scrapeSearchResults = (rawData: string): SearchResult[] => {
  const body = new DOMParser().parseFromString(rawData, 'text/html').body;
  const searchPageResults = body.querySelectorAll('search-page-result search-page-media-row');
  const searchResults: SearchResult[] = [];

  for (const result of searchPageResults) {
    const link = result.querySelector('a.unset').attributes.getNamedItem('href').value;
    const releaseYear = parseInt(result.attributes.getNamedItem('releaseyear').value);
    const title = result.querySelector('a.unset img').attributes.getNamedItem('alt').value;

    searchResults.push({
      link,
      title,
      releaseYear,
    });
  }

  return searchResults;
};

const scrapeReview = (rawData: string): Review => {
  const body = new DOMParser().parseFromString(rawData, 'text/html').body;

  const scoreBoardAttributes = body.querySelector('score-board').attributes;

  const tomatoMeter = parseInt(scoreBoardAttributes.getNamedItem('tomatometerscore').value);
  const audience = parseInt(scoreBoardAttributes.getNamedItem('audiencescore').value);

  return {
    tomatoMeter,
    tomatoMeterIcon:
      'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-fresh.149b5e8adc3.svg',
    audience,
    audienceIcon:
      'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-rotten.f1ef4f02ce3.svg',
  };
};

const searchScraper = async (term: string): Promise<void | SearchResult[]> => {
  log(`${SEARCH_URI}${term}`);
  try {
    const response = await fetch(`${SEARCH_URI}${term}`);
    const raw = await response.text();
    return scrapeSearchResults(raw);
  } catch (err) {
    log(err);
  }
};

const reviewScraper = async (href: string): Promise<void | Review> => {
  try {
    const response = await fetch(href);
    const raw = await response.text();
    return scrapeReview(raw);
  } catch (err) {
    log(err);
  }
};

const rottenTomatoesSummaryScraper = async (title: string): Promise<void | Review> => {
  const searchResult = searchScraper(title);

  const results = await searchResult;
  const result = results[0];
  return await reviewScraper(result.link);
};

export { searchScraper, reviewScraper, rottenTomatoesSummaryScraper };
export type { SearchResult as TomatoSearchResult, Review as TomatoReview };
