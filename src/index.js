import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Recipes from './Recipes';
import Detail from './Recipes/Detail';
import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider,
} from 'react-apollo';
// TODO import from apollo-client, react-apollo and inject the client via ApolloProvider

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3001/',
  }),
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path="/" component={Recipes} />
        <Route path="/:id" component={Detail} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
