// test/lib/question.js @flow

import inquirer from './stubs/inquirer'

import test from 'ava'
import isClass from 'is-class'
import defaults from 'lodash.defaults'

import q, {Question} from '../../src/lib/question'
import {Answer} from '../../src/lib/answer'

const questionData = {
	type: 'TYPE',
	name: 'NAME',
	message: 'MESSAGE',
	default: 'DEFAULT',
	choices: [],
	validate: () => {},
	filter: () => {},
	when: () => {},
}

const answerData = {
	key: 'KEY',
	value: 'VALUE',
}

test('Question is a class', t => t.true(isClass(Question)))

test('new Question(data) is correct', t =>
	t.deepEqual(questionData, new Question(questionData))
)

test('q(data) is a new Question', t =>
	t.true(q(questionData) instanceof Question)
)

test('q(data) is correct', t =>
	t.deepEqual(questionData, q(questionData))
)

test('Question#constructor(data) type is correct', t => {
	const $ = {
		s: 'foo'
	}

	t.is(new Question(defaults({type: $.s}, questionData)).type, $.s)
})

test('Question#constructor(data) name is correct', t => {
	const $ = {
		s: 'foo'
	}

	t.is(new Question(defaults({name: $.s}, questionData)).name, $.s)
})

test('Question#constructor(data) message is correct', t => {
	const $ = {
		s: 'foo'
	}

	t.is(new Question(defaults({message: $.s}, questionData)).message, $.s)
})

test('Question#constructor(data) default is correct', t => {
	const $ = {
		s: 'foo',
		n: 123,
		a: [1, 2, 3],
		f: () => {}
	}

	t.is(new Question(defaults({default: $.s}, questionData)).default, $.s)
	t.is(new Question(defaults({default: $.n}, questionData)).default, $.n)
	t.deepEqual(new Question(defaults({default: $.a}, questionData)).default, $.a)
	t.is(new Question(defaults({default: $.f}, questionData)).default, $.f)
})

test('Question#constructor(data) choices is correct', t => {
	const $ = {
		a: ['foo', 'bar', {name: 'foo', value: 'bar', short: 'foobar'}],
		f: () => {},
	}

	t.deepEqual(new Question(defaults({choices: $.a}, questionData)).choices, $.a)
	t.is(new Question(defaults({choices: $.f}, questionData)).choices, $.f)
})

test('Question#constructor(data) validate is correct', t => {
	const $ = {
		f: () => {},
	}

	t.is(new Question(defaults({validate: $.f}, questionData)).validate, $.f)
})

test('Question#constructor(data) filter is correct', t => {
	const $ = {
		f: () => {},
	}

	t.is(new Question(defaults({filter: $.f}, questionData)).filter, $.f)
})

test('Question#constructor(data) when is correct', t => {
	const $ = {
		f: () => {},
	}

	t.is(new Question(defaults({when: $.f}, questionData)).when, $.f)
})

test('Question#data() from question', t => {
	const question = new Question(questionData)
	const data = question.data()

	t.false(data instanceof Question)
	t.deepEqual(questionData, data)
})

test('Question#data(source) from source', t => {
	const question = new Question()
	const source = new Question(questionData)
	const data = question.data(source)

	t.deepEqual(questionData, data)
})

test('Question#clone() question as new Question', t => {
	const question = new Question(questionData)
	const clone = question.clone()

	t.false(question === clone)
	t.deepEqual(question, clone)
})

test('Question#clone(source) as new Question', t => {
	const question = new Question()
	const source = new Question(questionData)
	const clone = question.clone(source)

	t.true(clone instanceof Question)
	t.deepEqual(source, clone)
})

test('Question#ask() correctly calls inquirer.prompt()', t => {
	const question = new Question(questionData)
	inquirer.prompt.reset()
	inquirer.prompt.onCall(0).returns(Promise.resolve([]))
	question.ask()
	t.deepEqual(inquirer.prompt.args[0], [questionData])
})

test('Question#ask() returns new Promised Answer', t => {
	const question = new Question(questionData)
	inquirer.prompt.reset()
	inquirer.prompt.onCall(0).returns(
		Promise.resolve([answerData])
	)
	return question.ask().then(r => {
		t.true(r instanceof Answer)
		t.deepEqual(r, answerData)
	})
})
