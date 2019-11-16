import React from 'react'
import PropTypes from 'prop-types'

const Cell = ({ classesString }) => (
	<div className={`level__cell ${classesString}`}></div>
)

Cell.propTypes = {
	classesString: PropTypes.string
}

export default Cell
