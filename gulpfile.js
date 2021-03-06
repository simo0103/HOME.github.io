var gulp = require("gulp");
var sass = require("gulp-sass");

gulp.task("sass:build", function () {
  return gulp
    .src("./src/style/sass/*")
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest("./src/style/css"));
});

gulp.task("sass:watch", function () {
  gulp.watch("./src/style/sass/*", gulp.task("sass:build"));
});
