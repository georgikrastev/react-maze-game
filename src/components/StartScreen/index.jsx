import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '../Button'

import { startScreenTitle, menuLinks } from './constants'
import { loadGame, setLoadedStatus } from '../App/actions'

class StartScreen extends React.Component {
	constructor() {
		super()

		this.loadGameState = this.loadGameState.bind(this)
	}

	componentDidMount() {
		const { setLoadedStatus } = this.props

		setLoadedStatus()
	}

	loadGameState() {
		const { loadGame, history } = this.props

		loadGame(history)
	}

	render() {
		return (
			<div className="start-screen">
				<div className="start-screen__content">
					<div className="start-screen__heading">
						<h1>{startScreenTitle}</h1>
					</div>

					<div className="start-screen__menu">
						<ul>
							{menuLinks.map(({ id, label, href, loadGame }) => (
								<li key={id}>
									<Button
										type="link"
										text={label}
										href={href ? href : null}
										clickHandler={
											loadGame ? this.loadGameState : null
										}
									/>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

StartScreen.propTypes = {
	loadGame: PropTypes.func,
	history: PropTypes.object,
	setLoadedStatus: PropTypes.func
}

const mapDispatchToProps = {
	loadGame,
	setLoadedStatus
}

export default connect(null, mapDispatchToProps)(StartScreen)
