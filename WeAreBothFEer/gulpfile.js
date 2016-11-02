var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

gulp.task('style', function() {
    var src = './scss/*.scss';
    var dest = './css/';
    gulp.src(src)
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(concat('style.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCss())
        .pipe(gulp.dest(dest));
});

gulp.task('watch', function() {
    gulp.watch('./scss/*.scss', ['style']);
});
gulp.task('default', function() {
    gulp.start('style', 'watch');
});

