import Immutable from 'immutable'
import {INITIALIZE_APP} from './constants'

const appReducer = (state = Immutable.List(), action) => {
    switch (action.type) {
        case INITIALIZE_APP:
            return state.merge(action.payload)
        default:
            return state
    }
}

export default appReducer
