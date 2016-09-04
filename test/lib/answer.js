// test/lib/answer.js @flow

import test from 'ava'
import isClass from 'is-class'
import a, {Answer} from '../../src/lib/answer'

test('Answer is a class', t => t.true(isClass(Answer)))

test('new Answer(data) is correct', t => {
	const answer = new Answer({key: 'foo', value: 'bar'})
	t.is(answer.key, 'foo')
	t.is(answer.value, 'bar')
})

test('a(data) is a new Answer', t => {
	t.true(a({key: 'foo', value: 'bar'}) instanceof Answer)
	t.true(a({key: 'foo', value: true}) instanceof Answer)
	t.true(a({key: 'foo', value: false}) instanceof Answer)
})

test('a(data) is correct', t => {
	const answer = a({key: 'foo', value: 'bar'})
	t.is(answer.key, 'foo')
	t.is(answer.value, 'bar')
})

test('Answer#constructor(data) key is correct', t =>
	t.is(new Answer({key: 'foo', value: 'bar' }).key, 'foo')
)

test('Answer#constructor(args) value is correct', t => {
	t.is(new Answer({key: 'foo', value: 'bar'}).value, 'bar')
	t.is(new Answer({key: 'foo', value: true}).value, true)
	t.is(new Answer({key: 'foo', value: false}).value, false)
})

test('Answer#data() from answer', t => {
	const answer = new Answer({key: 'foo', value: 'bar'})
	const data = answer.data()

	t.false(data instanceof Answer)
	t.is(data.key, answer.key)
	t.is(data.value, answer.value)
})

test('Answer#data(source) from source', t => {
	const answer = new Answer()
	const source = new Answer({key: 'foo', value: 'bar'})
	const data = answer.data(source)

	t.is(data.key, source.key)
	t.is(data.value, source.value)
})

test('Answer#clone() answer as new Answer', t => {
	const answer = new Answer({key: 'foo', value: 'bar'})
	const clone = answer.clone()
	t.false(answer === clone)
	t.is(answer.key, clone.key)
	t.is(answer.value, clone.value)
})

test('Answer#clone(source) as new Answer', t => {
	const answer = new Answer()
	const source = new Answer({key: 'foo', value: 'bar'})
	const clone = answer.clone(source)

	t.true(clone instanceof Answer)
	t.is(clone.key, source.key)
	t.is(clone.value, source.value)
})
