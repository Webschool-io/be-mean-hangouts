//

const gulp = require('gulp')
	, uglify = require('gulp-uglify')
	, css = require('gulp-minify-css')
	, imagemin = require('gulp-imagemin');


const directory = ['./statics/js/*.js', './statics/js/**/*.js', './statics/js/**/**/*.js'];


gulp.task('uglify', () => {
	return gulp.src(directory)
	.pipe(uglify())
	.pipe(gulp.dest('./build/statics/js'))
});

gulp.task('min-css', () => {
	return gulp.src('./statics/css/*.css')
	.pipe(css())
	.pipe(gulp.dest('./build/statics/css'))
});


gulp.task('min-image', () => {
	return gulp.src('./statics/img/logo.png')
	.pipe(css())
	.pipe(gulp.dest('./build/statics/img'))
});


gulp.task('default', ['uglify', 'min-css', 'min-image']);