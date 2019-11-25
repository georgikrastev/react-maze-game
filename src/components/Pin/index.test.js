/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import ConnectedPin from './'

const Pin = ConnectedPin.WrappedComponent
const DEMO_PROPS = {
	levelSize: 10,
	appPosition: {
		x: 0,
		y: 0
	}
}

describe('Pin component', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<Pin {...DEMO_PROPS} />)
		expect(wrapper).toHaveLength(1)
	})

	it('has "level__pin" class', () => {
		const wrapper = shallow(<Pin {...DEMO_PROPS} />)
		expect(wrapper.hasClass('level__pin')).toBe(true)
	})

	it('has inline styles', () => {
		const demoStyle = { transform: 'translate3d(28px, 28px, 0)' }
		const wrapper = shallow(<Pin {...DEMO_PROPS} />)
		expect(wrapper.prop('style')).toEqual(demoStyle)
	})
})
