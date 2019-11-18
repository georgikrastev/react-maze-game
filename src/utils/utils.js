export const getPositionCoordinates = (levelSize, { x, y }) => {
	const percentage = 1 / levelSize
	const leftPercentage = x * percentage + percentage / 2
	const topPercentage = y * percentage + percentage / 2

	return {
		computedLeft: leftPercentage * 640,
		computedTop: topPercentage * 640
	}
}
