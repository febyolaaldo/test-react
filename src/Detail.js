import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ApiDetailMovie } from './ApiDetailMovie';
import axios from 'axios';
import {
    Breadcrumb,
    Container,
    Grid,
    Image,
    Header,
    Icon,
    Card,
    Label
} from 'semantic-ui-react'

const BreadcrumbDetail = () => (
    <Breadcrumb size='large'>
        <Breadcrumb.Section>
            <Link to="/">
                Home
            </Link>
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon='right angle' />
        <Breadcrumb.Section active>Detail</Breadcrumb.Section>
    </Breadcrumb>
)

const ContentDetail = (props) => (
    <Grid style={{marginTop: '30px'}} >
        <Grid.Column width={5}>
            <Image src={props.poster} rounded />
        </Grid.Column>
        <Grid.Column width={1}>
            
        </Grid.Column>
        <Grid.Column className="content-detail" width={10}>
            <Header className="content-detail--title" as='h1'>{props.title} <span className="content-detail--year">{'('+props.year+')'}</span></Header>
            <Icon name='star' size='large' />
            <span className="content-detail--rating">{props.rating}</span>
            <Header as='h3'>Overview</Header>
            <p className="content-detail--overview">{props.overview}</p>
            <div className="container-runtime">
                <Icon name='time' size='large' />
                <span className="content-detail--runtime">{props.runtime+' Min'}</span>
            </div>
            <div className="container-runtime">
                <Icon name='cart' size='large' />
                <span className="content-detail--cart">{props.price}</span>
            </div>
            <Label>
                <Label.Detail>{props.have}</Label.Detail>
            </Label>
        </Grid.Column>
    </Grid>
)

const CardCast = (props) => (
    <Card
        image={props.avatar}
        header={props.name}
        description={props.character}
    />
)

class DetailMovie extends React.Component {
    state = {
        detailMovies: [],
        castMovies: []
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(ApiDetailMovie(id))
            .then(res => {
                console.log(res.data);
                const movies = res.data;
                const cast = res.data.credits.cast;
                this.setState({
                    detailMovies: movies,
                    castMovies: cast
                });
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
            priceMovie = '--'
        } else if (ratingMovie >= 0 && ratingMovie <= 3){
            priceMovie = Number(3.500).toFixed(3);
            AlreadyHave = 'Already Have.'
        } else if(ratingMovie > 3 && ratingMovie <= 6){
            priceMovie = Number(8.250).toFixed(3);
            AlreadyHave = 'Already Have.'
        } else if(ratingMovie > 6 && ratingMovie <= 8){
            priceMovie = Number(16.350).toFixed(3);
            AlreadyHave = 'You dont have.'
        } else {
            priceMovie = Number(21.250).toFixed(3);
            AlreadyHave = 'You dont have.'
        }
            // castMovie = this.state.castMovies[0];
        // console.log(this.state.castMovies.slice(0, 10))
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
            </Container>
        )
    }
}

export default DetailMovie