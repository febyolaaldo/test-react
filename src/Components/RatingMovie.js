import React from "react";
import { Icon } from 'semantic-ui-react';

const RatingMovie = (rating) => (
    <a>
        <Icon name='star' />
        {rating}
    </a>
)

export default RatingMovie