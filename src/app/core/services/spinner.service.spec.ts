import { TestBed } from '@angular/core/testing';
import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set loading$ to true when increment is called', done => {
    service.loading$.subscribe(isLoading => {
      if (isLoading) {
        expect(isLoading).toBe(true);
        done();
      }
    });
    service.increment();
  });
});
