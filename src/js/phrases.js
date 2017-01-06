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

var PhrasesList = React.createClass({

    /*var d = fetch('http://localhost/canchek/CanChek?action=getSignUpConfiguration', {
        body: JSON.stringify({
            action: 'getSignUpConfiguration',
        }),
        method: 'POST'
        // must add CORS header on server...
        //mode: 'no-cors'
    })
    .then(function(response) {
        console.log('R1t!', response);
        return response.json();
    })
    .then(function(response2) {
        console.log('R2!');
        console.log(response2);
        console.log('complete!');
    });*/    
    
    getInitialState: function() {
        var that = this;
        var d = fetch('http://localhost/canchek/CanChek?action=getSignUpConfiguration', {
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