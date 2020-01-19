var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass:build', function(){
    return gulp.src('./style/sass/*')
      .pipe(sass()) // Converts Sass to CSS with gulp-sass
      .pipe(gulp.dest('./style/css'))
});

gulp.task('sass:watch', function(){
    gulp.watch('./style/sass/*', gulp.task('sass:build'));
});