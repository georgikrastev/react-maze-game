import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createPropsSelector } from 'reselect-immutable-helpers'

import Heading from '../Heading'
import Level from '../Level'
import Modal from '../Modal'
import Button from '../Button'

import {
	setCurrentLevelNumber,
	updateCurrentPosition,
	toggleModal
} from './actions'

import { initializeLevel } from '../Level/actions'

import {
	getAppLevelNumber,
	getAppPosition,
	getAppLoadedFromStorage
} from './selectors'

class App extends React.Component {
	constructor() {
		super()

		this.saveGame = this.saveGame.bind(this)
	}

	componentDidMount() {
		const {
			setCurrentLevelNumber,
			updateCurrentPosition,
			toggleModal,
			initializeLevel,
			isLoadedFromStorage
		} = this.props

		if (!isLoadedFromStorage) {
			setCurrentLevelNumber()
			initializeLevel()
			updateCurrentPosition()
			toggleModal(false)
		}
	}

	saveGame() {
		const { levelNumber, position, history } = this.props

		if (localStorage) {
			localStorage.setItem('level', levelNumber.toString())
			localStorage.setItem('position', JSON.stringify(position))
			history.push('/')
		}
	}

	render() {
		return (
			<div className="app">
				<Heading />
				<Level />
				<Modal />
				<Button
					text="Save Progress and Exit"
					type="primary"
					clickHandler={this.saveGame}
				/>
			</div>
		)
	}
}

App.propTypes = {
	setCurrentLevelNumber: PropTypes.func,
	updateCurrentPosition: PropTypes.func,
	toggleModal: PropTypes.func,
	levelNumber: PropTypes.number,
	position: PropTypes.shape({
		x: PropTypes.number,
		y: PropTypes.number
	}),
	initializeLevel: PropTypes.func,
	history: PropTypes.object,
	isLoadedFromStorage: PropTypes.bool
}

const mapStateToProps = createPropsSelector({
	levelNumber: getAppLevelNumber,
	position: getAppPosition,
	isLoadedFromStorage: getAppLoadedFromStorage
})

const mapDispatchToProps = {
	setCurrentLevelNumber,
	updateCurrentPosition,
	toggleModal,
	initializeLevel
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
