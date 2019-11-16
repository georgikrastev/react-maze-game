import { INITIALIZE_LEVEL } from './constants'
import { levels } from '../../data/data'

export const initializeLevel = (level = 1) => ({
	type: INITIALIZE_LEVEL,
	payload: levels[level - 1]
})
