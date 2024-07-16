import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AsyncPipe, NgIf } from '@angular/common';
import { SpinnerService } from '../../services/spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [MatProgressSpinner, NgIf, AsyncPipe],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  loading$: Observable<boolean> = this.spinnerService.loading$;

  constructor(private spinnerService: SpinnerService) {}
}
