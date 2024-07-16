import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MovieByUrlPipe } from './movie-by-url.pipe';
import { IMovieSummary } from '@core/interfaces/movie';

describe('MovieByUrlPipe', () => {
  let pipe: MovieByUrlPipe;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: MockStore;
  const initialState = {
    app: {
      charactersUrlToMovieMap: new Map<string, IMovieSummary[]>([
        [
          'https://www.swapi.tech/api/people/1',
          [
            { uid: '1', title: 'A New Hope' },
            { uid: '2', title: 'The Empire Strikes Back' },
          ],
        ],
      ]),
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieByUrlPipe, provideMockStore({ initialState })],
    });
    pipe = TestBed.inject(MovieByUrlPipe);
    store = TestBed.inject(MockStore);
  });

  it('should transform value to movie list', done => {
    const url = 'https://www.swapi.tech/api/people/1';
    pipe.transform(url).subscribe(movies => {
      expect(movies.length).toBe(2);
      expect(movies[0].title).toBe('A New Hope');
      expect(movies[1].title).toBe('The Empire Strikes Back');
      done();
    });
  });
});
