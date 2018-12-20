const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");

function reload() {
  browserSync.reload();
}

// monitored file path
var paths = {
  style: {
      
      src: "sass/**/*.scss",
      
      dest: "./css"
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

// gulp.task("default", gulp.series("style", function() {

//   gulp.watch("sass/**/*.scss", ["style"]);

//   browserSync.init({
//     server: "./"
//   });

  
// }));

function watch(){
  style();

  gulp.watch(paths.style.src, style);
  gulp.watch("./index.html", reload);

  browserSync.init({
    server: "./"
  });
}
  
exports.watch = watch


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

