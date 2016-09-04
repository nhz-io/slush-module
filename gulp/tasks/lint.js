// gulp/tasks/lint.js @flow

import gulp from 'gulp'
import lint from 'gulp-xo'

/** @desc Lint task */
gulp.task('lint', () =>
	gulp.src(['src/**/*.js'])
		.pipe(lint())
)
