import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Heading from '../Heading'
import Level from '../Level'
import Modal from '../Modal'

import {
	setCurrentLevelNumber,
	updateCurrentPosition,
	toggleModal
} from './actions'

class App extends React.Component {
	componentDidMount() {
		const {
			setCurrentLevelNumber,
			updateCurrentPosition,
			toggleModal
		} = this.props

		setCurrentLevelNumber()
		updateCurrentPosition()
		toggleModal(false)
	}

	render() {
		return (
			<div className="app">
				<Heading />
				<Level />
				<Modal />
			</div>
		)
	}
}

App.propTypes = {
	setCurrentLevelNumber: PropTypes.func,
	updateCurrentPosition: PropTypes.func,
	toggleModal: PropTypes.func
}

const mapDispatchToProps = {
	setCurrentLevelNumber,
	updateCurrentPosition,
	toggleModal
}

export default connect(null, mapDispatchToProps)(App)
