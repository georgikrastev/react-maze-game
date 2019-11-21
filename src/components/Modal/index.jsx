import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createPropsSelector } from 'reselect-immutable-helpers'

import { getAppModalStatus } from '../App/selectors'

const Modal = ({ isModalOpened }) => {
	return isModalOpened ? (
		<div className="modal">
			<div className="modal__overlay"></div>

			<div className="modal__content">
				<div className="modal__body"></div>

				<div className="modal__actions"></div>
			</div>
		</div>
	) : null
}

Modal.propTypes = {
	isModalOpened: PropTypes.bool
}

const mapStateToProps = createPropsSelector({
	isModalOpened: getAppModalStatus
})

export default connect(mapStateToProps)(Modal)
