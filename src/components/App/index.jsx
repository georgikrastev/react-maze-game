import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createPropsSelector } from 'reselect-immutable-helpers'

import Heading from '../Heading'
import Level from '../Level'
import Modal from '../Modal'
import Button from '../Button'

import { startGame, saveGame, loadGame, setLoadedStatus } from './actions'
import { getAppDifficulty, getAppLoadedFromStorage } from './selectors'

class App extends React.Component {
	constructor() {
		super()

		this.handleSaveGame = this.handleSaveGame.bind(this)
	}

	componentDidMount() {
		const {
			startGame,
			loadGame,
			difficulty,
			isLoadedFromStorage
		} = this.props

		if (!isLoadedFromStorage) {
			startGame(difficulty)
		} else {
			loadGame()
		}
	}

	componentWillUnmount() {
		const { setLoadedStatus } = this.props

		setLoadedStatus(false)
	}

	handleSaveGame() {
		const { saveGame, history } = this.props

		saveGame(history)
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
					clickHandler={this.handleSaveGame}
				/>
			</div>
		)
	}
}

App.propTypes = {
	history: PropTypes.object,
	difficulty: PropTypes.string,
	isLoadedFromStorage: PropTypes.bool,
	startGame: PropTypes.func,
	saveGame: PropTypes.func,
	loadGame: PropTypes.func,
	setLoadedStatus: PropTypes.func
}

const mapStateToProps = createPropsSelector({
	difficulty: getAppDifficulty,
	isLoadedFromStorage: getAppLoadedFromStorage
})

const mapDispatchToProps = {
	startGame,
	saveGame,
	loadGame,
	setLoadedStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
