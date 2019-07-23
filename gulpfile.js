var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browser = require('browser-sync').create(),
	pug = require('gulp-pug');	

function sync(done) {
	browser.init({
		server: {
			baseDir: "./dest/"
		},
		port: 3040
	});

	done();
}

function copy(done) {
	gulp.src('./node_modules/glyphicons-only-bootstrap/fonts/*.*')
		.pipe(gulp.dest('./dest/fonts/'));
	gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
		.pipe(gulp.dest('./dest/css/'));
	gulp.src('./node_modules/glyphicons-only-bootstrap/css/bootstrap.css')
		.pipe(gulp.dest('./dest/css/'));
		
	gulp.src('./src/img/*.*')
		.pipe(gulp.dest('./dest/img/'));

	done();
}

function scss() {
	return gulp.src('./src/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./dest/css/'))
		.pipe(browser.stream());
}

function views() {
	return gulp.src('./src/views/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./dest/'))
		.pipe(browser.stream());
}

function watch(){
	gulp.watch('./src/', gulp.series(scss, views));
}

var watch = gulp.parallel(sync, watch),
	build = gulp.series([scss, views, watch]);

exports.copy = copy;
exports.sync = sync;
exports.scss = scss;
exports.views = views;
exports.watch = watch;
exports.default = build;