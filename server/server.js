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
    console.log(req.body);
    //return;
    res.set({
        'Content-Type': 'application/json;charset=utf-8'
    })
    res.set({
        'Access-Control-Allow-Origin': '*'
    })
    var grade = getGrade(req.body.en, req.body.es);
    var answer = {
        en: req.body.en,
        es: req.body.es,
        grade: grade,
        phraseId: req.body.phraseId        // of THIS question
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
        response.correct = true;
    } else {
        response.es = grade;
        response.correct = false;
        response.errorLocation = 3;
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
    console.log('getGrade');
    console.log(en);
    console.log('\'' + es + '\'');
    console.log(phraseBank);
    for(var i=0;i<phraseBank.length;i++) {
        console.log('SCANNING PHRASEBANK ' + phraseBank[i].en);
        if(en === phraseBank[i].en) {
            if (es === phraseBank[i].es) {
                console.log('OK');
                return 'OK';
            }
            else {
                console.log('BAD \'' + phraseBank[i].es + '\' ...' + es.length + ',' + phraseBank[i].es.length);
                for(var j=0;j<es.length;j++) {
                    console.log(phraseBank[i].es[j] + ' ' + es[j] + (phraseBank[i].es[j] === es[j]));
                }
                return {
                    "expected": phraseBank[i].es
                }
            }
        } else {
            console.log('NO MATCH OUTER: ' + en + ' => ' + phraseBank[i].en);
        }
    }
    console.log('return error');
    return 'ERROR';
}

var getStats = function(res) {
    //console.log('MADE REQUEST');
    var cursor2 = db.collection('responses').find().toArray(function (err, results) {
        // count questions and stats
        var stats = [];
        var found;
        for(var i=0;i<results.length;i++) {
            //console.log(results[i]._id, 'LEN: ' + stats.length);
            found = false;
            for(var j=0;j<stats.length;j++) {
                //console.log(results[i]._id, stats[j].phraseId);
                if(results[i].phraseId == stats[j].phraseId) {
                    found = true;
                    stats[j].attempted++;
                    if(results[i].grade == 'OK') {
                        stats[j].correct++;
                    }
                }
            }
            if(!found) {
                var rec = {};
                rec.phraseId = results[i].phraseId;
                rec.attempted = 1;
                rec.correct = 0;
                if(results[i].grade == 'OK') {
                    rec.correct++;
                }
                rec.en = results[i].en;
                rec.es = results[i].es;
                stats.push(rec);
            }
        }
        for(var i=0;i<stats.length;i++) {
            stats[i].successRate = stats[i].correct / stats[i].attempted;
            //console.log(stats[i].phraseId, stats[i].successRate);
        }
        stats.sort(function(a,b) {
            //console.log('sort a', a.phraseId, a.successRate);
            //console.log('sort b', b.phraseId, b.successRate);
            return (a.successRate > b.successRate) ? 1 : ((a.successRate > b.successRate) ? -1 : 0);
        });
        // CHECK ERROR
        res.send({'total': results.length, 'details': stats});
    });
}

//var handleStatsReply = function(err, results) {
  //  console.log('GOT REPLY');
//    console.log(err, results);
//

var handleReply = function(err, results) {
    // TODO handle err
    phraseBank = results;
    //console.log(phraseBank);
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