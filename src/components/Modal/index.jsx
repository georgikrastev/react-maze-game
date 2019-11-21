import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createPropsSelector } from 'reselect-immutable-helpers'
import classNames from 'classnames'

import { modalText } from './constants'
import { getAppModalStatus } from '../App/selectors'

const Modal = ({ isModalOpened }) => {
	return (
		<div className={classNames('modal', { 'modal--open': isModalOpened })}>
			<div className="modal__overlay"></div>

			<div className="modal__content">
				<div className="modal__body">
					<h4>{modalText}</h4>
				</div>

				<div className="modal__actions"></div>
			</div>
		</div>
	)
}

Modal.propTypes = {
	isModalOpened: PropTypes.bool
}

const mapStateToProps = createPropsSelector({
	isModalOpened: getAppModalStatus
})

export default connect(mapStateToProps)(Modal)
