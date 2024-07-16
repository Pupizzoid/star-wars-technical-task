export interface IMovie {
  uid: string;
  properties: {
    title: string;
    producer: string;
    director: string;
    release_date: string;
    opening_crawl: string;
    characters: string[];
    url: string;
  };
}

export type IMovieSummary = Pick<IMovie, 'uid'> & {
  title: IMovie['properties']['title'];
};
