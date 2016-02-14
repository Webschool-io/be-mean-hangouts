//

'use strict';

const gulp = require('gulp')
	, stylus = require('gulp-stylus');


gulp.task('compile-stylus', () => {
	return gulp.src('./styl/*.styl')
	.pipe(stylus())
	.pipe(gulp.dest('./css'))
});


gulp.task('default', ['compile-stylus']);