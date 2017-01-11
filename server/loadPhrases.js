var mongo = require('mongodb').MongoClient;

var phrases = [{
    'en': 'I\'ll go tomorrow.',
    'es': 'Iré mañana.'
},{
    'en': 'See you later.',
    'es': 'Hasta luego'
}];

mongo.connect('mongodb://GregTomkins:samft99@ds159978.mlab.com:59978/gringogreg', function (err, database) {
    if(err) console.log(err);
    else console.log('connected to mongo');
    database.collection('phrases').remove({});
    database.collection('phrases').insertMany(phrases, function(err, result) {
        if(err) console.log(err);
        else console.log('load completed');
        process.exit();
    });
});