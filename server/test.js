console.log('testing jsdom, pdf-text, request...');

var pdfText = require('pdf-text')
 
var pathToPdf = 'c:/temp/31.pdf';
 
pdfText(pathToPdf, function(err, chunks) {
    var inExercises = false, inAnswers = false;
    for(var i=0;i<chunks.length;i++) {
        var chunk = chunks[i].trim().toLowerCase();
        //console.log(chunk);
        if(chunk === 'ejercicios:') {
            inExercises = true;
            continue;
        }
        if(chunk === 'respuestas') {
            inExercises = false;
            inAnswers= true;
            continue;
        }
        if(inExercises) {
            console.log('ex:' + chunk);
        }
        if(inAnswers) {
            console.log('ans:' + chunk);
        }
    }
  //chunks is an array of strings  
  //loosely corresponding to text objects within the pdf 
 
  //for a more concrete example, view the test file in this repo 
})

/* 
//or parse a buffer of pdf data 
//this is handy when you already have the pdf in memory 
//and don't want to write it to a temp file 
var fs = require('fs')
var buffer = fs.readFileSync(pathToPdf)
pdfText(buffer, function(err, chunks) {
 
})*/

console.log('complete!');

// TODO: do NOT ignore case when storing
// TODO: think about tildes