// src/lib/answer.js @flow

import pick from 'lodash.pick'
import clone from 'lodash.clonedeep'

export interface IAnswerData {
	key: string;
	value: boolean | string;
}

export interface IAnswer extends IAnswerData {
	constructor(args: IAnswerData) : IAnswer;
	data(source? : IAnswerData) : IAnswerData;
}

export class Answer {
	key: string;
	value: boolean | string;

	constructor({key, value} : {key: string; value: boolean | string}) {
		this.key = key
		this.value = value
	}

	/** Clone the answer (or passed in source) data as an Object */
	data(source?: IAnswerData) : IAnswerData {
		return clone(pick(source || this, [
			'key', 'value',
		]))
	}
}

export default function a(args: IAnswerData) : IAnswer {
	return new Answer(args)
}
