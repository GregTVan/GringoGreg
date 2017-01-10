var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.get('/', function(req, res) {
    res.send('hi from Express');
});

app.post('/getPhrases', function(req, res) {
    var phrases = {
        en: 'I hope you know how to read.',
        sp: 'Espero que sabes leer.'
    }
    res.set({
        'Access-Control-Allow-Origin': '*'
    })
    res.send(phrases);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

app.post('/saveAnswer', function(req, res) {
    console.log('got an answer of:', req.body, req.params);
    //res.set({
        //'Access-Control-Allow-Origin': '*'
    //})
    res.send('OK');
});

app.listen(3000, function() {
    console.log('listening on port 3000!');
});

/*var express = require('express')
  , bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.post('/', function(request, response){
    console.log(request.body);      // your JSON
    res.set({
        'Access-Control-Allow-Origin': '*'
    })
        response.send(request.body);    // echo the result back
});

app.listen(3000);*/