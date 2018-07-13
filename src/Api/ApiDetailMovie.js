import { ApiKey } from './ApiKey';

export const ApiDetailMovie = (id) => 'https://api.themoviedb.org/3/movie/'+id+'?api_key='+ApiKey+'&append_to_response=credits';