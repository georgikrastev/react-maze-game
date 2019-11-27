/* eslint-env jest */
import Immutable from 'immutable'
import reducer from './reducers'
import * as constants from './constants'

describe('Level reducer', () => {
	it('returns correct state for unknown action type', () => {
		const unknownAction = { type: 'UNKNOWN', payload: { a: 'b' } }
		const initial = reducer(Immutable.Map(), unknownAction)

		expect(initial.toJS()).toEqual({})
	})

	it('returns correct state for "INITIALIZE_LEVEL" action type', () => {
		const DEMO_PAYLOAD = {}
		const initializeLevelAction = {
			type: constants.INITIALIZE_LEVEL,
			payload: DEMO_PAYLOAD
		}
		const initial = reducer(Immutable.Map(), initializeLevelAction)

		expect(initial.toJS()).toEqual(DEMO_PAYLOAD)
	})
})
