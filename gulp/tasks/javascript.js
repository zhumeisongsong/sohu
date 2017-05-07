const gulp = require('gulp');
const config = require('../config');
const $ = require('gulp-load-plugins')();
const runSequence = require('run-sequence');
const rimraf = require('rimraf');
const concat = require('gulp-concat-util');

gulp.task('js.clean', function (cb) {
    return rimraf(config.js.dest, cb);
});

gulp.task('js.vendor', function () {
    return gulp.src([
        config.js.entry + 'vendor/jquery-2.0.3.min.js',
        config.js.entry + 'vendor/handlebars-v4.0.5.js',
        config.js.entry + 'vendor/mui.min.js',
        config.js.entry + 'vendor/swiper.jquery.min.js',
        config.js.entry + 'vendor/jQuery.md5.js'
    ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(config.js.dest));
});

gulp.task('js.app', function () {
    return gulp.src([
        config.js.entry + 'app/config.js',
        config.js.entry + 'app/app.js',
        config.js.entry + 'app/util/*.js',
        config.js.entry + 'app/api/*.js',
        config.js.entry + 'app/page/*.js'
    ])
        .pipe(concat('app.js', {
            process: function (src, filePath) {
                // if you need the filename, example `myFileJs.js`, path.basename( filePath, '.js' )
                return (src.trim() + '\n').replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
            }
        }))
        .pipe(concat.header('(function(window, document, undefined) {\n\'use strict\';\n'))
        .pipe(concat.footer('\n})(window, document);\n'))
        .pipe(gulp.dest(config.js.dest));
});


// gulp.task('js.min', function () {
//     return gulp.src(config.js.dest+'*')
//         .pipe($.jsmin())
//         .pipe($.rename({
//             suffix: '.min'
//         }))
//         .pipe(gulp.dest(config.js.dest));
// })

gulp.task('js.build', function () {
    runSequence(
        'js.clean',
        ['browserSync.reload', 'js.app', 'js.vendor']
    );
});