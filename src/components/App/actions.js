import {
	SET_CURRENT_POSITION,
	TOGGLE_MODAL,
	SET_LOADED_STATUS,
	SET_DIFFICULTY_LEVEL
} from './constants'
import { getAppPosition } from './selectors'
import { initializeLevel } from '../Level/actions'
import { getLevel, getLevelStart } from '../Level/selectors'
import { generateMaze } from '../../utils/generator'

export const setCurrentPosition = positionObj => ({
	type: SET_CURRENT_POSITION,
	payload: {
		position: positionObj
	}
})

export const updateCurrentPosition = startPos => (dispatch, getState) => {
	const levelStartPos = startPos || getLevelStart(getState()).coordinates
	return dispatch(setCurrentPosition(levelStartPos))
}

export const toggleModal = (status = false) => ({
	type: TOGGLE_MODAL,
	payload: {
		isModalOpened: status
	}
})

export const setLoadedStatus = (status = false) => ({
	type: SET_LOADED_STATUS,
	payload: {
		isLoadedFromStorage: status
	}
})

export const setDifficulty = difficultyLevel => ({
	type: SET_DIFFICULTY_LEVEL,
	payload: {
		difficulty: difficultyLevel
	}
})

export const startGame = (difficultyLevel = 'EASY') => dispatch => {
	dispatch(initializeLevel(generateMaze(difficultyLevel)))
	dispatch(updateCurrentPosition())
	dispatch(toggleModal(false))
}

export const saveGame = history => (dispatch, getState) => {
	const level = getLevel(getState())
	const position = getAppPosition(getState())

	if (localStorage) {
		localStorage.setItem('level', JSON.stringify(level))
		localStorage.setItem('position', JSON.stringify(position))
		history.push('/')
	}
}

export const loadGame = () => dispatch => {
	const level = JSON.parse(localStorage.getItem('level'))
	const position = JSON.parse(localStorage.getItem('position'))

	dispatch(initializeLevel(level))
	dispatch(updateCurrentPosition(position))
	dispatch(toggleModal(false))
}
