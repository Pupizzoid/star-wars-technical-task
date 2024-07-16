import { Action, createReducer, on } from '@ngrx/store';
import {
  loadCharactersSuccess,
  loadMoviesSuccess,
  setCharacterToMovieMap,
} from './actions';
import { IMovie, IMovieSummary } from '@core/interfaces/movie';
import { ICharacter } from '@core/interfaces/character';

export interface AppState {
  movies: IMovie[];
  moviesIdToDetailsMap: Map<string, IMovie>;
  charactersUrlToDetailsMap: Map<string, ICharacter>;
  charactersUrlToMovieMap: Map<string, IMovieSummary[]>;
}

export const initialState: AppState = {
  movies: [],
  moviesIdToDetailsMap: new Map<string, IMovie>(),
  charactersUrlToDetailsMap: new Map<string, ICharacter>(),
  charactersUrlToMovieMap: new Map(),
};

const _rootReducer = createReducer(
  initialState,
  on(loadMoviesSuccess, (state, { movies }) => {
    return {
      ...state,
      movies,
      moviesIdToDetailsMap: movies.reduce((acc, obj) => {
        acc.set(obj.uid, obj);
        return acc;
      }, new Map<string, IMovie>()),
    };
  }),
  on(loadCharactersSuccess, (state, { characters }) => {
    return {
      ...state,
      charactersUrlToDetailsMap: characters.reduce((acc, obj) => {
        acc.set(obj.properties.url, obj);
        return acc;
      }, new Map(state.charactersUrlToDetailsMap)),
    };
  }),
  on(setCharacterToMovieMap, (state, { charactersUrlToMovieMap }) => ({
    ...state,
    charactersUrlToMovieMap,
  }))
);

export const rootReducer = (state: AppState | undefined, action: Action) =>
  _rootReducer(state, action);
