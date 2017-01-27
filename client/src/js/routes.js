'use strict';

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

// wtf capitalization
var routes = (
    <Route name='app' path='/' handler={require('./app')}>
        <Route name='phrases' handler={require('./phrases')}/>
        <Route name='phrasesStats' handler={require('./PhrasesStats')}/>
        <Route name='verbs' handler={require('./verbs')}/>
    </Route>
);

module.exports = routes;