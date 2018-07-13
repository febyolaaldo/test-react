import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ListMovies from './ListMovies.js'
import DetailMovies from './Detail';

const NoMatch = () => (
    <div>
      <h2>Page Not Found</h2>
    </div>
)

class containerHome extends Component {
    render() {
        return (
            <Container>
                <Switch>
                    <Route path="/" exact component={ListMovies} />
                    <Route path="/:id-:slug" component={DetailMovies} />
                    <Route component={NoMatch} />
                </Switch>
            </Container>
        );
    }
}

export default withRouter(containerHome)