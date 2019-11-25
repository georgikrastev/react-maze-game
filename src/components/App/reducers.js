import Immutable from 'immutable'
import {
	SET_CURRENT_POSITION,
	TOGGLE_MODAL,
	SET_DIFFICULTY_LEVEL,
	SET_LOADED_STATUS
} from './constants'

import { TOGGLE_ALERT } from '../StartScreen/constants'

const appReducer = (state = Immutable.Map(), action) => {
	switch (action.type) {
		case SET_CURRENT_POSITION:
		case TOGGLE_MODAL:
		case SET_DIFFICULTY_LEVEL:
		case SET_LOADED_STATUS:
		case TOGGLE_ALERT:
			return state.merge(action.payload)
		default:
			return state
	}
}

export default appReducer
