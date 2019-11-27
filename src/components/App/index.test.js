/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import ConnectedApp from './'

const App = ConnectedApp.WrappedComponent

const DEMO_PROPS = {
	startGame: jest.fn(),
	loadGame: jest.fn(),
	difficulty: 'EASY',
	isLoadedFromStorage: false
}

describe('App component', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<App {...DEMO_PROPS} />)
		expect(wrapper).toHaveLength(1)
	})

	it('can start game', () => {
		const wrapper = shallow(<App {...DEMO_PROPS} />)
		const component = wrapper.instance()
		expect(component.props.startGame).toHaveBeenCalledWith(
			DEMO_PROPS.difficulty
		)
	})

	it('can load game', () => {
		const wrapper = shallow(
			<App {...DEMO_PROPS} isLoadedFromStorage={true} />
		)
		const component = wrapper.instance()
		expect(component.props.loadGame).toHaveBeenCalled()
	})
})
