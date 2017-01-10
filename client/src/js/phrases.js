'use strict';

var React = require('react');

var Phrases = React.createClass({

    getInitialState: function() {
        return {
            hello: 'outer container (page)'
        }
    },
    
    render: function() {
        return (
            <div>
                Hi, {this.state.hello}
                <PhrasesList fuck='asshole'/>
            </div>
        )
    }
    
})

// is there any way in React to prevent entire component rebuild when flipping between routes?
alert('god');
var PhrasesList = React.createClass({

    getInitialState: function() {
        var that = this;
        var d = fetch('http://localhost:3000/getPhrases', {
            body: JSON.stringify({
                action: 'getSignUpConfiguration',
            }),
            method: 'POST'
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);
            that.setState({
                hello: response.planList[0].descriptionLong
            });
            console.log('set state done!');
        });
        return {
            hello: 'waiting for server'
        }
    },
    
    render: function() {
        return (
            <div>
                Hi, {this.state.hello} {this.props.fuck}
            </div>
        )
    }
    
})

module.exports = Phrases;