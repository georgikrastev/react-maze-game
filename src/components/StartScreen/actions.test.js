/* eslint-env jest */
import * as constants from './constants'
import * as actions from './actions'

describe('StartScreen actions', () => {
	it('returns correct object when "toggleAlert" is dispatched', () => {
		const obj = actions.toggleAlert(false)

		expect(obj).toEqual({
			type: constants.TOGGLE_ALERT,
			payload: {
				isAlertOpened: false
			}
		})
	})
})
