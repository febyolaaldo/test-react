import React from "react";
import { Card } from 'semantic-ui-react';

const CardCast = (props) => (
    <Card
        image={props.avatar}
        header={props.name}
        description={props.character}
    />
)

export default CardCast