/*eslint-disable */

const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");
const eslint = require('gulp-eslint');
const jasmineBrowser = require('gulp-jasmine-browser');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');


function reload() {
  browserSync.reload();
}

// monitored file path
var paths = {
  style: {
      
      src: "sass/**/*.scss",
      
      dest: "dist/css"
  },

  lint:{

    src: "js/**/*.js"

  }

};

// gulp.task("styles", function() {
//   console.log('hihihihihihihihi');

//   gulp
//     .src("sass/**/*.scss")
//     .pipe(sass().on("error", sass.logError))
//     .pipe(
//       autoprefixer({
//         browsers: ["last 2 versions"]
//       })
//     )
//     .pipe(gulp.dest("./css"))
//     .pipe(browserSync.stream());

    
// });

function style() {

  return (
      gulp
          .src(paths.style.src)
          // .pipe(sourcemaps.init())
          .pipe(sass())
          .on("error", sass.logError)
          .pipe(
            autoprefixer({
              browsers: ["last 2 versions"]
            })
          )
          // .pipe(postcss([autoprefixer(), cssnano()]))
          // .pipe(sourcemaps.write())
          .pipe(gulp.dest(paths.style.dest))
          .pipe(browserSync.stream())
  );
}

exports.style = style;

function copyHtml() {

  return (
    gulp.src('index.html')
    .pipe(gulp.dest('dist'))
  )

}

exports.copyHtml = copyHtml;

function copyImages() {

  return gulp.src('src/images/*')
  .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
  }))
  .pipe(gulp.dest('dist/images'));

}

exports.copyImages = copyImages;

function lint(){

  return (
    gulp
      .src([paths.lint.src])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError())
  );

}

exports.lint = lint

// gulp.task('lint', function() {
//   return (
//       gulp
//           .src(['js/**/*.js'])
//           // eslint() attaches the lint output to the eslint property
//           // of the file object so it can be used by other modules.
//           .pipe(eslint())
//           // eslint.format() outputs the lint results to the console.
//           // Alternatively use eslint.formatEach() (see Docs).
//           .pipe(eslint.format())
//           // To have the process exit with an error code (1) on
//           // lint error, return the stream and pipe to failOnError last.
//           .pipe(eslint.failOnError())
//   );
// });

function scripts(){
  gulp.src('js/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(concat('all.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist/all.js'));
}

exports.scripts = scripts;

function scriptsDist(){
  gulp.src('js/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(concat('all.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist/all.js'));
}

exports.scriptsDist = scriptsDist;

// gulp.task("default", gulp.series("style", function() {

//   gulp.watch("sass/**/*.scss", ["style"]);

//   browserSync.init({
//     server: "./"
//   });

  
// }));

function watch(){
  style();

  gulp.watch(paths.style.src, style);
  gulp.watch(paths.lint.src, lint);
  gulp.watch("./index.html", copyHtml);
  gulp.watch("./dist/index.html").on('change', browserSync.reload);

  browserSync.init({
    server: "./dist"
  });
}
  
exports.watch = watch

function tests(){

    return gulp
    .src('tests/spec/extraSpec.js')
    .pipe(jasmineBrowser.specRunner({ console: true }))
    .pipe(jasmineBrowser.headless({ driver: 'chrome' }));

}

// gulp.task('tests', function() {
//   return gulp
//       .src(['src/**/*.js', 'spec/**/*_spec.js'])
//       .pipe(jasmineBrowser.specRunner({ console: true }))
//       .pipe(jasmineBrowser.headless({ driver: 'chrome' }));
// });

// function test(){

//   gulp
//   .src(['src/**/*.js', 'spec/**/*_spec.js'])
//   .pipe(jasmineBrowser.specRunner())
//   .pipe(jasmineBrowser.server({ port: 8080 }));

// }

exports.tests = tests

function dist(){

  copyHtml();     //html
  copyImages();   //img
  style();        //css
  lint();         //checking coding style & syntax
  scriptsDist();  //js

}

exports.dist = dist

/*---------------------------------------------------------------*/
//err

// const gulp = require("gulp");
// const sass = require("gulp-sass");
// const autoprefixer = require("gulp-autoprefixer");
// const browserSync = require("browser-sync").create();

// gulp.task("default", ["styles"], function() {
//   gulp.watch("sass/**/*.scss", ["styles"]);

//   browserSync.init({
//     server: "./"
//   });
// });

// gulp.task("styles", function() {
//   gulp
//     .src("sass/**/*.scss")
//     .pipe(sass().on("error", sass.logError))
//     .pipe(
//       autoprefixer({
//         browsers: ["last 2 versions"]
//       })
//     )
//     .pipe(gulp.dest("./css"))
//     .pipe(browserSync.stream());
// });

