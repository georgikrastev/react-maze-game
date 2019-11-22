import {
	SET_CURRENT_LEVEL_NUMBER,
	SET_CURRENT_POSITION,
	TOGGLE_MODAL,
	SET_LOADED_STATUS
} from './constants'
import { initializeLevel } from '../Level/actions'
import { getLevelStart } from '../Level/selectors'

export const setCurrentLevelNumber = (level = 1) => ({
	type: SET_CURRENT_LEVEL_NUMBER,
	payload: {
		playing: level
	}
})

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

export const loadGame = history => dispatch => {
	if (
		localStorage.length > 0 &&
		localStorage.level &&
		localStorage.position
	) {
		const level = Number(localStorage.level)
		const position = JSON.parse(localStorage.position)

		dispatch(setLoadedStatus(true))
		dispatch(setCurrentLevelNumber(level))
		dispatch(initializeLevel(level))
		dispatch(updateCurrentPosition(position))
		dispatch(toggleModal(false))

		history.push('/playing')
	} else {
		alert('Nothing to load!') // Swap this with alert message
	}
}
