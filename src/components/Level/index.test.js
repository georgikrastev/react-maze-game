/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import ConnectedLevel from './'

const Level = ConnectedLevel.WrappedComponent

describe('Level component', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<Level />)
		expect(wrapper).toHaveLength(1)
	})
})
