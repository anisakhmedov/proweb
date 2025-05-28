const { src, dest, series, watch } = require('gulp');
const gulpSass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

function compileSCSS() {
  return src('src/assets/scss/*.scss')
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(dest('src/assets/css'));
}

function minifyCSS() {
  return src([
      'src/assets/css/*.css',
      '!src/assets/css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('src/assets/css'));
}

// Watch
function startWatch() {
  watch('src/assets/scss/*.scss', series(compileSCSS, minifyCSS));
}

exports.default = series(compileSCSS, minifyCSS, startWatch);
