import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createPropsSelector } from 'reselect-immutable-helpers'
import throttle from 'lodash.throttle'

import { getLevelSize, getLevelCells, getLevelStart } from './selectors'
import {
	allDirections,
	LEFT_ARROW,
	RIGHT_ARROW,
	UP_ARROW,
	DOWN_ARROW,
	TRANSITION_DELAY
} from './constants'

import {
	updateCurrentPosition,
	toggleModal,
	setCurrentPosition
} from '../App/actions'
import { getAppPosition, getAppLoadedFromStorage } from '../App/selectors'
import { areObjectsEqual } from '../../utils/utils'

import Cell from '../Cell'
import Pin from '../Pin'

class Level extends React.Component {
	constructor() {
		super()

		this.handleKeyDown = throttle(
			this.handleKeyDown.bind(this),
			TRANSITION_DELAY,
			{ trailing: false }
		)
		this.updatePosition = throttle(
			this.updatePosition.bind(this),
			TRANSITION_DELAY,
			{
				trailing: false
			}
		)
	}

	updatePosition(positionObj, direction) {
		const {
			appPosition,
			updateCurrentPosition,
			levelCells,
			toggleModal
		} = this.props

		const currentCell = levelCells.find(cell =>
			areObjectsEqual(cell.coordinates, appPosition)
		)

		const nextCell = levelCells.find(cell =>
			areObjectsEqual(cell.coordinates, positionObj)
		)

		const isAllowedDirection = currentCell.allowedDirections.includes(
			direction
		)

		const isEnd = nextCell ? nextCell.isEnd : false

		if (isAllowedDirection) {
			// Change player position
			updateCurrentPosition(positionObj)

			if (isEnd) {
				setTimeout(() => {
					toggleModal(true)
				}, TRANSITION_DELAY)
			}
		}
	}

	handleKeyDown(event) {
		const { appPosition } = this.props

		// Update position based on pressed arrow keys
		switch (event.keyCode) {
			case LEFT_ARROW:
				return this.updatePosition(
					{
						x: appPosition.x - 1,
						y: appPosition.y
					},
					'left'
				)
			case RIGHT_ARROW:
				return this.updatePosition(
					{
						x: appPosition.x + 1,
						y: appPosition.y
					},
					'right'
				)
			case UP_ARROW:
				return this.updatePosition(
					{
						x: appPosition.x,
						y: appPosition.y - 1
					},
					'up'
				)
			case DOWN_ARROW:
				return this.updatePosition(
					{
						x: appPosition.x,
						y: appPosition.y + 1
					},
					'down'
				)
			default:
				break
		}
	}

	componentDidMount() {
		// Add keyboards event listeners
		document.addEventListener('keydown', this.handleKeyDown)
	}

	componentDidUpdate(prevProps) {
		const {
			levelStart: { coordinates },
			setCurrentPosition,
			isLoadedFromStorage
		} = this.props

		if (
			prevProps.levelStart &&
			coordinates !== prevProps.levelStart.coordinates &&
			!isLoadedFromStorage
		) {
			setCurrentPosition(coordinates)
		}
	}

	componentWillUnmount() {
		// Remove keyboard event listeners
		document.removeEventListener('keydown', this.handleKeyDown)
	}

	render() {
		const { levelSize, levelCells } = this.props

		return levelCells ? (
			<div className={`level level--size-${levelSize}`}>
				<Pin />

				{levelCells.map(({ key, allowedDirections }) => {
					let classesString
					let classesList = []

					/* eslint-disable array-callback-return */
					allDirections.map(direction => {
						if (!allowedDirections.includes(direction)) {
							classesList.push(`level__cell--border-${direction}`)
						}
					})

					classesString = classesList.join(' ')

					return <Cell classesString={classesString} key={key} />
				})}
			</div>
		) : null
	}
}

Level.propTypes = {
	level: PropTypes.object,
	levelSize: PropTypes.number,
	levelCells: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string,
			coordinates: PropTypes.shape({
				x: PropTypes.number,
				y: PropTypes.number
			}),
			allowedDirections: PropTypes.array
		})
	),
	levelStart: PropTypes.shape({
		coordinates: PropTypes.shape({
			x: PropTypes.number,
			y: PropTypes.number
		})
	}),
	appPosition: PropTypes.shape({
		x: PropTypes.number,
		y: PropTypes.number
	}),
	updateCurrentPosition: PropTypes.func,
	toggleModal: PropTypes.func,
	setCurrentPosition: PropTypes.func,
	isLoadedFromStorage: PropTypes.bool
}

const mapStateToProps = createPropsSelector({
	levelSize: getLevelSize,
	levelCells: getLevelCells,
	levelStart: getLevelStart,
	appPosition: getAppPosition,
	isLoadedFromStorage: getAppLoadedFromStorage
})

const mapDispatchToProps = {
	updateCurrentPosition,
	toggleModal,
	setCurrentPosition
}

export default connect(mapStateToProps, mapDispatchToProps)(Level)
