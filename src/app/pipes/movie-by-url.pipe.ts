import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { IMovieSummary } from '@core/interfaces/movie';
import { selectCharacterMovieList } from '@store/selectors';

@Pipe({
  name: 'movieByUrl',
  standalone: true,
})
export class MovieByUrlPipe implements PipeTransform {
  constructor(private store: Store) {}

  transform(value: string): Observable<IMovieSummary[]> {
    return this.store.select(selectCharacterMovieList(value)).pipe(
      filter(
        (movies: IMovieSummary[] | undefined): movies is IMovieSummary[] =>
          !!movies
      ),
      map((movies: IMovieSummary[]) => movies.map(movie => movie))
    );
  }
}
