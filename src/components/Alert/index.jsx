import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { createPropsSelector } from 'reselect-immutable-helpers'

import { toggleAlert } from '../StartScreen/actions'
import { getAppAlertOpened } from '../App/selectors'

class Alert extends React.Component {
	constructor() {
		super()

		this.closeAlert = this.closeAlert.bind(this)
	}

	closeAlert() {
		const { toggleAlert } = this.props

		toggleAlert(false)
	}

	render() {
		const { type, text, isAlertOpened } = this.props
		const customClasses = classNames('alert', {
			[`alert--${type}`]: Boolean(type),
			'is--visible': isAlertOpened
		})

		return (
			<div className={customClasses}>
				<div className="alert__content">{text}</div>

				<div className="alert__close" onClick={this.closeAlert}></div>
			</div>
		)
	}
}

Alert.propTypes = {
	type: PropTypes.string,
	text: PropTypes.string,
	toggleAlert: PropTypes.func,
	isAlertOpened: PropTypes.bool
}

const mapStateToProps = createPropsSelector({
	isAlertOpened: getAppAlertOpened
})

const mapDispatchToProps = {
	toggleAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert)
