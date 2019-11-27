/* eslint-env jest */
import * as constants from './constants'
import * as actions from './actions'

const DEMO_LEVEL = {}

describe('Level actions', () => {
	it('returns correct object when "initializeLevel" is dispatched', () => {
		const obj = actions.initializeLevel(DEMO_LEVEL)

		expect(obj).toEqual({
			type: constants.INITIALIZE_LEVEL,
			payload: DEMO_LEVEL
		})
	})
})
