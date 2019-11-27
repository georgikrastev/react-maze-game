/* eslint-env jest */
import Immutable from 'immutable'
import reducer from './reducers'
import * as constants from './constants'
import { TOGGLE_ALERT } from '../StartScreen/constants'

describe('App reducer', () => {
	it('returns correct state for unknown action type', () => {
		const unknownAction = { type: 'UNKNOWN', payload: { a: 'b' } }
		const initial = reducer(Immutable.Map(), unknownAction)

		expect(initial.toJS()).toEqual({})
	})

	it('returns correct state for "SET_CURRENT_POSITION" action type', () => {
		const DEMO_PAYLOAD = {
			position: { x: 0, y: 0 }
		}
		const setCurrentPositionAction = {
			type: constants.SET_CURRENT_POSITION,
			payload: DEMO_PAYLOAD
		}
		const initial = reducer(Immutable.Map(), setCurrentPositionAction)

		expect(initial.toJS()).toEqual(DEMO_PAYLOAD)
	})

	it('returns correct state for "TOGGLE_MODAL" action type', () => {
		const DEMO_PAYLOAD = {
			isModalOpened: false
		}
		const toggleModalAction = {
			type: constants.TOGGLE_MODAL,
			payload: DEMO_PAYLOAD
		}
		const initial = reducer(Immutable.Map(), toggleModalAction)

		expect(initial.toJS()).toEqual(DEMO_PAYLOAD)
	})

	it('returns correct state for "SET_DIFFICULTY_LEVEL" action type', () => {
		const DEMO_PAYLOAD = {
			difficulty: 'EASY'
		}
		const setDifficultyLevelAction = {
			type: constants.SET_DIFFICULTY_LEVEL,
			payload: DEMO_PAYLOAD
		}
		const initial = reducer(Immutable.Map(), setDifficultyLevelAction)

		expect(initial.toJS()).toEqual(DEMO_PAYLOAD)
	})

	it('returns correct state for "SET_LOADED_STATUS" action type', () => {
		const DEMO_PAYLOAD = {
			isLoadedFromStorage: false
		}
		const setLoadedStatusAction = {
			type: constants.SET_DIFFICULTY_LEVEL,
			payload: DEMO_PAYLOAD
		}
		const initial = reducer(Immutable.Map(), setLoadedStatusAction)

		expect(initial.toJS()).toEqual(DEMO_PAYLOAD)
	})

	it('returns correct state for "TOGGLE_ALERT" action type', () => {
		const DEMO_PAYLOAD = {
			isAlertOpened: false
		}
		const toggleAlertAction = {
			type: TOGGLE_ALERT,
			payload: DEMO_PAYLOAD
		}
		const initial = reducer(Immutable.Map(), toggleAlertAction)

		expect(initial.toJS()).toEqual(DEMO_PAYLOAD)
	})
})
