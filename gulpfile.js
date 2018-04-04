// Dependencies
var gulp = require('gulp');
var deploy = require('gulp-gh-pages');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
 
// Task
gulp.task('default', function() {
	// listen for changes
	livereload.listen();
	// configure nodemon
	nodemon({
		// the script to run the app
		script: 'server.js',
		ext: 'js html css',
		ignore: [
			'gulpfile.js',
			'node_modules/'
		  ]
	}).on('restart', function(){
		// when the app has restarted, run livereload.
		gulp.src('server.js')
			.pipe(livereload())
			//.pipe(notify('Reloading page, please wait...'));
	})
});

gulp.task('deploy', function () {
	return gulp.src("./**/*")
	  .pipe(deploy())
  });
