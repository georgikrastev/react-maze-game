import Immutable from 'immutable'
import { INITIALIZE_LEVEL } from './constants'

const appReducer = (state = Immutable.Map(), action) => {
	switch (action.type) {
		case INITIALIZE_LEVEL:
			return state.merge(action.payload)
		default:
			return state
	}
}

export default appReducer
