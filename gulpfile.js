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
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');

/**
 * Paths
 *
 * @type       {Object}
 */
var paths = {
	libsscripts: [
		'./client/js/libs/modernizr-custom.min.js',
      './client/js/libs/lodash.min.js',
      './client/js/libs/jquery.min.js',
      './client/js/libs/bluebird.min.js',
      './client/js/libs/moment.min.js',
      './client/js/libs/typeahead.bundle.min.js',
      './client/js/libs/medium-editor.min.js',
      './client/js/libs/medium-autolist.min.js',
      './client/js/libs/me-markdown.standalone.min.js',
      './client/js/libs/vue.min.js',
      './client/js/libs/dropzone.min.js',
      './client/js/libs/clusterize.min.js',
      './client/js/libs/pikaday.min.js',
      './client/js/libs/faker.js' // REMOVE BEFORE RELEASE
	],
	compscripts: ['./client/js/components/**/*.js'],
	pagescripts: ['./client/js/*.js'],
	libscss: ['./client/css/libs/*.css'],
	appscss: ['./client/css/app.scss'],
	appscsswatch: ['./client/css/**/*.scss'],
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
gulp.task('server', ['scripts', 'css'], function() {
	nodemon({
		script: './bin/www',
		args: ["80", "app"],
		ignore: ['assets/', 'client/', 'tests/'],
		ext: 'js json',
		env: { 'NODE_ENV': 'development' }
	});
});

/**
 * TASK - Start setup server in development mode
 */
gulp.task('server-setup', ['scripts', 'css'], function() {
	nodemon({
		script: './bin/www',
		args: ["80", "setup"],
		ignore: ['assets/', 'client/', 'tests/'],
		ext: 'js',
		env: { 'NODE_ENV': 'development' }
	});
});

/**
 * TASK - Process all scripts processes
 */
gulp.task("scripts", ['scripts-libs', 'scripts-components', 'scripts-page']);

/**
 * TASK - Combine js libraries
 */
gulp.task("scripts-libs", function () {
	return gulp.src(paths.libsscripts)
	.pipe(plumber())
	.pipe(concat('libs.js'))
	.pipe(uglify({ mangle: false }))
	.pipe(plumber.stop())
	.pipe(gulp.dest("./assets/js"));
});

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
 * TASK - Process all css processes
 */
gulp.task("css", ['css-libs', 'css-app']);

/**
 * TASK - Combine css libraries
 */
gulp.task("css-libs", function () {
	return gulp.src(paths.libscss)
	.pipe(plumber())
	.pipe(concat('libs.css'))
	.pipe(cleanCSS({ keepSpecialComments: 0 }))
	.pipe(plumber.stop())
	.pipe(gulp.dest("./assets/css"));
});

/**
 * TASK - Combine app css
 */
gulp.task("css-app", function () {
	return gulp.src(paths.appscss)
	.pipe(plumber())
	.pipe(sass({ outputStyle: 'compressed' }))
	.pipe(concat('app.css'))
	.pipe(cleanCSS({ keepSpecialComments: 0 }))
	.pipe(plumber.stop())
	.pipe(gulp.dest("./assets/css"));
});

/**
 * TASK - Start dev watchers
 */
gulp.task('watch', function() {
	gulp.watch([paths.compscripts, paths.pagescripts], ['scripts-components', 'scripts-page']);
	gulp.watch([paths.appscsswatch], ['css-app']);
});

/**
 * TASK - Starts development server with watchers
 */
gulp.task('default', ['watch', 'server']);

/**
 * TASK - Starts setup development server with watchers
 */
gulp.task('setup', ['watch', 'server-setup']);

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