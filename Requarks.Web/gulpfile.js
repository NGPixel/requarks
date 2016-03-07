var gulp = require("gulp");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

var paths = {
  scripts: ['./client/js/**/*.js']
};

gulp.task("scripts", function () {
  return gulp.src(paths.scripts)
    .pipe(babel())
    .pipe(concat("main.min.js"))
    .pipe(gulp.dest("./assets/js"));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['watch', 'scripts']);