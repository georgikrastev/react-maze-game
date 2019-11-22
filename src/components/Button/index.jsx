import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

const Button = ({ text, type, clickHandler, href }) => (
	<button
		className={classNames('button', {
			[`button--${type}`]: Boolean(type)
		})}
		onClick={clickHandler ? clickHandler : null}
	>
		{href ? <Link to={href}>{text}</Link> : text}
	</button>
)

Button.propTypes = {
	text: PropTypes.string,
	type: PropTypes.string,
	clickHandler: PropTypes.func,
	href: PropTypes.string
}

export default Button
