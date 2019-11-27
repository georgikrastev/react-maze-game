/* eslint-env jest */
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import * as constants from './constants'
import * as actions from './actions'
import reducer from './reducers'

const DEMO_POSITION = {
	x: 0,
	y: 0
}

describe('App actions', () => {
	it('returns correct object when "setCurrentPosition" is dispatched', () => {
		const obj = actions.setCurrentPosition(DEMO_POSITION)

		expect(obj).toEqual({
			type: constants.SET_CURRENT_POSITION,
			payload: {
				position: DEMO_POSITION
			}
		})
	})

	it('returns correct object when "toggleModal" is dispatched', () => {
		const obj = actions.toggleModal(true)

		expect(obj).toEqual({
			type: constants.TOGGLE_MODAL,
			payload: {
				isModalOpened: true
			}
		})
	})

	it('returns correct object when "setLoadedStatus" is dispatched', () => {
		const obj = actions.setLoadedStatus(true)

		expect(obj).toEqual({
			type: constants.SET_LOADED_STATUS,
			payload: {
				isLoadedFromStorage: true
			}
		})
	})

	it('returns correct object when "setDifficulty" is dispatched', () => {
		const obj = actions.setDifficulty('EASY')

		expect(obj).toEqual({
			type: constants.SET_DIFFICULTY_LEVEL,
			payload: {
				difficulty: 'EASY'
			}
		})
	})

	it('dispatches the correct actions when "updateCurrentPosition" is dispatched', () => {
		const storeFactory = configureStore([thunk.withExtraArgument()])
		const initial = reducer(undefined, { type: 'UNKNOWN' })
		const store = storeFactory(initial)

		store.dispatch(actions.updateCurrentPosition(DEMO_POSITION))

		expect(store.getActions()).toEqual([
			actions.setCurrentPosition(DEMO_POSITION)
		])
	})
})
