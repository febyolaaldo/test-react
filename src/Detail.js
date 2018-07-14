import React from "react";
import axios from 'axios';
import { ApiDetailMovie } from './Api/ApiDetailMovie';
import { ApiSimiliarMovies } from './Api/ApiSimiliarMovies';
import { ApiRecommendationMovies } from './Api/ApiRecommendationMovies';
import {
    Container,
    Header,
    Card
} from 'semantic-ui-react';
import BreadcrumbDetail from './Components/Breadcrumb';
import ContentDetail from './Components/ContentDetail';
import CardCast from './Components/CardCast';
import CardMovies from './Components/CardMovies';

class DetailMovie extends React.Component {
    state = {
        detailMovies: [],
        castMovies: [],
        similiarMovies: [],
        recommendationMovies: []
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(ApiDetailMovie(id))
            .then(res => {
                // console.log(res.data);
                const movies = res.data;
                const cast = res.data.credits.cast;
                this.setState({
                    detailMovies: movies,
                    castMovies: cast
                });
        })
        axios.get(ApiSimiliarMovies(id))
            .then(res => {
                const similiar = res.data.results;
                this.setState({
                    similiarMovies: similiar
                })
        })
        axios.get(ApiRecommendationMovies(id))
            .then(res => {
                const recommendation = res.data.results;
                this.setState({
                    recommendationMovies: recommendation
                })
        })
    }

    render() {
        const titleMovie = this.state.detailMovies.original_title,
            posterMovie = this.state.detailMovies.poster_path,
            ratingMovie = this.state.detailMovies.vote_average,
            overviewMovie = this.state.detailMovies.overview,
            yearMovie = new Date(this.state.detailMovies.release_date),
            runtimeMovie = this.state.detailMovies.runtime;
        let priceMovie;
        let AlreadyHave;
        if (ratingMovie < 1){
            priceMovie = '--';
            AlreadyHave = 'You dont have.';
        } else if (ratingMovie >= 0 && ratingMovie <= 3){
            priceMovie = Number(3.500).toFixed(3);
            AlreadyHave = 'Already Have.';
        } else if(ratingMovie > 3 && ratingMovie <= 6){
            priceMovie = Number(8.250).toFixed(3);
            AlreadyHave = 'Already Have.';
        } else if(ratingMovie > 6 && ratingMovie <= 8){
            priceMovie = Number(16.350).toFixed(3);
            AlreadyHave = 'You dont have.';
        } else if(ratingMovie > 8 && ratingMovie <= 10){
            priceMovie = Number(21.250).toFixed(3);
            AlreadyHave = 'You do not have.';
        } else {
            priceMovie = '--';
            AlreadyHave = 'You do not have.';
        }
        const CastMovie = this.state.castMovies.slice(0, 5).map((movie, key) => {
            let avatarCast;
            let nameCast = movie.name;
            let characterCast = movie.character;
            if (movie.profile_path !== null && movie.profile_path !== undefined){
                avatarCast = 'https://image.tmdb.org/t/p/w185'+movie.profile_path;
            } else {
                avatarCast = 'https://dummyimage.com/209x278/fff/000&text=No+Picture';
            }

            return (
                <CardCast
                    key={key}
                    avatar={avatarCast}
                    name={nameCast}
                    character={characterCast}
                />
            )
        })
        const SimiliarMovies = this.state.similiarMovies.slice(0, 5).map((movie, key) => {
            let imageSimiliar = movie.poster_path;
            let titleSimiliar = movie.title;
            let releaseSimiliar = new Date(movie.release_date);
            let ratingSimiliar = movie.vote_average;

            return (
                <CardMovies
                    key={key}
                    image={'https://image.tmdb.org/t/p/w500'+imageSimiliar}
                    title={titleSimiliar}
                    release={releaseSimiliar.getFullYear()}
                    rating={ratingSimiliar}
                />
            )
        })
        const RecommendationMovies = this.state.recommendationMovies.slice(0, 5).map((movie, key) => {
            let imageRecommendation = movie.poster_path;
            let titleRecommendation = movie.title;
            let releaseRecommendation = new Date(movie.release_date);
            let ratingRecommendation = movie.vote_average;

            return (
                <CardMovies
                    key={key}
                    image={'https://image.tmdb.org/t/p/w500'+imageRecommendation}
                    title={titleRecommendation}
                    release={releaseRecommendation.getFullYear()}
                    rating={ratingRecommendation}
                />
            )
        })
        return (
            <Container>
                <BreadcrumbDetail />
                <ContentDetail
                    poster={'https://image.tmdb.org/t/p/w500'+posterMovie}
                    title={titleMovie}
                    year={yearMovie.getFullYear()}
                    rating={ratingMovie}
                    overview={overviewMovie}
                    runtime={runtimeMovie}
                    price={'Rp. '+priceMovie}
                    have={AlreadyHave}
                    cast={CastMovie}
                />
                <Header as='h1'>Top Cast</Header>
                <Card.Group itemsPerRow={5}>
                    {CastMovie}
                </Card.Group>
                <Header as='h1'>Similiar Movies</Header>
                <Card.Group itemsPerRow={5} >
                    {SimiliarMovies.length > 0? SimiliarMovies : (<span className="no-result">No Similiar.</span>)}
                </Card.Group>
                <Header as='h1'>Recommendation Movies</Header>
                <Card.Group itemsPerRow={5} >
                    {RecommendationMovies.length > 0? RecommendationMovies : (<span className="no-result">No Recommendation.</span>)}
                </Card.Group>
            </Container>
        )
    }
}

export default DetailMovie