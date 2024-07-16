import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService, BASE_URL } from './api.service';
import { IMovie } from '../interfaces/movie';
import { ICharacter } from '../interfaces/character';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch movies', () => {
    const mockMovies: IMovie[] = [
      {
        uid: '1',
        properties: {
          url: '',
          title: 'A New Hope',
          opening_crawl: 'It is a period of civil war...',
          director: 'George Lucas',
          producer: 'Gary Kurtz, Rick McCallum',
          release_date: '1977-05-25',
          characters: ['https://www.swapi.tech/api/people/1'],
        },
      },
      {
        uid: '2',
        properties: {
          url: '',
          title: 'The Empire Strikes Back',
          opening_crawl: 'It is a dark time for the Rebellion...',
          director: 'Irvin Kershner',
          producer: 'Gary Kurtz, Rick McCallum',
          release_date: '1980-05-17',
          characters: ['https://www.swapi.tech/api/people/2'],
        },
      },
    ];

    service.getMovies().subscribe(movies => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne(`${BASE_URL}/films/`);
    expect(req.request.method).toBe('GET');
    req.flush({ result: mockMovies });
  });

  it('should fetch character', () => {
    const mockCharacter: ICharacter = {
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
    };

    const characterUrl = `${BASE_URL}/people/1`;

    service.getCharacter(characterUrl).subscribe(character => {
      expect(character).toEqual(mockCharacter);
    });

    const req = httpMock.expectOne(characterUrl);
    expect(req.request.method).toBe('GET');
    req.flush({ result: mockCharacter });
  });
});
