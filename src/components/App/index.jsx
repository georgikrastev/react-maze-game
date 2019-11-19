import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Heading from '../Heading'
import Level from '../Level'

import { setCurrentLevelNumber, updateCurrentPosition } from './actions'

import './styles.css'

class App extends React.Component {
	componentDidMount() {
		const { setCurrentLevelNumber, updateCurrentPosition } = this.props

		setCurrentLevelNumber()
		updateCurrentPosition()
	}

	render() {
		return (
			<div className="app">
				<Heading />
				<Level />
			</div>
		)
	}
}

App.propTypes = {
	setCurrentLevelNumber: PropTypes.func,
	updateCurrentPosition: PropTypes.func
}

const mapDispatchToProps = {
	setCurrentLevelNumber,
	updateCurrentPosition
}

export default connect(null, mapDispatchToProps)(App)
