// src/lib/answer.js @flow

import pick from 'lodash.pick'
import clone from 'lodash.clonedeep'
import assign from 'lodash.assign'

export interface IAnswerData {
	key: string;
	value: boolean | string;
}

export interface IAnswer extends IAnswerData {
	constructor(args: IAnswerData) : IAnswer;
	data(source? : IAnswerData) : IAnswerData;
	clone(source? : IAnswerData) : IAnswer;
}

export class Answer {
	key: string;
	value: boolean | string;

	constructor(args: IAnswerData) {
		assign(this, this.data(args))
	}

	/** Clone the answer (or passed in source) data as an Object */
	data(source?: IAnswerData) : IAnswerData {
		return clone(pick(source || this, [
			'key', 'value',
		]))
	}

	/** Clone the answer (or passed in source) as new Answer */
	clone(source?: IAnswerData) : IAnswer {
		return new Answer(source || this)
	}
}

export default function a(args: IAnswerData) : IAnswer {
	return new Answer(args)
}
