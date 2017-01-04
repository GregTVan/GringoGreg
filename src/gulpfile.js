'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');

var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('connect', function() {
    connect.server({
        root: ['../dist'],
        port: 8005,
        base: 'http://localhost',
        livereload: true
    })
});

gulp.task('html', function() {
    gulp.src('html/*.html')
        .pipe(gulp.dest('../dist/html'))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    browserify('js/test.js')
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('../dist/js'))
        .pipe(connect.reload());  
});

gulp.task('open', ['connect'], function() {
    gulp.src('../dist/index.html')
        .pipe(open({
            uri: 'http://localhost:8005/',
            app: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
        })
    );
});

gulp.task('watch', function() {
    gulp.watch('html/*.html', ['html']);
    gulp.watch('js/*.js', ['js']);
});

gulp.task('default', ['html', 'js', 'open', 'watch']);