//

const gulp = require('gulp')
	, uglify = require('gulp-uglify');


gulp.task('uglify', () => {
	return gulp.src('./src/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('./build'))

});

gulp.task('default', ['uglify']);