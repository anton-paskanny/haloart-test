const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const pug = require('gulp-pug');
const uglify = require('gulp-uglify');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		},
		notify: false
	});
});

gulp.task('img', function(){
	return gulp.src('./app/img/**/*')
		.pipe(gulp.dest('./dist/img'))
});

gulp.task('fonts', function(){
	return gulp.src('./app/fonts/**/*')
		.pipe(gulp.dest('./dist/fonts'))
});

gulp.task('copy', ['img', 'fonts']);

gulp.task('scripts', function() {
		return gulp.src('./app/scripts/*')
			.pipe(uglify())
			.pipe(concat('index.min.js'))
			.pipe(gulp.dest('./dist/scripts'))
			.pipe(browserSync.reload({stream: true}))
});

gulp.task('styles', function() {
	return gulp.src('./app/styles/style.scss')
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['> 1%', 'ie 9-11']
		}))
		.pipe(csso())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('./dist/styles'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function() {
	return gulp.src('./app/styles/style.scss')
		.pipe(sass())
		.pipe(gulp.dest('./app/styles'))
});

gulp.task('pug', function() {
  return gulp.src('./app/pages/*.pug')
  .pipe(pug({pretty: true}))
	.pipe(gulp.dest('./dist'))
});

gulp.task('watcher', ['browser-sync', 'pug', 'styles', 'scripts'], function(){
	gulp.watch('app/blocks/**/*/*', ['pug']);
	gulp.watch('app/pages/*.pug', ['pug']);
  gulp.watch('app/blocks/**/*/*.scss', ['styles']);
	gulp.watch('app/styles/helpers/*.scss', ['styles']);
	gulp.watch('app/styles/style.scss', ['styles']);
	gulp.watch('app/scripts/*', ['scripts']);
	gulp.watch('dist/*.html', browserSync.reload);
});

gulp.task('default', ['watcher']);
