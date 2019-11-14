import {createStore, combineReducers} from 'redux'
import appReducer from '../components/App/reducers'

const rootReducer = combineReducers({
	levels: appReducer
})

const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store