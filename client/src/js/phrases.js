'use strict';

var React = require('react');

var Phrases = React.createClass({
    render: function() {
        return (
            <div>
                <PhrasesList/>
            </div>
        )
    }
})

// is there any way in React to prevent entire component rebuild when flipping between routes?

var PhrasesList = React.createClass({

    getInitialState: function() {
        var that = this;
        var d = fetch('http://localhost:3000/getPhrases', {
            /*body: JSON.stringify({
                action: 'getSignUpConfiguration',
            }),*/
            method: 'POST'
        })
        .then(function  (response) {
            return response.json();
        })
        .then(function(response) {
            that.setState({
                en: response.en
            });
        });
        return {
            en: 'waiting for server',
            es: '',
            grade: 'waiting for something to happen'
        }
    },
    
    handleChange: function(e) {
        this.setState({es: e.target.value});
    },
    
    sendAnswerGetNewQuestion: function() {
        console.log('do saveAnswer HTTP');
        var d = fetch('http://localhost:3000/saveAnswer', {
            body: JSON.stringify({
                'en': this.state.en,
                'es': this.state.es
            }),
            // uncommenting this causes Express to not set the CORS header and therefore we get a CORS errorasdas   
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
                Try translating this phrase:
                <div>
                    {this.state.en}
                </div>
                <input onChange={this.handleChange} placeholder='Type your answer here' type='text'></input>
                <div>
                    <button onClick={this.sendAnswerGetNewQuestion}>Save Result</button>
                </div>
                {this.state.grade}
            </div>
        )
    }
    
})

module.exports = Phrases;