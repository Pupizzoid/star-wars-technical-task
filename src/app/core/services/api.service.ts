import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMovie } from '../interfaces/movie';
import { map, Observable } from 'rxjs';
import { ICharacter } from '../interfaces/character';
export const BASE_URL = 'https://www.swapi.tech/api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getMovies(): Observable<IMovie[]> {
    return this.http
      .get<{ result: IMovie[] }>(`${BASE_URL}/films/`)
      .pipe(map(response => response.result));
  }

  getCharacter(url: string): Observable<ICharacter> {
    return this.http
      .get<{ result: ICharacter }>(url)
      .pipe(map(response => response.result));
  }
}
