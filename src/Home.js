import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ListMovies from './ListMovies.js'

const About = () => (
    <div>
      <h2>About</h2>
    </div>
);

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
                    <Route path="/123" exact component={About} />
                    <Route component={NoMatch} />
                </Switch>
            </Container>
        );
    }
}

export default withRouter(containerHome)