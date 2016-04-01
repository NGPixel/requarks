var gulp = require("gulp");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');

var paths = {
  scripts: ['./client/js/**/*.js']
};

gulp.task('server', function() {
	nodemon({
		script: './bin/www',
		ignore: ['assets/', 'client/'],
		ext: 'js',
		env: { 'NODE_ENV': 'development' }
	});
});

gulp.task('server-setup', function() {
	nodemon({
		script: './bin/setup',
		ignore: ['assets/', 'client/'],
		ext: 'js',
		env: { 'NODE_ENV': 'development' }
	});
});

gulp.task("scripts", function () {
  gulp.src(paths.scripts)
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest("./assets/js"));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['watch', 'scripts', 'server']);
gulp.task('setup', ['watch', 'scripts','server-setup']);