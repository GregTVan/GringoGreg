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
                <PhrasesList fuck='asshole stretcher'/>
            </div>
        )
    }
    
})

// is there any way in React to prevent entire component rebuild when flipping between routes?

var doIt = function() {
    console.log('oh My!');
}

var PhrasesList = React.createClass({

    getInitialState: function() {
        var that = this;
        var d = fetch('http://localhost:3000/getPhrases', {
            /*body: JSON.stringify({
                action: 'getSignUpConfiguration',
            }),*/
            method: 'POST'
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);
            that.setState({
                hello: response.sp
            });
            console.log('set state done!');
        });
        return {
            hello: 'waiting for server'
        }
    },
    
    doIt: function() {
        var d = fetch('http://localhost:3000/saveAnswer', {
            body: JSON.stringify({
                pablo: 'escobar'
            }),
            // uncommenting this causes Express to not set the CORS header and therefore we get a CORS error
            headers: new Headers({ 'Content-Type': 'application/json' }),
            method: 'POST'
            //mode: 'no-cors'
        })
        .then(function(response) {
            return response.text();
        })
        .then(function(response) {
            console.log(response);
        });
    },
    
    render: function() {
        return (
            <div>
                Hi, {this.state.hello} {this.props.fuck}
                <button onClick={this.doIt}>Save Result</button>    
            </div>
        )
    }
    
})

module.exports = Phrases;