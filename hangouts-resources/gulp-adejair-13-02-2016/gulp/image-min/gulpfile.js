//

const gulp = require('gulp')
	, imagemin = require('gulp-imagemin');


gulp.task('imagemin', () => {
	return gulp.src('./images/*.png')
	.pipe(imagemin({
		optimizationLevel: 3
	}))
	.pipe(gulp.dest('./image-minify'))
});

gulp.task('default', ['imagemin']);