var gulp = require("gulp");
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');

var paths = {
	compscripts: ['./client/js/components/**/*.js'],
	pagescripts: ['./client/js/*.js']
};

gulp.task('server', function() {
	nodemon({
		script: './bin/www',
		args: ["80", "app"],
		ignore: ['assets/', 'client/'],
		ext: 'js json',
		env: { 'NODE_ENV': 'development' }
	});
});

gulp.task('server-setup', function() {
	nodemon({
		script: './bin/www',
		args: ["80", "setup"],
		ignore: ['assets/', 'client/'],
		ext: 'js',
		env: { 'NODE_ENV': 'development' }
	});
});

gulp.task("scripts", ['scripts-components', 'scripts-page']);
gulp.task("scripts-components", function () {
	return gulp.src(paths.compscripts)
	.pipe(plumber())
	.pipe(concat('components.js'))
	.pipe(babel())
	.pipe(uglify())
	.pipe(plumber.stop())
	.pipe(gulp.dest("./assets/js"));
});
gulp.task("scripts-page", function () {
	return gulp.src(paths.pagescripts)
	.pipe(plumber())
	.pipe(babel())
	.pipe(uglify())
	.pipe(plumber.stop())
	.pipe(gulp.dest("./assets/js"));
});

gulp.task('watch', function() {
	gulp.watch([paths.compscripts, paths.pagescripts], ['scripts']);
});

gulp.task('default', ['watch', 'scripts', 'server']);
gulp.task('setup', ['watch', 'scripts','server-setup']);