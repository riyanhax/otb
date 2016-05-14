var gulp         = require('gulp');
var browserSync = require('browser-sync');
var stylus       = require('gulp-stylus');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var plumber      = require('gulp-plumber');
var rigger       = require('gulp-rigger');
var reload      = browserSync.reload;



// Templates
gulp.task('html', function () {
  return gulp.src('./dev/index.html')
    .pipe(rigger())
    .pipe(gulp.dest('./app/'));
});
gulp.task('html-watch', ['html'], reload);



// Javascript
gulp.task('js', function () {
  return gulp.src('./dev/scripts/*.js')
    .pipe(gulp.dest('./app/scripts/'));
});
gulp.task('js-watch', ['js'], reload);

// Images
gulp.task('images', function(){
  return gulp.src('./dev/images/**/*')
    .pipe(gulp.dest('./app/images/'));
});
gulp.task('images-watch', ['images'], reload);

// Styles: app
gulp.task('styles', function(){
  gulp.src(['./dev/styles/app.styl'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(autoprefixer({
      browsers: [ 'last 2 versions', 'safari 5', 'ie 9', 'ios 6', 'android 4' ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/styles/'))
    .pipe(reload({ stream:true }));
});
gulp.task('styles-watch', ['styles'], reload);

// Styles: vendor
gulp.task('vendor', function () {
  return gulp.src('./dev/styles/vendor.css')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(gulp.dest('./app/styles/'))
    .pipe(reload({ stream:true }));
});
gulp.task('vendor-watch', ['vendor'], reload);

// Local serve and watching
gulp.task('serve', ['html', 'js', 'images', 'styles', 'vendor'], function() {
    // Serve files from the root of this project
    browserSync.init({
        open: false,
        notify: true,
        tunnel: false,
        server: {
            baseDir: "./app"
        }
    });

    gulp.watch("dev/index.html", ['html-watch']);
    gulp.watch("dev/html-modules/*.html", ['html-watch']);
    gulp.watch("dev/scripts/*.js", ['js-watch']);
    gulp.watch("dev/images/**.*", ['images-watch']);
    gulp.watch("dev/styles/**/*.styl", ['styles-watch']);
    gulp.watch("dev/styles/vendor.css", ['vendor-watch']);
});

// Default
gulp.task('default', ['serve']);