import { LEVEL_WIDTH } from '../components/Level/constants'
import { difficulty } from '../components/App/constants'

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

export const recursiveBacktrack = (
	indexStack,
	visitedCells,
	currentCellIndex,
	levelCells,
	levelSize,
	levelLength
) => {
	if (indexStack.length > 0) {
		const unvisitedAdjacentCells = []

		const leftAdjacentCellIndex = currentCellIndex - 1
		const rightAdjacentCellIndex = currentCellIndex + 1
		const topAdjacentCellIndex = currentCellIndex - levelSize
		const bottomAdjacentCellIndex = currentCellIndex + levelSize
		const isFirstColumn = currentCellIndex % levelSize === 0
		const isLastColumn = currentCellIndex % levelSize === levelSize - 1
		const isFirstRow = Math.floor(currentCellIndex / levelSize) === 0
		const isLastRow =
			Math.floor(currentCellIndex / levelSize) === levelSize - 1

		// Check if adjacent left cell is unvisited
		if (
			leftAdjacentCellIndex > 0 &&
			leftAdjacentCellIndex < levelLength &&
			!isFirstColumn &&
			!visitedCells.includes(leftAdjacentCellIndex)
		) {
			unvisitedAdjacentCells.push({
				index: leftAdjacentCellIndex,
				direction: 'left',
				oppositeDirection: 'right'
			})
		}

		// Check if adjacent right cell is unvisited
		if (
			rightAdjacentCellIndex > 0 &&
			rightAdjacentCellIndex < levelLength &&
			!isLastColumn &&
			!visitedCells.includes(rightAdjacentCellIndex)
		) {
			unvisitedAdjacentCells.push({
				index: rightAdjacentCellIndex,
				direction: 'right',
				oppositeDirection: 'left'
			})
		}

		// Check if adjacent top cell is unvisited
		if (
			topAdjacentCellIndex > 0 &&
			topAdjacentCellIndex < levelLength &&
			!isFirstRow &&
			!visitedCells.includes(topAdjacentCellIndex)
		) {
			unvisitedAdjacentCells.push({
				index: topAdjacentCellIndex,
				direction: 'up',
				oppositeDirection: 'down'
			})
		}

		// Check if adjacent bottom cell is unvisited
		if (
			bottomAdjacentCellIndex > 0 &&
			bottomAdjacentCellIndex < levelLength &&
			!isLastRow &&
			!visitedCells.includes(bottomAdjacentCellIndex)
		) {
			unvisitedAdjacentCells.push({
				index: bottomAdjacentCellIndex,
				direction: 'down',
				oppositeDirection: 'up'
			})
		}

		// If dead end is encountered start back tracking by popping
		// off the last visited cell from the indexStack array
		// until you find a cell with unvisited adjacent cells or
		// until indexStack array is empty
		if (unvisitedAdjacentCells.length < 1) {
			indexStack.pop()
			currentCellIndex = indexStack[indexStack.length - 1]

			if (indexStack.length > 0) {
				recursiveBacktrack(
					indexStack,
					visitedCells,
					currentCellIndex,
					levelCells,
					levelSize,
					levelLength
				)
			}
		}

		if (indexStack.length === 0) {
			return
		}

		// Take random cell from the unvisited adjacent cells array
		const randomAdjacentCell =
			unvisitedAdjacentCells[
				Math.floor(Math.random() * unvisitedAdjacentCells.length)
			]
		const randomAdjacentCellIndex = randomAdjacentCell.index
		const randomAdjacentCellDirection = randomAdjacentCell.direction
		const randomAdjacentCellOppositeDirection =
			randomAdjacentCell.oppositeDirection

		// Update level cell using the randomly chosen cell index above
		levelCells[currentCellIndex].allowedDirections.push(
			randomAdjacentCellDirection
		)
		levelCells[randomAdjacentCellIndex].allowedDirections.push(
			randomAdjacentCellOppositeDirection
		)

		// Update visited cells array and current cell index
		currentCellIndex = randomAdjacentCellIndex
		visitedCells.push(currentCellIndex)
		indexStack.push(currentCellIndex)

		recursiveBacktrack(
			indexStack,
			visitedCells,
			currentCellIndex,
			levelCells,
			levelSize,
			levelLength
		)
	}
}

export const generateMaze = (difficultyLevel = difficulty.easy) => {
	let levelSize = 10
	let levelCells = []
	let visitedCells = []
	let indexStack = []
	const currentCellIndex = 0

	// Set level size based on selected difficulty
	switch (difficultyLevel) {
		case difficulty.easy:
			levelSize = 10
			break
		case difficulty.normal:
			levelSize = 14
			break
		case difficulty.medium:
			levelSize = 18
			break
		case difficulty.hard:
			levelSize = 22
			break
		case difficulty.insane:
			levelSize = 26
			break
		default:
			break
	}

	const levelLength = Math.pow(levelSize, 2)

	// Generate level cells
	for (let i = 0; i < levelLength; i++) {
		const x = i % levelSize
		const y = Math.floor(i / levelSize)

		levelCells[i] = {
			coordinates: {
				x,
				y
			},
			allowedDirections: [],
			key: `${x}-${y}`
		}

		if (x === 0 && y === 0) {
			levelCells[i].isStart = true
		}

		if (x === levelSize - 1 && y === levelSize - 1) {
			levelCells[i].isEnd = true
		}
	}

	// Update level cells based on `Recursive Backtracker algorithm`
	visitedCells.push(currentCellIndex)
	indexStack.push(currentCellIndex)

	recursiveBacktrack(
		indexStack,
		visitedCells,
		currentCellIndex,
		levelCells,
		levelSize,
		levelLength
	)

	return {
		size: levelSize,
		cells: levelCells,
		start: {
			coordinates: {
				x: 0,
				y: 0
			}
		},
		end: {
			coordinates: {
				x: levelSize - 1,
				y: levelSize - 1
			}
		}
	}
}
