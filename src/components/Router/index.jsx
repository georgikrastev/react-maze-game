import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import App from '../App'
import StartScreen from '../StartScreen'

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={StartScreen} />
			<Route path="/playing" component={App} />
		</Switch>
	</BrowserRouter>
)

export default Router
