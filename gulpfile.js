var gulp = require("gulp");
var merge = require('merge-stream');
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var zip = require('gulp-zip');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');

/**
 * Paths
 *
 * @type       {Object}
 */
var paths = {
	compscripts: ['./client/js/components/**/*.js'],
	pagescripts: ['./client/js/*.js'],
	deploypackage: [
		'./**/*',
		'!node_modules', '!node_modules/**',
		'!coverage', '!coverage/**',
		'!client/js', '!client/js/**',
		'!dist', '!dist/**',
		'!tests', '!tests/**',
		'!gulpfile.js', '!inch.json', '!config.json'
	]
};

/**
 * TASK - Starts server in development mode
 */
gulp.task('server', function() {
	nodemon({
		script: './bin/www',
		args: ["80", "app"],
		ignore: ['assets/', 'client/'],
		ext: 'js json',
		env: { 'NODE_ENV': 'development' }
	});
});

/**
 * TASK - Start setup server in development mode
 */
gulp.task('server-setup', function() {
	nodemon({
		script: './bin/www',
		args: ["80", "setup"],
		ignore: ['assets/', 'client/'],
		ext: 'js',
		env: { 'NODE_ENV': 'development' }
	});
});

/**
 * TASK - Process all scripts processes
 */
gulp.task("scripts", ['scripts-components', 'scripts-page']);

/**
 * TASK - Combine, make compatible and compress js components
 */
gulp.task("scripts-components", function () {
	return gulp.src(paths.compscripts)
	.pipe(plumber())
	.pipe(concat('components.js'))
	.pipe(babel())
	.pipe(uglify())
	.pipe(plumber.stop())
	.pipe(gulp.dest("./assets/js"));
});

/**
 * TASK - Combine, make compatible and compress js page scripts
 */
gulp.task("scripts-page", function () {
	return gulp.src(paths.pagescripts)
	.pipe(plumber())
	.pipe(babel())
	.pipe(uglify())
	.pipe(plumber.stop())
	.pipe(gulp.dest("./assets/js"));
});

/**
 * TASK - Start watchers
 */
gulp.task('watch', function() {
	gulp.watch([paths.compscripts, paths.pagescripts], ['scripts']);
});

/**
 * TASK - Starts development server with watchers
 */
gulp.task('default', ['watch', 'scripts', 'server']);

/**
 * TASK - Starts setup development server with watchers
 */
gulp.task('setup', ['watch', 'scripts','server-setup']);

/**
 * TASK - Creates deployment packages
 */
gulp.task('deploy', function() {
	var zipStream = gulp.src(paths.deploypackage)
		.pipe(zip('requarks.zip'))
		.pipe(gulp.dest('dist'));

	var targzStream = gulp.src(paths.deploypackage)
		.pipe(tar('requarks.tar'))
		.pipe(gzip())
		.pipe(gulp.dest('dist'));

	return merge(zipStream, targzStream);
});