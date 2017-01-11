var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mongo = require('mongodb').MongoClient;

var db;

app.get('/', function(req, res) {
    res.send('hi from Express');
});

var reply = function(err, results) {
    console.log(results);
    var phrases = results;
    this.set({
        'Content-Type': 'application/json;charset=utf-8'
    })
    this.set({
        'Access-Control-Allow-Origin': '*'
    })
    console.log('SEND', phrases);
    this.send(phrases);        
};

app.post('/getPhrases', function(req, res) {
    var replyBound = reply.bind(res);
    var cursor = db.collection('phrases').find().toArray(replyBound);
    console.log('did query');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

app.post('/saveAnswer', function(req, res) {
    console.log('got an answer of:', req.body, req.params);
    var t = {
        'es': 'iré mañana'
    }
    db.collection('test').save(t, function(err, result) {
        console.log(err);
    });
    //res.set({
        //'Access-Control-Allow-Origin': '*'
    //})
    res.send('OK');
});

app.listen(3000, function() {
    mongo.connect('mongodb://GregTomkins:samft99@ds159978.mlab.com:59978/gringogreg', function (err, database) {
        console.log(err);
        console.log('connected to mongo');
        db = database;
    });
    console.log('listening on port 3000');
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