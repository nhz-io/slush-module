import sinon from 'sinon'
import inquirer from 'inquirer'

const stub = {
	prompt: sinon.stub(inquirer, 'prompt')
}

export default stub
