import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import appReducer from '../components/App/reducers'
import levelReducer from '../components/Level/reducers'

const rootReducer = combineReducers({
	app: appReducer,
	level: levelReducer
})

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
	rootReducer,
	composeEnchancers(applyMiddleware(thunk))
)

export default store
