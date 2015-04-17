var gulp = require('gulp');
var rimraf = require('rimraf');
var sass = require('gulp-ruby-sass');
var gulpkss = require('gulp-kss');
var pleeease = require('gulp-pleeease');
var plumber = require('gulp-plumber');
//var spritesmith = require('gulp.spritesmith');

//Clean out the current documentation folder
gulp.task('clean', function (cb) {
    rimraf('public/styleguide/**/*', cb);
});

gulp.task('sass', function () {
    return sass('src/common/scss/',
        {
            compass: true
        })
        .pipe(plumber())
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(gulp.dest('public/common/css'));
});

/*gulp.task('sprite', function () {
    var spriteData = gulp.src('public/common/images/sprite*//*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.scss',
            imgPath: '/common/images/sprite.png',
            cssFormat: 'scss'
        }));

    spriteData.img
        .pipe(gulp.dest('public/common/images/'));

    spriteData.css
        .pipe(gulp.dest('src/common/scss/yass/mixins/'));
});*/

gulp.task('kss', ['sass'], function () {
    gulp.src(['src/common/scss/**/*.scss'])
        .pipe(gulpkss({
            overview: 'src/common/template/styleguide.md',
            templateDirectory: 'src/common/template/'
            //kss: Options supported by KSS-Node (https://github.com/hughsk/kss-node)
        }))
        .pipe(gulp.dest('public/styleguide/'));Modifier
});

gulp.task('ple', ['sass'], function () {
    return gulp.src('public/common/css/*.css')
        .pipe(pleeease({
            'sass': true,
            'autoprefixer': {'browsers': ['last 3 versions', 'ie 8', 'ios 4', 'android 2.3']},
            'minifier': false,
            'mqpacker': true
        }))
        .pipe(gulp.dest('public/common/css/'));
});

gulp.task('default', ['clean', 'sass', 'kss', 'ple']);
