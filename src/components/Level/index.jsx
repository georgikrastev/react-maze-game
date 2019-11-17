import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createPropsSelector } from 'reselect-immutable-helpers'

import { initializeLevel } from './actions'
import { getLevelSize, getLevelCells } from './selectors'
import { allDirections } from './constants'

import Cell from '../Cell'

import './styles.css'
class Level extends React.Component {
	componentDidMount() {
		const { initializeLevel } = this.props

		initializeLevel()
	}

	render() {
		const { levelSize, levelCells } = this.props

		return levelCells ? (
			<div className={`level level--size-${levelSize}`}>
				{levelCells.map(({ key, allowedDirections, isStart }) => {
					let classesString
					let classesList = []

					allDirections.map(direction => {
						if (!allowedDirections.includes(direction)) {
							classesList.push(`level__cell--border-${direction}`)
						}
					})

					if (isStart) {
						classesList.push('level__cell--start')
					}

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
	initializeLevel: PropTypes.func
}

const mapStateToProps = createPropsSelector({
	levelSize: getLevelSize,
	levelCells: getLevelCells
})

const mapDispatchToProps = {
	initializeLevel
}

export default connect(mapStateToProps, mapDispatchToProps)(Level)
