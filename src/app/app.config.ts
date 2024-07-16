import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { rootReducer } from '@store/reducers';
import { AppEffects } from '@store/effects';
import { RequestInterceptor } from '@core/services/request.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ app: rootReducer }),
    provideEffects(AppEffects),
    importProvidersFrom(HttpClientModule),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: RequestInterceptor,
    },
  ],
};
