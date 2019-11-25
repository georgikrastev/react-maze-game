/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import Router from './'

describe('Router component', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<Router />)
		expect(wrapper).toHaveLength(1)
	})

	it('has routes', () => {
		const wrapper = shallow(<Router />)
		expect(wrapper.find('Route').length).toBeGreaterThan(0)
	})
})
