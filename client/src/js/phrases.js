'use strict';

//var browserHistory = require('react-router').BrowserHistory;
var xxx = require('react-router');
var yyy = require('react-router');
console.log(xxx);
console.log(yyy);
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

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
    
    mixins: [xxx],

    getInitialState: function() {
        var that = this;
        var d = fetch('http://localhost:3000/getPhrases', {
            /*body: JSON.stringify({aaa
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
        // WE DO NOT NEED THIS D HERE
        var that = this;
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
            return response.json();
        })
        .then(function(response) {
            console.log(response, response.grade);
            that.setState({
                en: response.en,
                grade: response.grade
            });
        });
    },

    /* Re: Link: tried to change route on onChange event but react-router looks like a real mess;
       we are on a very old version 0.13.3, current is 3.0.2, several breaking changes between */
    
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
                    <button><Link to='phrasesStats'>Show Statz</Link></button>
                </div>
                {this.state.grade}
            </div>
        )
    }
    
})

module.exports = Phrases;