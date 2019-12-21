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
const gulp_if = require('gulp-if');
const rename = require('gulp-rename');

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
    vendorScripts: [],
    unFilesForPack: [
        '**',
        '!sources', '!sources/**',
        '!node_modules', '!node_modules/**',
        '!dist', '!dist/**',
        '!database', '!database/**',
        '!public', '!public/**',
        '!scripts', '!scripts/**',
        '!assets/css/maps', '!assets/css/maps/**'
    ]
};

// n_progress() will check if the file is n_progress.scss and make it into
// a handlebars partial file instead of normally writing as css
// which is then inlined into default.hbs
function n_progress(file) {
    return file.basename == 'n_progress.css';
}

// The function that compiles SCSS and passes the CSS through PostCSS
function styles() {
    // Set the title for gulp-size
    sizeOptions.title = 'styles';

    return gulp.src(globs.styles)
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp_if(n_progress, rename({
            dirname: 'partials/',
            extname: '.hbs'
        }), rename({
            dirname: 'assets/css',
            extname: '.css'
        })))
        .pipe(postcss(postCSSConfig))
        .pipe(size(sizeOptions))
        .pipe(gulp.dest('.'));
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
        './dist',
        './public',
        './partials/n_progress.hbs'
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
    gulp.watch(globs.markup).on('change', livereload.changed);
    gulp.watch('./assets/**/*').on('change', livereload.reload);

    // Tell gulp to continue with this function
    callback();
}

// The Gulp task that freshly builds all the assets
gulp.task('build', gulp.series(clean, gulp.parallel(
    styles,
    scripts
)));

// The Gulp task that does a fresh build and keeps watching for any changes
gulp.task('default', gulp.series('build', watch));

// Export the function that are used by Gulp
exports.clean = clean;
exports.watch = watch;
exports.styles = styles;
exports.scripts = scripts;
exports.package = package_theme;