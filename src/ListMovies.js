import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Card, Icon } from 'semantic-ui-react';
import axios from 'axios';
import ApiNowPlaying from './ApiNowPlaying';

const extra = (price,idMovie, titleMovie) => (
    <Link to={'/'+idMovie+'-'+titleMovie}>
        <Icon name='shopping cart' />
        {price}
    </Link>
)

class ListMovies extends React.Component {
    state = {
      movies: []
    }
  
    componentDidMount() {
      axios.get(ApiNowPlaying)
        .then(res => {
            const movies = res.data.results;
            this.setState({ movies });
        })
    }

    render() {
        const DetailCard = this.state.movies.map((movie, key) => {
            let Price;
            let Rate = movie.vote_average;
            let AlreadyHave;
            let PathMovie = movie.title;
            PathMovie = PathMovie.replace(/\s+/g, '-').toLowerCase();
            if (Rate < 1){
                Price = '--'
            } else if (Rate >= 0 && Rate <= 3){
                Price = Number(3.500).toFixed(3);
                AlreadyHave = 'Already Have.'
            } else if(Rate > 3 && Rate <= 6){
                Price = Number(8.250).toFixed(3);
                AlreadyHave = 'Already Have.'
            } else if(Rate > 6 && Rate <= 8){
                Price = Number(16.350).toFixed(3);
            } else {
                Price = Number(21.250).toFixed(3);
            }

            return (
                <Card key={key + 1}
                    image={'https://image.tmdb.org/t/p/w342'+movie.poster_path}
                    header={movie.title}
                    meta={AlreadyHave}
                    extra={extra(Price, movie.id, PathMovie)}
                />
            )
        })
        // console.log(Harga);
        return (
            <Router>
                <Card.Group itemsPerRow={4}>
                    {DetailCard}
                </Card.Group>
            </Router>
        )
    }
}

export default ListMovies