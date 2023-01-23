import log from '../log';
import { Review, Scraper, ScrapeResult } from './Scraper';

interface TomatoSearchResult {
  link: string;
  releaseYear: number;
  title: string;
}

class TomatoScraper implements Scraper {
  private searchUri: string;

  constructor(searchUri: string) {
    this.searchUri = searchUri;
  }

  private scrapeSearch = (rawData: string): TomatoSearchResult[] => {
    const body = new DOMParser().parseFromString(rawData, 'text/html').body;
    const searchPageResults = body.querySelectorAll('search-page-result search-page-media-row');
    const searchResults: TomatoSearchResult[] = [];

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

  private scrapeResult = (rawData: string): ScrapeResult => {
    const body = new DOMParser().parseFromString(rawData, 'text/html').body;

    const scoreBoardAttributes = body.querySelector('score-board').attributes;

    const tomatoMeter = parseInt(scoreBoardAttributes.getNamedItem('tomatometerscore').value);
    const audience = parseInt(scoreBoardAttributes.getNamedItem('audiencescore').value);

    return {
      reviews: [
        {
          name: 'TomatoMeter',
          score: tomatoMeter,
          icon:
            'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-fresh.149b5e8adc3.svg',
          count: 0,
        } as Review,
        {
          name: 'Audience',
          score: audience,
          icon:
            'https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-rotten.f1ef4f02ce3.svg',
          count: 0,
        } as Review,
      ],
      link: 'https://www.rottentomatoes.com/',
    } as ScrapeResult;
  };

  private searchScraper = async (term: string): Promise<void | TomatoSearchResult[]> => {
    log(`${this.searchUri}${term}`);
    try {
      const response = await fetch(`${this.searchUri}${term}`);
      const raw = await response.text();
      return this.scrapeSearch(raw);
    } catch (err) {
      log(err);
    }
  };

  private resultScraper = async (href: string): Promise<void | ScrapeResult> => {
    try {
      const response = await fetch(href);
      const raw = await response.text();
      return this.scrapeResult(raw);
    } catch (err) {
      log(err);
    }
  };

  public async getResult(title: string): Promise<void | ScrapeResult> {
    const searchResult = this.searchScraper(title);
    const results = await searchResult;
    log(title);
    log(results);
    const result = results[0];
    return await this.resultScraper(result.link);
  }
}

export default TomatoScraper;
