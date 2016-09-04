// gulp/tasks/test.js @flow

import gulp from 'gulp'
import test from 'gulp-ava'

/** @desc Test task */
gulp.task('test', () =>
	gulp.src(['test/**/*.js'])
		.pipe(test())
)

/** @desc Test lib task */
gulp.task('test:lib', () =>
	gulp.src('test/lib/*.js')
		.pipe(test())
)

/** @desc Test questions task */
gulp.task('test:questions', () =>
	gulp.src('test/lib/*.js')
		.pipe(test())
)
