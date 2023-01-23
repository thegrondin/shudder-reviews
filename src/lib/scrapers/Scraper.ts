interface Review {
  name: string;
  score: number;
  icon: string;
  count: number;
}

interface ScrapeResult {
  reviews: Review[];
  link: string;
}

interface Scraper {
  getResult(title: string): Promise<void | ScrapeResult>;
}

export type { Review, ScrapeResult, Scraper };
