/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import Heading from './'

describe('Heading component', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<Heading />)
		expect(wrapper).toHaveLength(1)
	})

	it('has "title"', () => {
		const wrapper = shallow(<Heading />)
		expect(wrapper.find('.heading__title')).toHaveLength(1)
	})

	it('has "subtitle"', () => {
		const wrapper = shallow(<Heading />)
		expect(wrapper.find('.heading__subtitle')).toHaveLength(1)
	})
})
