import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, JsonPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { MovieComponent } from '../movie/movie.component';
import { RouterLink } from '@angular/router';
import { MatList, MatListItem } from '@angular/material/list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardTitle,
  MatCardTitleGroup,
} from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';
import { trackByFn } from '@core/utils/trackBy';
import { selectMovies } from '@store/selectors';
import { Observable } from 'rxjs';
import { IMovie } from '@core/interfaces/movie';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FilterMovieBySearchStringPipe } from '@pipes/filter-movie-by-search-string.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    MovieComponent,
    NgFor,
    MatListItem,
    MatList,
    MatProgressSpinner,
    RouterLink,
    MatCardHeader,
    MatCardTitle,
    MatCardTitleGroup,
    MatCardActions,
    MatCard,
    MatButton,
    JsonPipe,
    ReactiveFormsModule,
    MatFormField,
    MatIcon,
    FormsModule,
    MatInput,
    MatIconButton,
    MatFormFieldModule,
    FilterMovieBySearchStringPipe,
    NgStyle,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  movies$: Observable<IMovie[]> = this.store.select(selectMovies);
  searchValue = signal('');

  constructor(private store: Store) {}

  protected readonly trackByFn = trackByFn;

  changeSearchRequest(event: Event): void {
    this.searchValue.set((event.target as HTMLInputElement).value);
  }

  clear(): void {
    this.searchValue.set('');
  }
}
