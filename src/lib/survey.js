// src/lib/survey.js @flow

import assign from 'lodash.assign'

import {IQuestion} from './question'
import {IAnswer} from './answer'

export interface ISurveyData {
	questions: IQuestion[];
	answers: IAnswer[];
}

export interface ISurvey extends ISurveyData {
	add(...questions: IQuestion[]): ISurvey;
	remove(...questions: IQuestion[]): ISurvey;
	ask(...questions: Array<IQuestion | string>): Promise<IAnswer | IAnswer[]>;
	data(source?: ISurveyData): ISurveyData;
}

export class Survey {
	questions: IQuestion[];
	answers: IAnswer[];

	constructor(args: ISurveyData) {
		assign(this, this.data(args))
	}

	/** Clone the survey (or passed in source) data as an Object */
	data(source?: ISurveyData) : ISurveyData {
		return {
			questions: ((source || this).questions || []).map(q => q.clone()),
			answers: ((source || this).answers || []).map(a => a.clone()),
		}
	}

	/** Clone the survey and all the data as a new Survey */
	clone(source?: ISurveyData) : Survey {
		return new Survey(source || this)
	}
}

export default function s(args: ISurveyData) : Survey {
	return new Survey(args)
}
