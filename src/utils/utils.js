import { LEVEL_WIDTH, LEVEL_PADDING } from '../components/Level/constants'

export const getPositionCoordinates = (levelSize, { x, y }) => {
	const percentage = 1 / levelSize
	const leftPercentage = x * percentage + percentage / 2
	const topPercentage = y * percentage + percentage / 2
	const windowWidth = window.outerWidth
	const computedLeft =
		windowWidth < LEVEL_WIDTH
			? leftPercentage * (windowWidth - LEVEL_PADDING * 2)
			: leftPercentage * LEVEL_WIDTH
	const computedTop =
		windowWidth < LEVEL_WIDTH
			? topPercentage * (windowWidth - LEVEL_PADDING * 2)
			: topPercentage * LEVEL_WIDTH

	return {
		computedLeft,
		computedTop
	}
}

export const areObjectsEqual = (obj1, obj2) =>
	JSON.stringify(obj1) === JSON.stringify(obj2)
