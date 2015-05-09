var gulp = require('gulp');
var jshint = require('gulp-jshint');
var shell = require('gulp-shell');

gulp.task('jshint', function ( ) {
  gulp.src([
    'index.js'
  ])
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jshint.reporter('fail'));
});

gulp.task('test', shell.task([
  './node_modules/tape/bin/tape test/*.js'
]));

gulp.task('default', [ 'test', 'jshint' ], function ( ) {

});
