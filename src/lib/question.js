// src/lib/question.js @flow

import inquirer from 'inquirer'
import assign from 'lodash.assign'
import pick from 'lodash.pick'
import clone from 'lodash.clonedeep'
import defaults from 'lodash.defaults'

import {IAnswer, Answer} from './answer'

export interface IChoice {
	name: string;
	value: any;
	short: string;
}

export interface IQuestionData {
	type: string;
	name: string;
	message: string | Function;
	default?: string | number | Array<any> | Function;
	choices?: Array<string | IChoice> | Function;
	validate?: Function;
	filter?: Function;
	when?: Function | boolean;
}

export interface IQuestion extends IQuestionData {
	constructor(args: IQuestionData) : IQuestion;
	data(source?: IQuestionData): IQuestionData;
	ask(): Promise<IAnswer>;
	clone(source? : IQuestionData) : IQuestion;
}

export class Question {
	type: string;
	name: string;
	message: string | Function;
	default: string | number | Array<any> | Function;
	choices: Array<string | IChoice> | Function;
	validate: Function;
	filter: Function;
	when: Function | boolean;

	constructor(args: IQuestionData) {
		assign(this, this.data(args))
	}

	/** Clone the question (or passed in source) data as an Object */
	data(source?: IQuestionData) : IQuestionData {
		return clone(pick(source || this, [
			'type', 'name', 'message', 'default',
			'choices', 'validate', 'filter', 'when',
		]))
	}

	/** Prompt the question with inquirer returning promised answer */
	ask() : Promise<IAnswer> {
		return inquirer.prompt(this.data()).then(a => new Answer(a[0]))
	}

	/** Clone the question (or passed in source) as new Question */
	clone(source?: IQuestionData) : IQuestion {
		return new Question(source || this)
	}
}

export default function q(...args: Array<Object>) : Question {
	return new Question(defaults(...args))
}
