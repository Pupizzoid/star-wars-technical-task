import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import {
  catchError,
  EMPTY,
  map,
  mergeMap,
  Observable,
  switchMap,
  take,
  zip,
} from 'rxjs';
import {
  appInit,
  loadCharacters,
  loadCharactersSuccess,
  loadMovies,
  loadMoviesSuccess,
  setCharacterToMovieMap,
} from './actions';
import { selectCharacters } from './selectors';
import { ApiService } from '@core/services/api.service';
import { ICharacter } from '@core/interfaces/character';
import { IMovie, IMovieSummary } from '@core/interfaces/movie';

@Injectable()
export class AppEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store
  ) {}

  ngrxOnInitEffects(): Action {
    return appInit();
  }

  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appInit),
      map(() => loadMovies())
    );
  });

  loadMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMovies),
      mergeMap(() => {
        return this.apiService.getMovies().pipe(
          map((movies: IMovie[]) => {
            return loadMoviesSuccess({ movies });
          }),
          catchError(() => EMPTY)
        );
      })
    );
  });

  loadCharacters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCharacters),
      switchMap(action =>
        this.store.select(selectCharacters).pipe(
          take(1),
          map((characters: Map<string, ICharacter>) => ({ action, characters }))
        )
      ),
      mergeMap(({ action, characters }) => {
        const movieCharacters = action.urlList;
        const requestList = movieCharacters.reduce((acc, url) => {
          if (!characters.has(url)) {
            acc.push(this.apiService.getCharacter(url));
          }
          return acc;
        }, [] as Observable<ICharacter>[]);
        return zip(requestList).pipe(
          map(characters => loadCharactersSuccess({ characters })),
          catchError(() => EMPTY)
        );
      })
    );
  });

  loadCharacterMoviesList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMoviesSuccess),
      map(({ movies }) => {
        const charactersUrlToMovieMap = new Map<string, IMovieSummary[]>();
        movies.forEach((movie: IMovie) => {
          const movieData: IMovieSummary = {
            uid: movie.uid,
            title: movie.properties.title,
          };
          const characters = movie.properties.characters;
          characters.forEach((characterUrl: string) => {
            if (!charactersUrlToMovieMap.has(characterUrl)) {
              charactersUrlToMovieMap.set(characterUrl, []);
            }
            charactersUrlToMovieMap.get(characterUrl)?.push(movieData);
          });
        });
        return setCharacterToMovieMap({ charactersUrlToMovieMap });
      })
    );
  });
}
