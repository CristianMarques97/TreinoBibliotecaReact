import MyProfile from "../user-profile/my-profile";
import UnauthHome from "../apresentation/unauth-home";
import PageNotFound from "../not-found";

import React, { Component } from "react";

import {Route, Switch } from "react-router-dom";

import Livros from "../collection/books";
import Bookcollection from "../collection/book-collection"

class UserRoutes extends Component {
    render() { 
        return ( <Switch>
            <Route exact path="/" component={UnauthHome} />
             {/* Passa a informação para o filho(Forma alternativa ao redux) */}
            <Route
              path="/home"
              render={() => <MyProfile parentState={this.props.superState} />}
            />
             <Route
              path="/book-collection"
              render={() => <Bookcollection userState={this.props.superState.activeUser} />}
            />
                <Route
              path="/book/:auth/:name"
              component = {Livros}
            />
            <Route path="*" component={PageNotFound} />
          </Switch> );
    }
}
 
export default UserRoutes;