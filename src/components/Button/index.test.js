/* eslint-env jest */
import React from 'react'
import { shallow, mount } from 'enzyme'
import Button from './'

describe('Button component', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<Button />)
		expect(wrapper).toHaveLength(1)
	})

	it('renders <button> tag if Button does not have a href prop', () => {
		const wrapper = mount(<Button text="test" />)
		expect(wrapper.find('button')).toHaveLength(1)
	})
})
