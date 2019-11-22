import React from 'react'
import { Link } from 'react-router-dom'

import { startScreenTitle, menuLinks } from './constants'

class StartScreen extends React.Component {
	render() {
		return (
			<div className="start-screen">
				<div className="start-screen__content">
					<div className="start-screen__heading">
						<h1>{startScreenTitle}</h1>
					</div>

					<div className="start-screen__menu">
						<ul>
							{menuLinks.map(({ id, label, href }) => (
								<li key={id}>
									<Link to={href}>{label}</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

export default StartScreen
