import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from '@core/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'movies/:id',
    loadComponent: () =>
      import('./components/movie/movie.component').then(m => m.MovieComponent),
  },
  {
    path: 'characters/:id',
    loadComponent: () =>
      import('./components/character/character.component').then(
        m => m.CharacterComponent
      )
  },
  { path: '**', component: NotFoundComponent },
];
