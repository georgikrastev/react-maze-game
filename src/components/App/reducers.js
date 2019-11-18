import Immutable from 'immutable'
import { SET_CURRENT_LEVEL_NUMBER, SET_CURRENT_POSITION } from './constants'

const appReducer = (state = Immutable.Map(), action) => {
	switch (action.type) {
		case SET_CURRENT_LEVEL_NUMBER:
		case SET_CURRENT_POSITION:
			return state.merge(action.payload)
		default:
			return state
	}
}

export default appReducer
