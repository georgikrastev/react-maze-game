import { TOGGLE_ALERT } from './constants'

export const toggleAlert = (status = false) => ({
	type: TOGGLE_ALERT,
	payload: {
		isAlertOpened: status
	}
})
