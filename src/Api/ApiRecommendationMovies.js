import { ApiKey } from './ApiKey';

export const ApiRecommendationMovies = (id) => 'https://api.themoviedb.org/3/movie/'+id+'/recommendations?api_key='+ApiKey+'&language=en-US&page=1';