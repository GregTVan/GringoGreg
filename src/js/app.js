'use strict';

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Header = require('./header');

var App = React.createClass({
    render: function() {
        return (
            <div>
                <Header/>
                Welcome to gringogreg, my Spanish and React learning site.
                <RouteHandler/>
            </div>
        )
    }
})

module.exports = App;