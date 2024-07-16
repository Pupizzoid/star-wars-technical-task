import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { filter, map, Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { MatList, MatListItem } from '@angular/material/list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { SpinnerService } from '@core/services/spinner.service';
import { selectMovieDetails } from '@store/selectors';
import { IMovie } from '@core/interfaces/movie';
import { loadCharacters } from '@store/actions';
import { CharacterByUrlPipe } from '@pipes/character-by-url.pipe';
import { trackByFn } from '@core/utils/trackBy';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    MatCardModule,
    AsyncPipe,
    NgIf,
    JsonPipe,
    MatList,
    MatListItem,
    RouterLink,
    NgForOf,
    MatProgressSpinner,
    MatChipSet,
    MatChip,
    CharacterByUrlPipe,
  ],
  templateUrl: './movie.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent {
  id: InputSignal<string> = input.required<string>();

  movie$: Observable<IMovie> = toObservable(this.id).pipe(
    switchMap((id: string) => {
      return this.store.select(selectMovieDetails(id));
    }),
    filter((movie): movie is IMovie => !!movie),
    map(movie => {
      this.store.dispatch(
        loadCharacters({ urlList: movie.properties.characters })
      );
      return movie;
    })
  );

  isLoading$: Observable<boolean> = this.spinnerService.loading$;

  constructor(
    private store: Store,
    private spinnerService: SpinnerService
  ) {}

  protected readonly trackByFn = trackByFn;
}
