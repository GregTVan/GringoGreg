var mongo = require('mongodb').MongoClient;

var phrases = [];

phrases.push({
    en: 'The Roman empress, Valeria, was emperor Claudio\'s third wife.',
    es: 'La emperatriz romana, Valeria, fue la tercera mujer del emperador Claudio.',
    source: 'lss-ss-31-1' });

phrases.push({
    en: 'The voiceover actors and actresses received many awards this year.',
    es: 'Los actores y actrices de doblaje recibieron muchos premios este año.',
    source: 'lss-ss-31-2' });

phrases.push({
    en: 'My sons\' teacher used to be a nurse.',
    es: 'La profesora de mis hijos solía ser/era una enfermera.',
    source: 'lss-ss-31-3' });

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