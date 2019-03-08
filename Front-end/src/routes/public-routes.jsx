import UnauthHome from "../apresentation/unauth-home";
import PageNotFound from "../not-found";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Livros from "../collection/books";

class PublicRoutes extends Component {
    render() { 
        return (  <Switch>
            <Route exact path="/" component={UnauthHome} />
            <Route
              path="/book/:auth/:name"
              component = {Livros}
            />
            <Route path="*" component={PageNotFound} />
          </Switch> );
    }
}
 
export default PublicRoutes;