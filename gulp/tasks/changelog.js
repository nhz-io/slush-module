// @flow

import gulp from 'gulp'
import changelog from 'gulp-conventional-changelog'

/** @desc Todo task */
gulp.task('changelog', () =>
	gulp.src('CHANGELOG.md')
		.pipe(changelog({
			releaseCount: 0,
		}))
		.pipe(gulp.dest('.'))
)
