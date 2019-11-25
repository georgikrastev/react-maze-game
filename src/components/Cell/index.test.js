/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import Cell from './'

describe('Cell component', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<Cell />)
		expect(wrapper).toHaveLength(1)
	})

	it('has "level__cell" class', () => {
		const wrapper = shallow(<Cell />)
		expect(wrapper.hasClass('level__cell')).toBe(true)
	})
})
