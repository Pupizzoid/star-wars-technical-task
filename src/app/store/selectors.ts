import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './reducers';

export const selectAppState = createFeatureSelector<AppState>('app');
export const selectMovies = createSelector(
  selectAppState,
  (state: AppState) => state.movies
);

export const selectMovieDetails = (id: string) =>
  createSelector(selectAppState, (state: AppState) =>
    state.moviesIdToDetailsMap.get(id)
  );

export const selectCharacters = createSelector(
  selectAppState,
  (state: AppState) => state.charactersUrlToDetailsMap
);

export const selectCharacterDetails = (url: string) =>
  createSelector(selectAppState, (state: AppState) =>
    state.charactersUrlToDetailsMap.get(url)
  );

export const selectCharactersByUrl = (urls: string[]) =>
  createSelector(selectAppState, (state: AppState) =>
    urls.map(url => state.charactersUrlToDetailsMap.get(url))
  );

export const selectCharacterMovieList = (url: string) =>
  createSelector(selectAppState, (state: AppState) =>
    state.charactersUrlToMovieMap.get(url)
  );

