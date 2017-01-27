var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mongo = require('mongodb').MongoClient;

var db;

app.get('/', function(req, res) {
    res.send('hi from Express');
});

var phraseBank;
var currentPhrase = 0;

app.post('/getPhrases', function(req, res) {
    res.set({
        'Content-Type': 'application/json;charset=utf-8'
    })
    res.set({
        'Access-Control-Allow-Origin': '*'
    })
    res.send(getNextPhrase());
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

app.post('/saveAnswer', function(req, res) {
    console.log('in saveanswer');
    var grade = getGrade(req.body.en, req.body.es);
    var answer = {
        en: req.body.en,
        es: req.body.es,
        grade: grade // of THIS question
    }
    db.collection('responses').save(answer, function(err, result) {
        console.log(err);
    });
    var newPhrase = getNextPhrase();
    console.log(newPhrase, currentPhrase);
    var response = {
        en: newPhrase.en,
        es: newPhrase.es,
        grade: grade // of PREVIOUS question
    }
    res.send(response);
});

var getNextPhrase = function() {
    var ret = phraseBank[currentPhrase];
    if(currentPhrase == phraseBank.length - 1) currentPhrase = 0;
    else currentPhrase++;
    return ret;
}

var getGrade = function(en, es) {
    // TODO handle error (neither string matches), right now just marks wrong
    // TODO handle ES->EN vs EN->ES
    for(var i=0;i<phraseBank.length;i++) {
        if(en == phraseBank[i].en && es == phraseBank[i].es) return 'OK';
    }
    return 'FAIL';
}

var handleReply = function(err, results) {
    // TODO handle err
    phraseBank = results;
}

app.listen(3000, function() {
    mongo.connect('mongodb://GregTomkins:samft99@ds159978.mlab.com:59978/gringogreg', function (err, database) {
        console.log(err);
        console.log('connected to mongo');
        db = database;
        var cursor2 = db.collection('phrases').find().toArray(handleReply);
    });
    console.log('listening on port 3000');
});