import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { ICharacter } from '@core/interfaces/character';
import { selectCharactersByUrl } from '@store/selectors';

@Pipe({
  name: 'characterByUrl',
  standalone: true,
})
export class CharacterByUrlPipe implements PipeTransform {
  constructor(private store: Store) {}

  transform(value: string[]): Observable<ICharacter[]> {
    return this.store.select(selectCharactersByUrl(value)).pipe(
      filter(
        (characters: (ICharacter | undefined)[]): characters is ICharacter[] =>
          !!characters
      ),
      map((characters: ICharacter[]) => characters)
    );
  }
}
