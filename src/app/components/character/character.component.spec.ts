import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterComponent } from './character.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { Store } from '@ngrx/store';
import { SpinnerService } from '@core/services/spinner.service';
import { IMovie } from '@core/interfaces/movie';
import { ICharacter } from '@core/interfaces/character';
import { loadCharacters } from '@store/actions';
import { MovieByUrlPipe } from '@pipes/movie-by-url.pipe';
import { BASE_URL } from '@core/services/api.service';

describe('CharacterComponent', () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;
  let store: MockStore;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let spinnerService: SpinnerService;
  const loadingSubject = new BehaviorSubject<boolean>(false);

  const character: ICharacter = {
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

  const initialState = {
    app: {
      movies: [],
      moviesIdToDetailsMap: new Map<string, IMovie>(),
      charactersUrlToDetailsMap: new Map<string, ICharacter>([
        ['https://www.swapi.tech/api/people/1', character],
      ]),
      charactersUrlToMovieMap: new Map<string, IMovie[]>(),
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        AsyncPipe,
        JsonPipe,
        NgForOf,
        NgIf,
        MatChip,
        MatChipSet,
        MovieByUrlPipe,
        CharacterComponent,
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: () => '1',
            }),
          },
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

    fixture = TestBed.createComponent(CharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select character details from the store', done => {
    component.character$.subscribe(character => {
      const expectedUrl = `${BASE_URL}/people/1`;
      expect(store.dispatch).toHaveBeenCalledWith(
        loadCharacters({ urlList: [expectedUrl] })
      );
      expect(character).toEqual(character);
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
