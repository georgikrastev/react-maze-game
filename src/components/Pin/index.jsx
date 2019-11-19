import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createPropsSelector } from 'reselect-immutable-helpers'

import { getPositionCoordinates } from '../../utils/utils'

import { getLevelSize } from '../Level/selectors'
import { getAppPosition } from '../App/selectors'

const Pin = ({ levelSize, appPosition }) => {
	const { computedLeft, computedTop } = getPositionCoordinates(
		levelSize,
		appPosition
	)

	const computedStyles = {
		transform: `translate3d(${computedLeft}px, ${computedTop}px, 0)`
	}

	return <div className="level__pin" style={computedStyles}></div>
}

Pin.propTypes = {
	levelSize: PropTypes.number,
	appPosition: PropTypes.shape({
		x: PropTypes.number,
		y: PropTypes.number
	})
}

const mapStateToProps = createPropsSelector({
	levelSize: getLevelSize,
	appPosition: getAppPosition
})

export default connect(mapStateToProps)(Pin)
