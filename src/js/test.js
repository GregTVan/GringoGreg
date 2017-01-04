'use strict';

var React = require('react');

// order matters! Foo must come before Home because Home references Foo
var Foo = React.createClass({
    render: function() {
        return (
            <span>
                What the Heck?
            </span>
        )
    }
});

var Home = React.createClass({
    render: function() {
        return (
            <div>
                Hello World, Hola Mundo !!
                <Foo/>
            </div>
        )
    }
});

React.render(<Home />, document.getElementById('app'));