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
    
    phraseId: null,

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
                en: response.en,
                phraseId: response._id
            });
            that.phraseId = response._id;
                            console.log('Set:', response._id);

        });
        return {
            en: 'waiting...',
            es: '',
            phraseId: '',
            grade: ''
        }
    },

    // BUG drops last character or something
    // BUG doesn't handle pasted data
    handleKeyPress: function(e) {
        if(e.key == 'Enter') {
            this.sendAnswerGetNewQuestion();
        } else {
            this.setState({
                es: e.target.value
            });
        }
    },

    sendAnswerGetNewQuestion: function() {
        var that = this;
        //console.log(this.state.en);
        var b = JSON.stringify({
                'en': this.state.en,
                'es': this.state.es,
                'phraseId': this.phraseId
            });
        console.log('wtf', b);
        var d = fetch('http://localhost:3000/saveAnswer', {
            body: JSON.stringify({
                'en': this.state.en,
                'es': this.state.es,
                phraseId: this.phraseId
            }),
            //en: 'foo',
            //es: 'bax',
            // when you add this header it goes as OPTIONS with no payload and returns a 204
            headers: new Headers({ 'Content-Type': 'application/json' }),
            method: 'POST'
        })
.then(  
    function(response) {  
      if (response.status !== 200) {  
        console.log('Looks like there was a problem. Status Code: ' +  
          response.status);  
        return;  
      }

      // Examine the text in the response  
      response.json().then(function(data) {  
        console.log('what i saw', data);  
            if(data.correct) {
                document.getElementById('answer').value = '';
                that.setState({
                    en: data.en,
                    _id: data._id,
                    grade: 'Correct!'
                });
                console.log('Saved:', data._id);
            } else {
                that.setState({
                    grade: 'Correct translation: ' + data.es.expected
                });
            }
        
      });  
    }  
  )  
  .catch(function(err) {  
    console.log('Fetch Error :-S', err);  
  });        
        
        /*.then(function  (response) {
            return response.json();
        })
        .catch(function(err) {
            console.log('ERR1', err);
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
        })
        .catch(function(err) {
            console.log('ERR1', err);
        });*/
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
                <div style={{display:'none'}}>
                    {this.state.phraseId}
                </div>
                <div>
                    <h1>
                        {this.state.en}
                    </h1>
                </div>
                <h3>
                    <input className='form-control' id='answer' onKeyPress={this.handleKeyPress} placeholder='Type your translation here then hit Enter/Return' style={{marginTop:'25px'}} type='text'></input>
                    <div style={{marginTop:'25px'}}>
                        {this.state.grade}
                    </div>
                </h3>
            </div>
        )
    }
    
})

module.exports = Phrases;