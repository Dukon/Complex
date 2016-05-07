var gulp = require('gulp'),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	connect = require('gulp-connect'),
	uncss = require('gulp-uncss'),

	less = require('gulp-less');


//Connect
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

//Build
gulp.task('build', function (){
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulpif('*.js',uglify()))
		.pipe(gulpif('*.css', cleanCSS()))
		.pipe(gulp.dest('dist'));
})

//clean-CSS
gulp.task('mini', function(){
	gulp.src('app/css/*.css')
		.pipe(uncss({
				html : ['app/*.html']
			}))
		.pipe(cleanCSS())
		.pipe(gulp.dest('app/css/min'))
});

//LESS
gulp.task('less', function () {
  return gulp.src('./less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./app/css'))
    .pipe(connect.reload());
});

//HTML
//Build
gulp.task('html', function (){
	return gulp.src('app/*.html')
		.pipe(connect.reload());
	});


//watch
gulp.task('watch', function() {
   gulp.watch('less/*.less',['less'])
   gulp.watch('app/*.html',['html'])
});


gulp.task('default', ['connect', 'less','html','watch']);