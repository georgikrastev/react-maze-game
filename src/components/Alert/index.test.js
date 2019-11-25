/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import ConnectedAlert from './'

const Alert = ConnectedAlert.WrappedComponent

describe('Alert component', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<Alert />)
		expect(wrapper).toHaveLength(1)
	})

	it('can close', () => {
		const toggleAlert = jest.fn()
		const wrapper = shallow(<Alert toggleAlert={toggleAlert} />)
		const component = wrapper.instance()

		component.closeAlert()
		expect(toggleAlert).toHaveBeenCalledWith(false)
	})
})
