'use strict';

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Header = require('./header');

var App = React.createClass({
    render: function() {
        return (
            <div className='container-fluid' style={{marginTop:'25px'}}>
                <Header/>
                <RouteHandler/>
            </div>
        )
    }
})

module.exports = App;