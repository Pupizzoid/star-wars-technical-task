import { Pipe, PipeTransform } from '@angular/core';
import { IMovie } from '@core/interfaces/movie';
import { delay, map, Observable } from 'rxjs';

@Pipe({
  name: 'filterMovieBySearchString',
  standalone: true,
})
export class FilterMovieBySearchStringPipe implements PipeTransform {
  transform(
    movies: Observable<IMovie[]>,
    searchStrig: string
  ): Observable<IMovie[]> {
    if (!searchStrig) {
      return movies;
    }
    return movies.pipe(
      delay(200),
      map(movies =>
        movies.filter(movie =>
          movie.properties.title
            .toLowerCase()
            .includes(searchStrig.toLowerCase())
        )
      )
    );
  }
}
