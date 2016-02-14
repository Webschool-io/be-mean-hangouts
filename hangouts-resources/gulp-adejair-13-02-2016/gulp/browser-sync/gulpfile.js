//

'use strict';

const gulp = require('gulp')
	, browserSync = require('browser-sync');

gulp.task('sync', () => {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
});


gulp.watch('./*.html').on('change', browserSync.reload);

gulp.task('default', ['sync']);