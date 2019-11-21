import Immutable from 'immutable'
import {
	SET_CURRENT_LEVEL_NUMBER,
	SET_CURRENT_POSITION,
	TOGGLE_MODAL
} from './constants'

const appReducer = (state = Immutable.Map(), action) => {
	switch (action.type) {
		case SET_CURRENT_LEVEL_NUMBER:
		case SET_CURRENT_POSITION:
		case TOGGLE_MODAL:
			return state.merge(action.payload)
		default:
			return state
	}
}

export default appReducer