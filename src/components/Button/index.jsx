import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

const Button = ({ text, type, clickHandler, href }) => {
	const customClasses = classNames('button', {
		[`button--${type}`]: Boolean(type)
	})

	return href ? (
		<Link to={href} className={customClasses}>
			{text}
		</Link>
	) : (
		<button
			className={customClasses}
			onClick={clickHandler ? clickHandler : null}
		>
			{text}
		</button>
	)
}

Button.propTypes = {
	text: PropTypes.string,
	type: PropTypes.string,
	clickHandler: PropTypes.func,
	href: PropTypes.string
}

export default Button
