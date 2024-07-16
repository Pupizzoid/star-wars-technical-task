import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { Store } from '@ngrx/store';
import { MovieComponent } from './movie.component';
import { SpinnerService } from '@core/services/spinner.service';
import { IMovie } from '@core/interfaces/movie';
import { CharacterByUrlPipe } from '@pipes/character-by-url.pipe';
import { loadCharacters } from '@store/actions';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let store: MockStore;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let spinnerService: SpinnerService;
  const loadingSubject = new BehaviorSubject<boolean>(false);

  const movie: IMovie = {
    uid: '1',
    properties: {
      title: 'A New Hope',
      opening_crawl: 'It is a period of civil war...',
      director: 'George Lucas',
      producer: 'Gary Kurtz, Rick McCallum',
      release_date: '1977-05-25',
      characters: [
        'https://www.swapi.tech/api/people/1',
        'https://www.swapi.tech/api/people/2',
      ],
      url: 'https://www.swapi.tech/api/films/1',
    },
  };

  const initialState = {
    app: {
      movies: [movie],
      moviesIdToDetailsMap: new Map<string, IMovie>([['1', movie]]),
      charactersUrlToDetailsMap: new Map(),
      charactersUrlToMovieMap: new Map(),
    },
  };

  const mockRoute = {
    paramMap: of({
      get: () => '1', // mock the id parameter
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        AsyncPipe,
        JsonPipe,
        NgForOf,
        NgIf,
        MatListModule,
        MatProgressSpinnerModule,
        MatChipSet,
        MatChip,
        CharacterByUrlPipe,
        MovieComponent,
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: mockRoute,
        },
        {
          provide: SpinnerService,
          useValue: {
            loading$: loadingSubject.asObservable(),
            increment: jasmine.createSpy(),
            decrement: jasmine.createSpy(),
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    spinnerService = TestBed.inject(SpinnerService);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select movie details from the store', done => {
    component.movie$.subscribe(movieDetails => {
      expect(movieDetails).toEqual(movie);
      const expectedUrls = movie.properties.characters;
      expect(store.dispatch).toHaveBeenCalledWith(
        loadCharacters({ urlList: expectedUrls })
      );
      done();
    });
  });

  it('should hide element with class "example-card" when loading$ is true', () => {
    loadingSubject.next(true);
    fixture.detectChanges();
    const cardElement = fixture.nativeElement.querySelector('.example-card');
    expect(cardElement).toBeFalsy();
  });

  it('should show element with class "example-card" when loading$ is false', () => {
    loadingSubject.next(false);
    fixture.detectChanges();
    const cardElement = fixture.nativeElement.querySelector('.example-card');
    expect(cardElement).toBeTruthy();
  });
});
