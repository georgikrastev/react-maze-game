import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createPropsSelector } from 'reselect-immutable-helpers'
import throttle from 'lodash.throttle'
import { Swipeable } from 'react-swipeable'

import { getLevelSize, getLevelCells, getLevelStart } from './selectors'
import {
	allDirections,
	LEFT_ARROW_KEYCODE,
	RIGHT_ARROW_KEYCODE,
	UP_ARROW_KEYCODE,
	DOWN_ARROW_KEYCODE,
	LEFT_STRING,
	RIGHT_STRING,
	UP_STRING,
	DOWN_STRING,
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

		this.handleEvent = throttle(
			this.handleEvent.bind(this),
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

	handleEvent(event) {
		const { appPosition } = this.props
		const expression = event.keyCode || event.dir.toLowerCase()
		const leftValue = event.keyCode ? LEFT_ARROW_KEYCODE : LEFT_STRING
		const rightValue = event.keyCode ? RIGHT_ARROW_KEYCODE : RIGHT_STRING
		const upValue = event.keyCode ? UP_ARROW_KEYCODE : UP_STRING
		const downValue = event.keyCode ? DOWN_ARROW_KEYCODE : DOWN_STRING

		// Update position based on pressed arrow keys
		switch (expression) {
			case leftValue:
				return this.updatePosition(
					{
						x: appPosition.x - 1,
						y: appPosition.y
					},
					'left'
				)
			case rightValue:
				return this.updatePosition(
					{
						x: appPosition.x + 1,
						y: appPosition.y
					},
					'right'
				)
			case upValue:
				return this.updatePosition(
					{
						x: appPosition.x,
						y: appPosition.y - 1
					},
					'up'
				)
			case downValue:
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
		document.addEventListener('keydown', this.handleEvent)
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
		document.removeEventListener('keydown', this.handleEvent)
	}

	render() {
		const { levelSize, levelCells } = this.props
		const swipeableConfig = {
			delta: 10,
			preventDefaultTouchmoveEvent: true,
			trackTouch: true,
			trackMouse: false,
			rotationAngle: 0
		}

		return levelCells ? (
			<Swipeable onSwiped={this.handleEvent} {...swipeableConfig}>
				<div className={`level level--size-${levelSize}`}>
					<Pin />

					{levelCells.map(({ key, allowedDirections }) => {
						let classesString
						let classesList = []

						/* eslint-disable array-callback-return */
						allDirections.map(direction => {
							if (!allowedDirections.includes(direction)) {
								classesList.push(
									`level__cell--border-${direction}`
								)
							}
						})

						classesString = classesList.join(' ')

						return <Cell classesString={classesString} key={key} />
					})}
				</div>
			</Swipeable>
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
