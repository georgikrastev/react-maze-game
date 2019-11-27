/* eslint-env jest */
import Immutable from 'immutable'
import * as selectors from './selectors'

const mockState = {
	level: Immutable.Map({
		size: 0,
		cells: Immutable.List(),
		start: Immutable.Map(),
		end: Immutable.Map()
	})
}

describe('Level selectors', () => {
	it('"getLevel" returns correct piece of state', () => {
		const result = selectors.getLevel(mockState)
		expect(result).toEqual(mockState.level)
	})

	it('"getLevelSize" returns correct piece of state', () => {
		const result = selectors.getLevelSize(mockState)
		expect(result).toEqual(0)
	})

	it('"getLevelCells" returns correct piece of state', () => {
		const result = selectors.getLevelCells(mockState)
		expect(result.toJS()).toEqual([])
	})

	it('"getLevelStart" returns correct piece of state', () => {
		const result = selectors.getLevelStart(mockState)
		expect(result.toJS()).toEqual({})
	})

	it('"getLevelEnd" returns correct piece of state', () => {
		const result = selectors.getLevelEnd(mockState)
		expect(result.toJS()).toEqual({})
	})
})
