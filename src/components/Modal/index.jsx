import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createPropsSelector } from 'reselect-immutable-helpers'
import classNames from 'classnames'

import Button from '../Button'

import { modalTitle, modalText } from './constants'
import { getAppModalStatus, getAppLevelNumber } from '../App/selectors'
import { toggleModal, setCurrentLevelNumber } from '../App/actions'
import { initializeLevel } from '../Level/actions'

class Modal extends React.Component {
	constructor() {
		super()

		this.closeModal = this.closeModal.bind(this)
		this.loadNextLevel = this.loadNextLevel.bind(this)
	}

	closeModal() {
		const { toggleModal } = this.props

		toggleModal(false)
	}

	loadNextLevel() {
		const { initializeLevel, setCurrentLevelNumber, level } = this.props
		const nextLevel = level + 1

		setCurrentLevelNumber(nextLevel)
		initializeLevel(nextLevel)
		this.closeModal()
	}

	render() {
		const { isModalOpened } = this.props

		return (
			<div
				className={classNames('modal', {
					'modal--open': isModalOpened
				})}
			>
				<div className="modal__overlay" onClick={this.closeModal}></div>

				<div className="modal__content">
					<div className="modal__body">
						<h4>{modalTitle}</h4>

						{modalText && <p>{modalText}</p>}
					</div>

					<div className="modal__actions">
						<Button
							text="No"
							type="secondary"
							clickHandler={this.closeModal}
						/>

						<Button
							text="Yes"
							type="primary"
							clickHandler={this.loadNextLevel}
						/>
					</div>
				</div>
			</div>
		)
	}
}

Modal.propTypes = {
	isModalOpened: PropTypes.bool,
	toggleModal: PropTypes.func,
	initializeLevel: PropTypes.func,
	setCurrentLevelNumber: PropTypes.func,
	level: PropTypes.number
}

const mapStateToProps = createPropsSelector({
	isModalOpened: getAppModalStatus,
	level: getAppLevelNumber
})

const mapDispatchToProps = {
	toggleModal,
	initializeLevel,
	setCurrentLevelNumber
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
