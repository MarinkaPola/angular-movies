import {Pipe, PipeTransform} from '@angular/core';
import {Movie} from './interface';

@Pipe ({
    name: 'searchMovies'
})
export class SearchPipe implements PipeTransform {
    transform(movies: Movie[], search = ''): Movie[] {
        if (!search.trim()) {
            return movies;
        }
        return movies.filter( movie => {
            return movie.original_name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
        });
    }

}
