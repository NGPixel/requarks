var gulp = require("gulp");
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');

var paths = {
  scripts: ['./client/js/**/*.js']
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

gulp.task("scripts", function () {
  return gulp.src(paths.scripts)
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest("./assets/js"));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['watch', 'scripts', 'server']);
gulp.task('setup', ['watch', 'scripts','server-setup']);