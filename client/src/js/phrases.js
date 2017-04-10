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
            body: JSON.stringify({
                action: 'getSignUpConfiguration',
            }),
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
            en: 'waiting...',
            es: '',
            grade: 'waiting...'
        }
    },

    handleKeyPress: function(e) {
        if(e.key == 'Enter') {
            this.sendAnswerGetNewQuestion();
        } else {
            this.setState({es: e.target.value});
        }
    },

    sendAnswerGetNewQuestion: function() {
        var that = this;
        //console.log(this.state.en);
        var b = JSON.stringify({
                'en': this.state.en,
                'es': this.state.es
            });
        console.log('wtf', b);
        var d = fetch('http://localhost:3000/saveAnswer', {
            body: JSON.stringify({
                b
            }),
            // when you add this header it goes as OPTIONS with no payload and returns a 204
            //headers: new Headers({ 'Content-Type': 'application/json' }),
            method: 'POST'
        })
        .then(function  (response) {
            return response.json();
        })
        .then(function(response) {
            if(response.correct) {
                document.getElementById('answer').value = '';
                that.setState({
                    grade: 'Correct!'
                });
            } else {
                that.setState({
                    en: response.en,
                    grade: 'Correct answer is: ' + response.grade
                });
            }
        });
    },
    
    XXXsendAnswerGetNewQuestion: function() {
        console.log('do saveAnswer HTTP');
        // WE DO NOT NEED THIS D HERE
        var that = this;
        console.log(this.state.en);
        console.log(this.state.es);
        var b = JSON.stringify({
                'en': 'xxx', //this.state.en,
                'es': 'yyy' //this.state.es
            });
        console.log(b);
        //var d = fetch('http://localhost:3000/saveAnswer', {
        var d = fetch('http://localhost:3000/getPhrases', {
            body: b,
            // uncommenting this causes Express to not set the CORS header and therefore we get a CORS error
            headers: new Headers({ 'Content-Type': 'application/json' }),
            method: 'POST'
            //mode: 'no-cors'
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response, response.grade);
            if(response.correct) {
                document.getElementById('answer').value = '';
                that.setState({
                    grade: 'Correct!'
                });
            } else {
                that.setState({
                    en: response.en,
                    grade: 'Correct answer is: ' + response.grade
                });
            }
        });
    },

    /* Re: Link: tried to change route on onChange event but react-router looks like a real mess;
       we are on a very old version 0.13.3, current is 3.0.2, several breaking changes between */
    
    render: function() {
        return (
            <div>
                <div>
                    <h1>
                        {this.state.en}
                    </h1>
                </div>
                <input className='form-control' id='answer' onKeyPress={this.handleKeyPress} placeholder='Type your answer here then hit Enter/Return' type='text'></input>
                {this.state.grade}
            </div>
        )
    }
    
})

module.exports = Phrases;