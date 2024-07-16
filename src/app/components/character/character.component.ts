import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup,
} from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { filter, map, Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { MovieByUrlPipe } from '@pipes/movie-by-url.pipe';
import { BASE_URL } from '@core/services/api.service';
import { SpinnerService } from '@core/services/spinner.service';
import { loadCharacters } from '@store/actions';
import { selectCharacterDetails } from '@store/selectors';
import { trackByFn } from '@core/utils/trackBy';
import { ICharacter } from '@core/interfaces/character';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatCardTitleGroup,
    NgForOf,
    NgIf,
    RouterLink,
    JsonPipe,
    MatChip,
    MatChipSet,
    MovieByUrlPipe,
  ],
  templateUrl: './character.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterComponent {
  id: InputSignal<string> = input.required<string>();

  character$: Observable<ICharacter> = toObservable(this.id).pipe(
    switchMap((id: string) => {
      const url = `${BASE_URL}/people/${id}`;
      this.store.dispatch(loadCharacters({ urlList: [url] }));
      return this.store.select(selectCharacterDetails(url));
    }),
    filter((character): character is ICharacter => !!character),
    map(character => character)
  );

  isLoading$: Observable<boolean> = this.spinnerService.loading$;

  constructor(
    private store: Store,
    private spinnerService: SpinnerService
  ) {}

  protected readonly trackByFn = trackByFn;
}
