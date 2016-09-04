/** @TODO: fix this file */
import path from 'path'
import child_process from 'child_process'

import gulp from 'gulp'
import sequence from 'gulp-sequence'
import del from 'del'

import rollup from 'gulp-rollup'
import rollupFlow from 'rollup-plugin-flow'
import sourcemaps from 'gulp-sourcemaps'

import flow from 'gulp-flowtype'

import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

import babel from 'gulp-babel'
import uglify from 'gulp-uglify'

import './tasks'

/** Flow */
gulp.task('flow', () =>
  gulp.src(['src/**/*.js'])
    .pipe(flow({
      all: false,
      weak: false,
      killFlow: false,
      beep: true,
      abort: false
    }))
)

/** Clean */
gulp.task('clean', () => del(['build', 'dist', 'doc']))

/** Rollup **/
gulp.task('rollup', () =>
	gulp.src(['src/**/*.js'], {read: 'false'})
		.pipe(rollup({
			sourceMap: true,
			format: 'es6',
			entry: 'src/questions/license.js',
			plugins: [
				rollupFlow(),
			]
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('build/lib'))
)

/** Babel */
gulp.task('babel', ['rollup'], () =>
	gulp.src('build/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: [
				'es2015',
				'stage-0'
			]
		}))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'))
)

/** Build */
gulp.task('build', ['rollup', 'babel'])

/** Copy */
gulp.task('copy', () =>
	gulp.src(['src/**/*.*', '!src/**/*.js'])
		.pipe(gulp.dest('dist'))
)

/** NPM Version patch */
gulp.task('patch', (cb) =>
	child_process.exec('npm version patch', cb)
)

/** NPM Version minor */
gulp.task('minor', (cb) =>
	child_process.exec('npm version minor', cb)
)

/** NPM Version major */
gulp.task('major', (cb) =>
	child_process.exec('npm version major', cb)
)

/** NPM Publish */
gulp.task('publish', (cb) =>
	child_process.exec('npm publish', cb)
)

/** Dist */
gulp.task('dist', sequence('lint', 'test', 'clean', 'build', 'copy'))


/** Default */
gulp.task('default', ['dist'])
