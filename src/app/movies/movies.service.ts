import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../interface';
import {Genre} from '../interface';

@Injectable({providedIn: 'root'})
export class MoviesService {


  constructor(private http: HttpClient) {
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('https://binotel.xvv.be/api/movies.json');
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>('https://binotel.xvv.be/api/genres.json');
  }
}

