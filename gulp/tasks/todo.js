// @flow

import gulp from 'gulp'
import todo from 'gulp-todo'
import gulpIf from 'gulp-if'
import del from 'del'
import paths from 'vinyl-paths'

/** @desc Todo task */
gulp.task('todo', () =>
	gulp.src(['gulp/**/*.js', 'src/**/*.js'], {base: '.'})
		.pipe(todo())
		.pipe(gulpIf(
			file => file.todos && Boolean(file.todos.length),
			gulp.dest('.'),
			paths(del)
		))
)
