import { SET_CURRENT_LEVEL_NUMBER, SET_CURRENT_POSITION } from './constants'
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
