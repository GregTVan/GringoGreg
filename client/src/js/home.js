'use strict';

var React = require('react');

var Home = React.createClass({
    render: function() {
        return (
            <div>
                Welcome to GringoGreg.com, my Spanish phrase practice thingamajig.
                <br/>
                <br/>
                Click 'Phrases' to practice, 'Stats' to see how you are doing.
            </div>
        )
    }
})

module.exports = Home;