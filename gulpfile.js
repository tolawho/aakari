//   ___    __________   |  Vasanth Developer (Vasanth Srivatsa)
//   __ |  / /___  __ \  |  ------------------------------------------------
//   __ | / / __  / / /  |  https://github.com/vasanthdeveloper/kevala.git
//   __ |/ /  _  /_/ /   |
//   _____/   /_____/    |  Gulp instructions for building aakari Ghost theme
//                       |

const del = require('del');
const gulp = require('gulp');
const zip = require('gulp-zip');
const sass = require('gulp-sass');
const size = require('gulp-size');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const livereload = require('gulp-livereload');
const sourcemaps = require('gulp-sourcemaps');
const purgecss = require('@fullhuman/postcss-purgecss');

const postCSSConfig = require('./postcss.config');

// Setting the sass compiler as node-sass
sass.compiler = require('node-sass');

// The variable that holds options for gulp-size
const sizeOptions = {
    showFiles: true
};

// The variable that holds the paths/globs to different files
const globs = {
    distDir: './dist',
    styles: './sources/scss/**/*.scss',
    scripts: './sources/js/**/*.js',
    markup: './**/*.hbs',
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
    // Set the title for gulp-size
    sizeOptions.title = 'styles';

    return gulp.src(globs.styles)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(postcss(postCSSConfig))
        .pipe(sourcemaps.write('./maps'))
        .pipe(size(sizeOptions))
        .pipe(gulp.dest('./assets/css'));
}

// The function that minifies JavaScript files
function scripts() {
    // Set the title for gulp-size
    sizeOptions.title = 'scripts';

    return gulp.src(globs.scripts)
        .pipe(uglify())
        .pipe(size(sizeOptions))
        .pipe(gulp.dest('./assets/js'));
}

// The function that installs vendor JavaScript
function vendor_scripts() {
    // Set the title for gulp-size
    sizeOptions.title = 'vendor scripts';

    return gulp.src(globs.vendorScripts)
        .pipe(size(sizeOptions))
        .pipe(gulp.dest('./assets/js'));
}

// The function that packages the theme into a zip file for installation in Ghost
function package_theme() {
    // Set the title for gulp-size
    sizeOptions.title = 'package';

    return gulp.src(globs.unFilesForPack)
        .pipe(zip(globs.packageFilename))
        .pipe(size(sizeOptions))
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
    // Start the livereload server
    // Note: Install the extension below to get live reload working
    // https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
    livereload.listen();

    // Watch for file changes
    gulp.watch(globs.styles, styles);
    gulp.watch(globs.scripts, scripts);
    gulp.watch(globs.markup).on('change', (styles, livereload.changed));

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
exports.watch = watch;
exports.styles = styles;
exports.scripts = scripts;
exports.package = package_theme;
exports.vendor_scripts = vendor_scripts;