import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createPropsSelector } from 'reselect-immutable-helpers'
import classNames from 'classnames'

import Button from '../Button'

import { modalTitle, modalText } from './constants'
import { getAppModalStatus, getAppDifficulty } from '../App/selectors'
import { toggleModal } from '../App/actions'
import { initializeLevel } from '../Level/actions'
import { generateMaze } from '../../utils/generator'

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
		const { initializeLevel, difficulty } = this.props

		initializeLevel(generateMaze(difficulty))
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
							href="/"
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
	difficulty: PropTypes.string
}

const mapStateToProps = createPropsSelector({
	isModalOpened: getAppModalStatus,
	difficulty: getAppDifficulty
})

const mapDispatchToProps = {
	toggleModal,
	initializeLevel
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
