import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private loadingCounter = new BehaviorSubject<number>(0);
  loading$: Observable<boolean> = this.loadingCounter.pipe(
    map(count => count > 0)
  );

  public increment() {
    this.loadingCounter.next(this.loadingCounter.value + 1);
  }

  public decrement() {
    this.loadingCounter.next(this.loadingCounter.value - 1);
  }
}
