import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { RequestInterceptor } from './request.interceptor';
import { SpinnerService } from './spinner.service';

describe('RequestInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let spinnerService: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SpinnerService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RequestInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    spinnerService = TestBed.inject(SpinnerService);

    spyOn(spinnerService, 'increment').and.callThrough();
    spyOn(spinnerService, 'decrement').and.callThrough();
  });

  it('should call spinnerService increment and decrement', () => {
    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(spinnerService.increment).toHaveBeenCalled();

    req.flush({});

    expect(spinnerService.decrement).toHaveBeenCalled();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
