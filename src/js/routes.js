'use strict';

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var routes = (
    <Route name='app' path='/' handler={require('./app')}>
        <DefaultRoute handler={require('./phrases')}/>
        <Route name='verbs' handler={require('./verbs')}/>
    </Route>
);

module.exports = routes;