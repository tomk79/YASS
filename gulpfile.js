var gulp = require('gulp');
var rimraf = require('rimraf');
var sass = require('gulp-ruby-sass');
var gulpkss = require('gulp-kss');
var pleeease = require('gulp-pleeease');
//var plumber = require('gulp-plumber');

gulp.task('sass', function () {
    return sass('src/common/scss/')
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(gulp.dest('public/common/css'));
});

//Clean out the current documentation folder
gulp.task('clean', function (cb) {
    rimraf('public/styleguide/**/*', cb);
});

gulp.task('kss', ['sass'], function () {
    gulp.src(['src/common/scss/**/*.scss'])
        .pipe(gulpkss({
            overview: 'src/common/template/styleguide.md',
            templateDirectory: 'src/common/template/'
            //kss: Options supported by KSS-Node (https://github.com/hughsk/kss-node)
        }))
        .pipe(gulp.dest('public/styleguide/'));
});

gulp.task('ple', ['sass'], function() {
    return gulp.src('public/common/css/*.css')
        .pipe(pleeease({
            'sass': true,
            'autoprefixer': true,
            'minifier': false,
            'mqpacker': true
        }))
        .pipe(gulp.dest('public/common/css/'));
});

gulp.task('default', ['clean', 'sass', 'kss', 'ple']);
