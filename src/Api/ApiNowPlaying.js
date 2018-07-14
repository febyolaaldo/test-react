import { ApiKey } from './ApiKey';

export const ApiNowPlaying = (page) => 'https://api.themoviedb.org/3/movie/now_playing?api_key='+ApiKey+'&language=en-US&page='+page+'&region=ID';