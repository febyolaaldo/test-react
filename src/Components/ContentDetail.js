import React from "react";
import {
    Grid,
    Image,
    Label,
    Header,
    Icon
} from 'semantic-ui-react';

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

export default ContentDetail