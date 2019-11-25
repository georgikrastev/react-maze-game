import { INITIALIZE_LEVEL } from './constants'

export const initializeLevel = levelObject => ({
	type: INITIALIZE_LEVEL,
	payload: levelObject
})
