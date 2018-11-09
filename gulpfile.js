'use strict';

const gulp = require('gulp'),
	  sass = require('gulp-sass'),
	  sourcemaps = require('gulp-sourcemaps'),
	  autoprefixer = require('gulp-autoprefixer'),
	  csso = require('gulp-csso'),
	  uglify = require('gulp-uglify');

// Setting the sass compiler as node-sass
sass.compiler = require('node-sass');

// Setting SASS compiler settings
var SassOptions = {
	indentedSyntax: true,
	indentType: 'tab',
	indentWidth: 4,
	outputStyle: 'expanded'
};

// Defining the required JavaScripts
var ReqJavaScripts = [
	'./node_modules/jquery/dist/jquery.min.js',
	'./node_modules/popper.js/dist/umd/popper.min.js',
	'./node_modules/bootstrap/dist/js/bootstrap.min.js'
];

// The Gulp task for preparing CSS
gulp.task('sass-compile', function() {
	return gulp.src('./sources/sass/**/*.+(scss|sass)')
		.pipe(sourcemaps.init())
		.pipe(sass(SassOptions).on('error', sass.logError))
		.pipe(autoprefixer({browsers: ['last 4 versions']}))
		.pipe(csso())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./assets/css'));
});

// Gulp Task for optimizing JavaScripts
gulp.task('js-optimize', function() {
	return gulp.src('./sources/js/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./assets/js'));
})

// Gulp Task for installing the required JavaScripts
gulp.task('install-javascripts', function() {
	return gulp.src(ReqJavaScripts)
		.pipe(gulp.dest('./assets/js'));
});

// Gulp task for packaging the theme into a ZIP file

// The default Gulp task which first does a fresh build and watches for any changes