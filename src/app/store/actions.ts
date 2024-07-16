import { createAction, props } from '@ngrx/store';
import { IMovie, IMovieSummary } from '@core/interfaces/movie';
import { ICharacter } from '@core/interfaces/character';

export const appInit = createAction('[App] Init');

export const loadMovies = createAction('[App] Load Movies');

export const loadMoviesSuccess = createAction(
  '[API] Load Movies Success',
  props<{ movies: IMovie[] }>()
);

export const loadCharacters = createAction(
  '[App] Load Characters',
  props<{ urlList: string[] }>()
);

export const loadCharactersSuccess = createAction(
  '[API] Load Characters Success',
  props<{ characters: ICharacter[] }>()
);

export const setCharacterToMovieMap = createAction(
  '[App] Set Characters Movie Map',
  props<{ charactersUrlToMovieMap: Map<string, IMovieSummary[]> }>()
);
