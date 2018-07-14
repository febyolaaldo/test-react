import React from "react";
import { Card } from 'semantic-ui-react';
import RatingMovie from './RatingMovie';

const CardMovies = (props) => (
    <Card
        image={props.image}
        header={props.title}
        meta={props.release}
        extra={RatingMovie(props.rating)}
    />
)

export default CardMovies