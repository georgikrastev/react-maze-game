import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createPropsSelector } from 'reselect-immutable-helpers'

import { initializeLevel } from './actions'
import { getLevelSize } from './selectors'
class Level extends React.Component {
	componentDidMount() {
		const { initializeLevel } = this.props

		initializeLevel()
	}

	render() {
		const { levelSize } = this.props

		return (
			<div className={`level level--size-${levelSize}`}>Level Markup</div>
		)
	}
}

Level.propTypes = {
	level: PropTypes.object,
	levelSize: PropTypes.number,
	initializeLevel: PropTypes.func
}

const mapStateToProps = createPropsSelector({
	levelSize: getLevelSize
})

const mapDispatchToProps = {
	initializeLevel
}

export default connect(mapStateToProps, mapDispatchToProps)(Level)
