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

app.post('/getStats', function(req, res) {
    res.set({
        'Content-Type': 'application/json;charset=utf-8'
    })
    res.set({
        'Access-Control-Allow-Origin': '*'
    })
    //res.send(getStats());
    getStats(res);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

app.post('/saveAnswer', function(req, res) {
    //res.send({"foo": "BAR"});
    //return;
    var grade = getGrade(req.body.en, req.body.es);
    var answer = {
        en: req.body.en,
        es: req.body.es,
        grade: grade // of THIS question
    }
    db.collection('responses').save(answer, function(err, result) {
        // TODO handle error
        //console.log(err, result);
    });
    var response = {};
    if(grade == 'OK') {
        var newPhrase = getNextPhrase();
        response.en = newPhrase.en;
        response.es = newPhrase.es;
        correct = true;
    } else {
        response.es = grade;
        correct: false;
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
        if(en == phraseBank[i].en) {
            if (es == phraseBank[i].es) return 'OK';
            else return {
                "expected": phraseBank[i].es
            }
        }
    }
}

var getStats = function(res) {
    //console.log('MADE REQUEST');
    var cursor2 = db.collection('responses').find().toArray(function (err, results) {
        // CHECK ERROR
        res.send({'total': results.length});
    });
}

//var handleStatsReply = function(err, results) {
  //  console.log('GOT REPLY');
//    console.log(err, results);
//

var handleReply = function(err, results) {
    // TODO handle err
    phraseBank = results;
}

app.listen(3000, function() {
    mongo.connect('mongodb://GregTomkins:samft99@ds159978.mlab.com:59978/gringogreg', function (err, database) {
        //console.log(err);
        //console.log('connected to mongo');
        db = database;
        var cursor2 = db.collection('phrases').find().toArray(handleReply);
    });
    console.log('listening on port 3000');
});