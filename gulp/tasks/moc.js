const gulp = require('gulp');
const config = require('../config');
const runSequence = require('run-sequence');
const rimraf = require('rimraf');
const $ = require("gulp-load-plugins")();
const assemble = require('assemble');
const gulpAssemble = require('../../');
const extname = require('gulp-extname');

gulp.task('moc.clean', function (cb) {
    return rimraf(config.moc.dest, cb);
});

gulp.task('moc.assemble', function () {
    assemble.data([config.moc.entry + 'data/*.{json,yml}']);
    assemble.layouts([config.moc.entry + 'layouts/*.hbs']);
    assemble.partials([config.moc.entry + 'includes/*.hbs']);
    return gulp.src(config.moc.entry + 'pages/*.hbs')
        .pipe(gulpAssemble(assemble, {layout: 'default'}))
        .pipe(extname())
        .pipe(gulp.dest(config.moc.dest));
});

gulp.task('moc.prettify', function () {
    return gulp.src(config.moc.dest + '*.html')
        .pipe($.prettify({indent_size: 2}))
        .pipe(gulp.dest(config.moc.dest))
});

gulp.task('moc.build', function () {
    runSequence(
        'moc.clean',
        'moc.assemble',
        ['browserSync.reload', 'moc.prettify']
    );
});