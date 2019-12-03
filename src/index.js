import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Router from './components/Router'
import store from './store/'
import * as serviceWorker from './serviceWorker'

import './styles/_styles.scss'

ReactDOM.render(
	<Provider store={store}>
		<Router />
	</Provider>,
	document.getElementById('root')
)

serviceWorker.register()
