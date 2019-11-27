/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import ConnectedStartScreen from './'

const StartScreen = ConnectedStartScreen.WrappedComponent

describe('StartScreen component', () => {
	const toggleAlertMock = jest.fn()

	it('renders correctly', () => {
		const wrapper = shallow(<StartScreen toggleAlert={toggleAlertMock} />)
		expect(wrapper).toHaveLength(1)
	})

	it('starts new game if start game object is provided', () => {
		const DEMO_PROPS = {
			toggleAlert: jest.fn(),
			setLoadedStatus: jest.fn(),
			setDifficulty: jest.fn(),
			history: {
				push: jest.fn()
			}
		}

		const demoActionObject = {
			type: 'START',
			difficulty: 'EASY'
		}

		const wrapper = shallow(<StartScreen {...DEMO_PROPS} />)
		const component = wrapper.instance()
		component.handleButtonClick(demoActionObject)
		expect(component.props.setLoadedStatus).toHaveBeenCalledWith(false)
		expect(component.props.setDifficulty).toHaveBeenCalledWith(
			demoActionObject.difficulty
		)
		expect(component.props.history.push).toHaveBeenCalled()
	})

	it('shows Alert if load game object is provided but there is no data in localStorage to load', () => {
		const DEMO_PROPS = {
			toggleAlert: jest.fn(),
			setLoadedStatus: jest.fn(),
			history: {
				push: jest.fn()
			}
		}

		const demoActionObject = {
			type: 'LOAD'
		}

		const wrapper = shallow(<StartScreen {...DEMO_PROPS} />)
		const component = wrapper.instance()
		component.handleButtonClick(demoActionObject)
		expect(component.props.toggleAlert).toHaveBeenCalledWith(true)
	})
})
