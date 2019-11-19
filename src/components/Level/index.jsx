import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createPropsSelector } from 'reselect-immutable-helpers'
import throttle from 'lodash.throttle'

import { initializeLevel } from './actions'
import { getLevelSize, getLevelCells } from './selectors'
import {
	allDirections,
	LEFT_ARROW,
	RIGHT_ARROW,
	UP_ARROW,
	DOWN_ARROW,
	TRANSITION_DELAY
} from './constants'

import { updateCurrentPosition } from '../App/actions'
import { getAppPosition } from '../App/selectors'
import { areObjectsEqual } from '../../utils/utils'

import Cell from '../Cell'
import Pin from '../Pin'

import './styles.css'
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
		const { appPosition, updateCurrentPosition, levelCells } = this.props

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
					// Stop the game and show the player an alert
					alert("Congratulations! You've escaped the maze!")
					document.removeEventListener('keydown', this.handleKeyDown)
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
		const { initializeLevel } = this.props

		// Initialize Level in store
		initializeLevel()

		// Add keyboards event listeners
		document.addEventListener('keydown', this.handleKeyDown)
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

				{levelCells.map(
					({ key, allowedDirections, isStart, isEnd }) => {
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

						if (isStart) {
							classesList.push('level__cell--start')
						}

						if (isEnd) {
							classesList.push('level__cell--end')
						}

						classesString = classesList.join(' ')

						return <Cell classesString={classesString} key={key} />
					}
				)}
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
	initializeLevel: PropTypes.func,
	appPosition: PropTypes.shape({
		x: PropTypes.number,
		y: PropTypes.number
	}),
	updateCurrentPosition: PropTypes.func
}

const mapStateToProps = createPropsSelector({
	levelSize: getLevelSize,
	levelCells: getLevelCells,
	appPosition: getAppPosition
})

const mapDispatchToProps = {
	initializeLevel,
	updateCurrentPosition
}

export default connect(mapStateToProps, mapDispatchToProps)(Level)
