'use strict';

const gulp = require('gulp'),
	  sass = require('gulp-sass'),
	  sourcemaps = require('gulp-sourcemaps'),
	  autoprefixer = require('gulp-autoprefixer'),
	  csso = require('gulp-csso');

// Setting the sass compiler as node-sass
sass.compiler = require('node-sass');

// Setting SASS compiler settings
var SassOptions = {
	indentedSyntax: true,
	indentType: 'tab',
	indentWidth: 4,
	outputStyle: 'expanded'
};

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

// Gulp task for packaging the theme into a ZIP file

// The default Gulp task which first does a fresh build and watches for any changes