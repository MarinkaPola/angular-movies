import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MoviesService} from './movies.service';
import {Genre, Movie} from '../interface';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  private Sub!: Subscription;
  private error: any;
  movies!: Movie[];
  p = 1;
  searchText!: string;
  genres!: Genre[];
  genre: Genre = {id: 0, name: ''};
  private SubG!: Subscription;

  year: Date | string = '';
  years: number[] = [];
  itemsPerPage = 10;



  generateArrayOfYears() {
    const max = new Date().getFullYear();
    const min = max - 30;

    for (let i = max; i >= min; i--) {
      this.years.push(i);
    }
    console.log(this.years);
  }


  constructor(private moviesService: MoviesService) {
    this.generateArrayOfYears();
  }

  ngOnInit(): void {
    this.getNewMovies();
    this.getGenres();
  }

  getNewMovies() {
    this.Sub = this.moviesService.getMovies().subscribe(data => {
        this.movies = data;
        console.log(data);
        console.log(this.genre);
        if (this.genre && (this.genre.id > 0 )) {
          this.movies = this.movies.filter((movie) => {
            return (movie.genre_ids.indexOf(this.genre.id) >= 0);
          }); console.log(this.movies);
        }
        console.log(this.year);
        if (this.year) {
          this.movies = this.movies.filter(movie => new Date(movie.first_air_date).getFullYear() === new Date(this.year).getFullYear());
          console.log(this.movies);
        }
      },

      error => {
        this.error = error.message;
        console.log(error);
      }, );
  }

  getGenres() {
    this.SubG = this.moviesService.getGenres().subscribe(data => {
        this.genres = data;
        console.log(data);
      },
      error => {
        this.error = error.message;
        console.log(error);
      },
    );
  }

  onChangeGenre(optionsValue: any) {
    this.p = 1;
    this.getNewMovies();
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2
      ? c1.sortBy === c2.sortBy && c1.sortOrder === c2.sortOrder
      : c1 === c2;
  }


  onChangePremiere(optionsValue: any) {
    this.p = 1;
    this.getNewMovies();
  }

  raitingSortDown() {
    this.movies.sort(function(a, b) {
      return b.vote_average - a.vote_average;
    });
  }

  raitingSortUp() {
    this.movies.sort(function(a, b) {
      return a.vote_average - b.vote_average;
    });
  }

  titleSortDown() {
    this.movies.sort((a, b) => b.original_name.localeCompare(a.original_name));
  }

  titleSortUp() {
    this.movies.sort((a, b) => a.original_name.localeCompare(b.original_name));
  }

  dataSortDown() {
    this.movies.sort(function(a, b) {
      return new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime();
    });
  }

  dataSortUp() {
    this.movies.sort(function(a, b) {
      return new Date(a.first_air_date).getTime() - new Date(b.first_air_date).getTime();
    });
  }

  onChangeSearch(optionsValue: any) {
    this.p = 1;
  }
}
