import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CharacterByUrlPipe } from './character-by-url.pipe';
import { ICharacter } from '@core/interfaces/character';

describe('CharacterByUrlPipe', () => {
  let pipe: CharacterByUrlPipe;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: MockStore;
  const initialState = {
    app: {
      charactersUrlToDetailsMap: new Map<string, ICharacter>([
        [
          'https://www.swapi.tech/api/people/1',
          {
            uid: '1',
            properties: {
              name: 'Luke Skywalker',
              height: '172',
              mass: '77',
              hair_color: 'blond',
              skin_color: 'fair',
              eye_color: 'blue',
              birth_year: '19BBY',
              gender: 'male',
              created: '2014-12-09T13:50:51.644000Z',
              edited: '2014-12-20T21:17:56.891000Z',
              homeworld: 'https://www.swapi.tech/api/planets/1',
              url: 'https://www.swapi.tech/api/people/1',
            },
          },
        ],
      ]),
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CharacterByUrlPipe, provideMockStore({ initialState })],
    });
    pipe = TestBed.inject(CharacterByUrlPipe);
    store = TestBed.inject(MockStore);
  });

  it('should transform value to character list', done => {
    const urls = ['https://www.swapi.tech/api/people/1'];
    pipe.transform(urls).subscribe(characters => {
      expect(characters.length).toBe(1);
      expect(characters[0].properties.name).toBe('Luke Skywalker');
      done();
    });
  });
});
