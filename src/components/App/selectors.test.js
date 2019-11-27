/* eslint-env jest */
import Immutable from 'immutable'
import * as selectors from './selectors'

const mockState = {
	app: Immutable.Map({
		isAlertOpened: false,
		isModalOpened: false,
		isLoadedFromStorage: false,
		difficulty: 'EASY',
		position: {
			x: 0,
			y: 0
		}
	})
}

describe('App selectors', () => {
	it('"getApp" returns correct piece of state', () => {
		const result = selectors.getApp(mockState)
		expect(result).toEqual(mockState.app)
	})

	it('"getAppPosition" returns correct piece of state', () => {
		const result = selectors.getAppPosition(mockState)
		expect(result).toEqual({
			x: 0,
			y: 0
		})
	})

	it('"getAppDifficulty" returns correct piece of state', () => {
		const result = selectors.getAppDifficulty(mockState)
		expect(result).toEqual('EASY')
	})

	it('"getAppModalStatus" returns correct piece of state', () => {
		const result = selectors.getAppModalStatus(mockState)
		expect(result).toEqual(false)
	})

	it('"getAppAlertOpened" returns correct piece of state', () => {
		const result = selectors.getAppAlertOpened(mockState)
		expect(result).toEqual(false)
	})

	it('"getAppLoadedFromStorage" returns correct piece of state', () => {
		const result = selectors.getAppLoadedFromStorage(mockState)
		expect(result).toEqual(false)
	})
})
