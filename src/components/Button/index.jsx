import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Button = ({ text, type, clickHandler }) => (
	<button
		className={classNames('button', {
			[`button--${type}`]: Boolean(type)
		})}
		onClick={clickHandler ? clickHandler : null}
	>
		{text}
	</button>
)

Button.propTypes = {
	text: PropTypes.string,
	type: PropTypes.string,
	clickHandler: PropTypes.func
}

export default Button
