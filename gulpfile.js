var gulp = require('gulp'),
  serve = require ('gulp-serve'),
  jshint = require('gulp-jshint');

gulp.task('serve', serve('public'));
gulp.task('lint', function () {
  gulp.src('public/scripts/**.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
});
