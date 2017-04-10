'use strict';

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

// wtf capitalization
var routes = (
    <Route name='app' path='/' handler={require('./app')}>
        <Route name='home' handler={require('./home')}/>
        <Route name='phrases' handler={require('./phrases')}/>
        <Route name='stats' handler={require('./stats')}/>
    </Route>
);

module.exports = routes;