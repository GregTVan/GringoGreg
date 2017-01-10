'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var open = require('gulp-open');

var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

var config = {
    // gulp demands Unix-style slashes, even in Windows
    // if this dir is unknown, gulp.src will silently fail
    bootstrapDirectory: 'node_modules/bootstrap/dist/css'
    //port: 8005,
    //url: 'http://localhost',
};

gulp.task('connect', function() {
    connect.server({
        root: ['../dist'],
        port: 8005,
        base: 'http://localhost',
        livereload: true
    })
});

gulp.task('css', function() {
    gulp.src([config.bootstrapDirectory + '/bootstrap.min.css', config.bootstrapDirectory + '/bootstrap-theme.min.css'])
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('../dist/css'))
        .pipe(connect.reload());
});

gulp.task('html', function() {
    gulp.src('html/*.html')
        .pipe(gulp.dest('../dist/html'))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    browserify('client/src/js/test.js')
        .transform(reactify)
        .bundle()
        //.on('error', console.error.bind(console))
        .on('error', function(err) {
            console.log(err.stack);
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('../dist/js'))
        .pipe(connect.reload());  
});

// this doesn't work !!! FFS, and it never has
gulp.task('open', ['connect'], function() {
    gulp.src('../dist/index.html')
        .pipe(open({
            uri: 'http://localhost:8005/',
            app: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
        })
    );
});

// this does work though -- nice!
gulp.task('watch', function() {
    gulp.watch('client/src/html/*.html', ['html']);
    gulp.watch('client/src/js/*.js', ['js']);
    
});

gulp.task('default', ['css', 'html', 'js', 'open', 'watch']);

/*
http://stackoverflow.com/questions/24468310/how-do-i-output-gulp-results-to-console
gulp.task('test', function() {
    var a = gulp.src([config.bootstrapDirectory + '/bootstrap.min.css', config.bootstrapDirectory + '/bootstrap-theme.min.css']);
    a.on('data', function(chunk) {
        var contents = chunk.contents.toString().trim(); 
        var bufLength = process.stdout.columns;
        var hr = '\n\n' + Array(bufLength).join("_") + '\n\n'
        if (contents.length > 1) {
            process.stdout.write(chunk.path + '\n' + contents + '\n');
            process.stdout.write(chunk.path + hr);
        }
    });
});


*/