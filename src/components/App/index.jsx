import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {initializeApp} from './actions'

import './App.css';

class App extends React.Component {
	componentDidMount() {
		const {initializeApp} = this.props

		initializeApp()
	}

	render() {
		return (
			<div>test</div>
		)
	}
}

App.propTypes = {
	initializeApp: PropTypes.func
}

const mapDispatchToProps = {
	initializeApp
}

export default connect(null, mapDispatchToProps)(App);
