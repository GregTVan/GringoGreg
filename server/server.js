var express = require('express');
var app = express();

app.listen(3000, function() {
    console.log('listening on port 3000');
});

app.get('/', function(req, res) {
    res.send('hi from Express');
});

app.get('/getPhrases', function(req, res) {
    var phrases = {
        en: 'Hi',
        sp: 'Hola'
    }
    res.send(phrases);
});