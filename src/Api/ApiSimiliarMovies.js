import { ApiKey } from './ApiKey';

export const ApiSimiliarMovies = (id) => 'https://api.themoviedb.org/3/movie/'+id+'/similar?api_key='+ApiKey+'&language=en-US&page=1';