/// <binding AfterBuild='run' ProjectOpened='sass:watch, ts:watch' />
var gulp = require('gulp'),
	childProcess = require('child_process'),
	electron = require('electron-prebuilt'),
	merge2 = require('merge2'),
	sass = require('gulp-sass'),
	ts = require('gulp-typescript'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	dotify = require('gulp-dotify-json'),
	googleWebFonts = require('gulp-google-webfonts');

// ================================
// SASS / CSS
// ================================

gulp.task('sass', function () {
	return gulp.src([
		'./app/node_modules/react-flex/index.css',
		'./app/styles/app.scss'
	]).pipe(sass({ outputStyle: 'compressed', outFile: 'app.min.css', omitSourceMapUrl: true }).on('error', sass.logError))
	.pipe(concat('app.min.css'))
  .pipe(gulp.dest('./app/styles'));
});

gulp.task('css-libs', function () {
	return gulp.src([
		'./node_modules/font-awesome/css/font-awesome.min.css',
		'./app/node_modules/medium-editor/dist/css/medium-editor.min.css',
		'./app/node_modules/medium-editor/dist/css/themes/beagle.min.css',
		'./app/node_modules/react-datagrid/index.css'
	]).pipe(concat('libs.min.css')).pipe(gulp.dest('./app/styles'));
});

gulp.task('css-fonts', function () {
	return gulp.src([
		'./node_modules/font-awesome/fonts/*.woff2',
		'./node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff2'
	]).pipe(gulp.dest('./app/fonts'));
});

gulp.task('fonts', function () {
	return gulp.src('./fonts.list')
		.pipe(googleWebFonts({}))
		.pipe(gulp.dest('./app/fonts'));
});

// ================================
// LOCALES
// ================================

gulp.task('intl', function () {
	return gulp.src([
		'./app/intl/*.json'
	]).pipe(dotify())
  .pipe(gulp.dest('./app/intl/flattened'));
});

// ================================
// JS / Typescript
// ================================

var tsProject = ts.createProject({
	"target": "es5",
	"module": "commonjs",
	"moduleResolution": "node",
	"isolatedModules": false,
	"jsx": "react",
	"experimentalDecorators": true,
	"emitDecoratorMetadata": true,
	"declaration": false,
	"noImplicitAny": false,
	"removeComments": true,
	"noLib": false,
	"preserveConstEnums": true,
	"suppressImplicitAnyIndexErrors": true
});

gulp.task('typescript', function () {
	var tsResult = gulp.src(['./app/**/*.ts', './app/**/*.tsx', './typings/**/*.d.ts']).pipe(ts(tsProject));
	return tsResult.js.pipe(gulp.dest('./app'));
});

/*gulp.task('js-libs', function () {
	return gulp.src([
		'./node_modules/jquery/dist/jquery.min.js',
		'./node_modules/lodash-modern/lodash.min.js',
		'./node_modules/react/dist/react-with-addons.min.js',
		'./node_modules/react-dom/dist/react-dom.min.js',
		'./node_modules/moment/min/moment.min.js'
	]).pipe(concat('libs.min.js')).pipe(gulp.dest('./app/js'));
});*/

// ================================
// WATCHERS
// ================================

gulp.task('sass:watch', function () {
	gulp.watch('./app/styles/**/*.scss', ['sass']);
});

//gulp.task('ts:watch', function () {
//	gulp.watch(['./source/js/**/*.ts', './source/js/**/*.tsx'], ['typescript']);
//});

// ================================
// PREPARE
// ================================

gulp.task('prepare', ['build'], function () {

	return gulp.src([
		'./node_modules/material-ui/lib/**/*.*',
		'./node_modules/classnames/*.*',
	], { base: './node_modules/'}).pipe(gulp.dest('./app/node_modules'));

});

// ================================
// BUILD
// ================================

gulp.task('build', ['sass', 'intl', 'css-libs', 'css-fonts', 'fonts']);

// ================================
// RUN
// ================================

gulp.task('default', ['run']);
gulp.task('run', ['build'], function () {
	childProcess.spawn(electron, ['./app'], { stdio: 'inherit' });
});

// ================================
// PACKAGE
// ================================

var release_windows = require('./build.windows');
var os = require('os');

gulp.task('build-electron', ['build'], function () {
	switch (os.platform()) {
		case 'darwin':
			// execute build.osx.js
			break;
		case 'linux':
			//execute build.linux.js
			break;
		case 'win32':
			return release_windows.build();
	}
});
