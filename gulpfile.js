const gulp = require("gulp");
const image = require("gulp-image");
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const sass = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const { src, series, parallel, dest, watch } = require("gulp");

const jsPath = "src/script/**/*.js";
const cssPath = "src/style/css/**/*.css";
const scssPath = "src/style/sass/**/*.scss";

function copyHtml() {
    return src("src/*.html").pipe(gulp.dest("dist"));
}

function imgTask() {
    return src("src/style/images/**/*")
        .pipe(image())
        .pipe(gulp.dest("dist/style/images"));
}

function convertScss() {
    return src(scssPath).pipe(sass()).pipe(gulp.dest("./src/style/css"));
}

function jsTask() {
    return src(jsPath)
        .pipe(sourcemaps.init())
        .pipe(concat("script.js"))
        .pipe(terser())
        .pipe(sourcemaps.write("."))
        .pipe(dest("dist/script"));
}

function cssTask() {
    return src(cssPath)
        .pipe(sourcemaps.init())
        .pipe(concat("style.css"))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write("."))
        .pipe(dest("dist/style/css"));
}

function watchTask() {
    watch(
        [scssPath, jsPath],
        { interval: 1000 },
        series(convertScss, parallel(cssTask, jsTask))
    );
}

exports.cssTask = cssTask;
exports.jsTask = jsTask;
exports.imgTask = imgTask;
exports.copyHtml = copyHtml;
exports.convertScss = convertScss;
exports.default = series(
    parallel(copyHtml, imgTask, jsTask, cssTask),
    watchTask
);
