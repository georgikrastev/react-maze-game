import React from 'react'
import { headingTitle, headingSubtitle } from './constants'

const Heading = () => (
	<div className="heading">
		<h1 className="heading__title">{headingTitle}</h1>

		<h3 className="heading__subtitle">{headingSubtitle}</h3>
	</div>
)

export default Heading
