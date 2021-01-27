'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let server = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src('source/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('source/'));
});

gulp.task('refresh', function (done) {
    server.reload();
    done();
});

gulp.task('server', function () {
    server.init({
        server: 'source/',
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch('source/*.scss', gulp.series('sass', 'refresh'));
    gulp.watch('source/*.html', gulp.series('refresh'));
    gulp.watch('source/*.js', gulp.series('refresh'));
});


gulp.task('start', gulp.series('sass', 'server'));
