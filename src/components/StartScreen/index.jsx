import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from '../Button'
import Alert from '../Alert'

import { startScreenTitle, menuLinks } from './constants'
import { toggleAlert } from './actions'
import { setDifficulty, setLoadedStatus } from '../App/actions'

class StartScreen extends React.Component {
	constructor() {
		super()

		this.handleButtonClick = this.handleButtonClick.bind(this)
	}

	componentDidMount() {
		const { toggleAlert } = this.props

		toggleAlert()
	}

	handleButtonClick(action) {
		const {
			setDifficulty,
			setLoadedStatus,
			history,
			toggleAlert
		} = this.props

		switch (action.type) {
			case 'START':
				setLoadedStatus(false)
				setDifficulty(action.difficulty)
				history.push('/playing')
				break
			case 'LOAD':
				if (
					localStorage.length > 0 &&
					localStorage.getItem('level') &&
					localStorage.getItem('position')
				) {
					setLoadedStatus(true)
					history.push('/playing')
				} else {
					toggleAlert(true)
				}
				break
			default:
				break
		}
	}

	render() {
		return (
			<React.Fragment>
				<div className="start-screen">
					<div className="start-screen__content">
						<div className="start-screen__heading">
							<h1>{startScreenTitle}</h1>
						</div>

						<div className="start-screen__menu">
							<ul>
								{menuLinks.map(({ id, label, action }) => (
									<li key={id}>
										<Button
											type="link"
											text={label}
											clickHandler={() =>
												this.handleButtonClick(action)
											}
										/>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				<Alert type="warning" text="Nothing to load!" />
			</React.Fragment>
		)
	}
}

StartScreen.propTypes = {
	setDifficulty: PropTypes.func,
	setLoadedStatus: PropTypes.func,
	history: PropTypes.object,
	toggleAlert: PropTypes.func
}

const mapDispatchToProps = {
	setDifficulty,
	setLoadedStatus,
	toggleAlert
}

export default connect(null, mapDispatchToProps)(StartScreen)
