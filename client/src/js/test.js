'use strict';

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

/*
TEST BUNDLER BUNGLER WTF WTG WTH WTI WTJ WTK
var d = fetch('http://localhost/canchek/CanChek?action=getSignUpConfiguration', {
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

Router.run(routes, function(Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});