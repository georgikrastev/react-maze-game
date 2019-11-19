import { LEVEL_WIDTH } from '../components/Level/constants'

export const getPositionCoordinates = (levelSize, { x, y }) => {
	const percentage = 1 / levelSize
	const leftPercentage = x * percentage + percentage / 2
	const topPercentage = y * percentage + percentage / 2

	return {
		computedLeft: leftPercentage * LEVEL_WIDTH,
		computedTop: topPercentage * LEVEL_WIDTH
	}
}

export const areObjectsEqual = (obj1, obj2) =>
	JSON.stringify(obj1) === JSON.stringify(obj2)
