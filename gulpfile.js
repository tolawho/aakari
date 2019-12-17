//   ___    __________   |  Vasanth Developer (Vasanth Srivatsa)
//   __ |  / /___  __ \  |  ------------------------------------------------
//   __ | / / __  / / /  |  https://github.com/vasanthdeveloper/kevala.git
//   __ |/ /  _  /_/ /   |
//   _____/   /_____/    |  Gulp instructions for building aakari Ghost theme
//                       |

const del = require('del');
const postcss = require('gulp-postcss');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const zip = require('gulp-zip');

const postCSSConfig = require('./postcss.config');

// Setting the sass compiler as node-sass
sass.compiler = require('node-sass');

// The variable that holds the paths/globs to different files
const globs = {
    distDir: './dist',
    styles: './sources/scss/**/*.scss',
    scripts: './sources/js/**/*.js',
    packageFilename: `${require('./package.json').name}-${require('./package.json').version}.zip`,
    vendorScripts: [
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/popper.js/dist/umd/popper.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/jquery-lazy/jquery.lazy.min.js'
    ],
    unFilesForPack: [
        '**',
        '!sources', '!sources/**',
        '!node_modules', '!node_modules/**',
        '!dist', '!dist/**',
        '!package-lock.json'
    ]
};

// The function that compiles SCSS and passes the CSS through PostCSS
function styles() {
    return gulp.src(globs.styles)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(postcss(postCSSConfig))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./assets/css'));
}

// The function that minifies JavaScript files
function scripts() {
    return gulp.src(globs.scripts)
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js'));
}

// The function that installs vendor JavaScript
function vendor_scripts() {
    return gulp.src(globs.vendorScripts)
        .pipe(gulp.dest('./assets/js'));
}

// The function that packages the theme into a zip file for installation in Ghost
function package_theme() {
    return gulp.src(globs.unFilesForPack)
        .pipe(zip(globs.packageFilename))
        .pipe(gulp.dest(globs.distDir));
}

// The function that deletes the generated assets
function clean() {
    return del([
        './assets',
        './dist'
    ]);
}

// The function that watches for file changes and re-builds the changed sources
function watch(callback) {
    // [TODO]: Configure the live reloading server

    // Watch for file changes
    gulp.watch(globs.styles, styles);
    gulp.watch(globs.scripts, scripts);
    // gulp.watch(globs.markup).on('change', (styles, livereload.changed));

    // Tell gulp to continue with this function
    callback();
}

// The Gulp task that freshly builds all the assets
gulp.task('build', gulp.series(clean, gulp.parallel(
    styles,
    scripts,
    vendor_scripts
)));

// The Gulp task that does a fresh build and keeps watching for any changes
gulp.task('default', gulp.series('build', watch));

// Export the function that are used by Gulp
exports.clean = clean;
exports.vendor_scripts = vendor_scripts;
exports.scripts = scripts;
exports.styles = styles;
exports.package = package_theme;
exports.watch = watch;