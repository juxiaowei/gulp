'use strict';
// import package
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    open = require('gulp-open'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean'),
    sftp = require('gulp-sftp'),
    zip = require('gulp-zip'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    config     = require('./config.json'),
    htmlmin = require('gulp-htmlmin')
    ;
// compass task
gulp.task('sass', function() {
    return sass('src', { sourcemap: true ,style:'compressed',compass:true})//compressed : nested expanded compact compressed
        .on('error', function (err) {
            console.error('Error', err.message);
        })
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('maps', {
            includeContent: false,
            sourceRoot: 'src'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(livereload())
        .pipe(connect.reload())
        .pipe(notify({ message: 'sass task complete' }));
});
// script task
gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(livereload())
        .pipe(connect.reload())
        .pipe(notify({ message: 'Scripts task complete' }));
});
// images task
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/images/'))
        .pipe(livereload())
        .pipe(connect.reload())
        .pipe(notify({ message: 'Images task complete' }));
});
// html task
gulp.task('minify', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
        .pipe(livereload())
        .pipe(connect.reload())
        .pipe(notify({ message: 'minify task complete' }));
});
// clean task
gulp.task('clean', function() {
    return gulp.src(['dist/'], {read: false})
        .pipe(clean())
        .pipe(notify({ message: 'clean task complete' }));
});
// open task
gulp.task('url', function(){
    var options = {
        url: 'http://localhost:8001',
        app: 'google chrome'
    };
    gulp.src('./index.html')
        .pipe(open('', options));
});

// web server
gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        port: config.localserver.port,
        livereload: true
    });
});


// watch task
gulp.task('watch', function() {
    gulp.task('open');
    gulp.watch('src/styles/**/*.scss', ['sass']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/images/**/*', ['images']);
    gulp.watch('src/*.html', ['minify']);

});

// build task
gulp.task('build', function(){
    gulp.run('images');
    gulp.run('sass');
    gulp.run('minify');
});

// default task
gulp.task('default', ['connect', 'watch'],function(){
    notify({ message: 'start working' });
});

// zip task
gulp.task('zip', function(){
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i
        }
        return i
    }

    var d=new Date();
    var year=d.getFullYear();
    var month=checkTime(d.getMonth() + 1);
    var day=checkTime(d.getDate());
    var hour=checkTime(d.getHours());
    var minute=checkTime(d.getMinutes());

    return gulp.src('dist/**')
        .pipe(zip( config.project+'-'+year+month+day +hour+minute+'.zip'))
        .pipe(gulp.dest('dist/'));
});

// upload server task
gulp.task('upload', function () {
    return gulp.src('dist/index.html')
        .pipe(sftp({
            host: config.sftp.host,
            user: config.sftp.user,
            port: config.sftp.port,
            pass: config.sftp.pass,
            remotePath: config.sftp.remotePath
        }));
});

// watch server upload server task
gulp.task('server', function() {
    gulp.task('open');
    gulp.watch('src/styles/**/*.scss', ['sass','upload']);
    gulp.watch('src/scripts/**/*.js', ['scripts','upload']);
    gulp.watch('src/images/**/*', ['images','upload']);
    gulp.watch('src/**/*.html', ['minify','upload']);
});