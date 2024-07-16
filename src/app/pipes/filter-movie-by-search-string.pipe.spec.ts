import { FilterMovieBySearchStringPipe } from './filter-movie-by-search-string.pipe';

describe('FilterMovieBySearchStringPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterMovieBySearchStringPipe();
    expect(pipe).toBeTruthy();
  });
});
