import log from '../log';

const SEARCH_URI = 'https://www.rottentomatoes.com/search?search=';

interface SearchResult {
  link: string;
  releaseYear: number;
  title: string;
}

interface Review {
  score: number;
  icon: string;
  count: number;
}

interface TomatoResult {
  tomatoMeter: Review;
  audience: Review;
  link: string;
}

const scrapeSearch = (rawData: string): SearchResult[] => {
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

const scrapeResult = (rawData: string): TomatoResult => {
  const body = new DOMParser().parseFromString(rawData, 'text/html').body;

  const scoreBoardAttributes = body.querySelector('score-board').attributes;

  const tomatoMeter = parseInt(scoreBoardAttributes.getNamedItem('tomatometerscore').value);
  const audience = parseInt(scoreBoardAttributes.getNamedItem('audiencescore').value);

  return {
    tomatoMeter: {
      score: tomatoMeter,
      icon:
        'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-fresh.149b5e8adc3.svg',
      count: 0,
    } as Review,
    audience: {
      score: audience,
      icon:
        'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-rotten.f1ef4f02ce3.svg',
      count: 0,
    } as Review,
    link: '',
  };
};

const searchScraper = async (term: string): Promise<void | SearchResult[]> => {
  log(`${SEARCH_URI}${term}`);
  try {
    const response = await fetch(`${SEARCH_URI}${term}`);
    const raw = await response.text();
    return scrapeSearch(raw);
  } catch (err) {
    log(err);
  }
};

const resultScraper = async (href: string): Promise<void | TomatoResult> => {
  try {
    const response = await fetch(href);
    const raw = await response.text();
    return scrapeResult(raw);
  } catch (err) {
    log(err);
  }
};

const scrapeSummary = async (title: string): Promise<void | TomatoResult> => {
  const searchResult = searchScraper(title);
  const results = await searchResult;
  log(title);
  log(results);
  const result = results[0];
  return await resultScraper(result.link);
};

const TomatoScraper = {
  scrapeSummary,
};

export default TomatoScraper;
export type { SearchResult as TomatoSearchResult, Review, TomatoResult };
