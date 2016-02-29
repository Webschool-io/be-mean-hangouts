

'use strict';


const cp      = require('child_process'),
      gulp    = require('gulp'),
      browserSync = require('browser-sync'),
      plumber = require('gulp-plumber'),
      stylus  = require('gulp-stylus'),
      imagemin = require('gulp-imagemin');


gulp.task('jekyll-build', done => {
	return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
		      .on('close', done);
});

gulp.task('imagemin', () => {
  return gulp.src('src/img/**/*.{jpg,png,gif}')
          .pipe(plumber())
          .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
          }))
          .pipe(gulp.dest('_site/assets/img/'))
          .pipe(browserSync.reload({
            stream:true
          }))
          .pipe(gulp.dest('assets/img/'));
});

gulp.task('stylus', () => {
  return gulp.src('src/styl/main-stylus.styl')
		      .pipe(plumber())
		      .pipe(stylus({
			      compress: true
		      }))
		      .pipe(gulp.dest('_site/assets/css/'))
          .pipe(browserSync.reload({
            stream:true
          }))
		      .pipe(gulp.dest('assets/css/'));
});

gulp.task( 'server', ['jekyll-build'], () => {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});

gulp.task('watch', () => {
  gulp.watch('src/styl/**/*', ['stylus']);
  gulp.watch('src/img/**/*.{jpg,png,gif}', ['imagemin']);
});


gulp.task('default', ['stylus', 'imagemin', 'server', 'watch']);
