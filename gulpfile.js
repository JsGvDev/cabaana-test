var gulp = require('gulp');

//CONCAT
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
gulp.task('concat', function() {
  return gulp.src(['./source/js/**/*.js', './source/lib/**/*.js', '!./source/js/index.js'])
    .pipe(babel({
          presets: ['es2015']
    }))
    .pipe(concat('index.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./source/js/'));
});
//CSS-Lint
var csslint = require('gulp-csslint');
var gutil = require('gulp-util');
var myCustomReporterCss = function(file) {
  gutil.log(gutil.colors.cyan(file.csslint.errorCount)+' errors in '+gutil.colors.magenta(file.path));

  file.csslint.results.forEach(function(result) {
    gutil.log(result.error.message+' on line '+result.error.line);
  });
};
gulp.task('css-lint', function() {
  gulp.src('./source/sass/index.css')
    .pipe(csslint())
    .pipe(csslint.reporter(myCustomReporterCss));
});
//SCSS-Lint
var scsslint = require('gulp-scss-lint');
var myCustomReporterScss = function(file) {
  if (!file.scsslint.success) {
    gutil.log(file.scsslint.issues.length + ' issues found in ' + file.path);
  }
};
gulp.task('scss-lint', function() {
  return gulp.src('./source/sass/**/*.scss')
    .pipe(scsslint({
        customReport: myCustomReporterScss
    }));
});
//SASS
var sass = require('gulp-sass');
gulp.task('sass', function () {
  return gulp.src('./source/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});
gulp.task('sass:watch', function () {
  gulp.watch('./source/sass/**/*.scss', ['sass']);
});


gulp.task('default', ['sass']);
