import Immutable from 'immutable'
import { INITIALIZE_LEVEL } from './constants'

const levelReducer = (state = Immutable.Map(), action) => {
	switch (action.type) {
		case INITIALIZE_LEVEL:
			return state.merge(action.payload)
		default:
			return state
	}
}

export default levelReducer
