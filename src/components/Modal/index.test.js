/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import ConnectedModal from './'

const Modal = ConnectedModal.WrappedComponent

describe('Modal component', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<Modal />)
		expect(wrapper).toHaveLength(1)
	})

	it('is opened if "isModalOpened" is true', () => {
		const wrapper = shallow(<Modal isModalOpened={true} />)
		expect(wrapper.hasClass('modal--open')).toBe(true)
	})

	it('is closed if "isModalOpened" is false', () => {
		const wrapper = shallow(<Modal isModalOpened={false} />)
		expect(wrapper.hasClass('modal--open')).toBe(false)
	})

	it('can be closed', () => {
		const toggleModalMock = jest.fn()
		const wrapper = shallow(<Modal toggleModal={toggleModalMock} />)
		const component = wrapper.instance()

		component.closeModal()
		expect(toggleModalMock).toHaveBeenCalledWith(false)
	})

	it('can load next level and close itself', () => {
		const initializeLevelMock = jest.fn()
		const toggleModalMock = jest.fn()
		const wrapper = shallow(
			<Modal
				initializeLevel={initializeLevelMock}
				toggleModal={toggleModalMock}
			/>
		)
		const component = wrapper.instance()

		component.loadNextLevel()
		expect(initializeLevelMock).toHaveBeenCalled()
		expect(toggleModalMock).toHaveBeenCalledWith(false)
	})
})
