const { series, parallel, src, dest, watch } = require('gulp');
const scss 					= require('gulp-sass')(require('sass'));
const concat 				= require('gulp-concat');
const autoprefixer 	= require('gulp-autoprefixer');
const del 					= require('del');

// delete dist folder and dist index.html
function cleanDist () {
	return del('dist');
}

// scss-transform, minify style-files
function styles () {
	return src('src/styles/style.scss')
		.pipe(concat('style.min.css'))								// files concatinating
		.pipe(scss({outputStyle: 'compressed'}))			// compressed version
		// .pipe(scss({ outputStyle: "expanded" }))   // readable version
		.pipe(autoprefixer())
		.pipe(dest('dist/styles/'))
}

// watch for src-files
function watching () {
	watch('src/styles/**/*.scss', styles)
}

// default task
exports.default = parallel (styles, watching);

exports.build = series (
	cleanDist,
	parallel (styles, watching)
);
