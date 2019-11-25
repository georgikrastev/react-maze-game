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
	stack,
	visited,
	currentIndex,
	cells,
	size,
	levelLength
) => {
	if (stack.length > 0) {
		const unvisited = []

		const leftIndex = currentIndex - 1
		const rightIndex = currentIndex + 1
		const topIndex = currentIndex - size
		const bottomIndex = currentIndex + size
		const isFirstColumn = currentIndex % size === 0
		const isLastColumn = currentIndex % size === size - 1
		const isFirstRow = Math.floor(currentIndex / size) === 0
		const isLastRow = Math.floor(currentIndex / size) === size - 1

		// Check if adjacent left cell is unvisited
		if (
			leftIndex > 0 &&
			leftIndex < levelLength &&
			!isFirstColumn &&
			!visited.includes(leftIndex)
		) {
			unvisited.push({
				index: leftIndex,
				direction: 'left',
				oppositeDirection: 'right'
			})
		}

		// Check if adjacent right cell is unvisited
		if (
			rightIndex > 0 &&
			rightIndex < levelLength &&
			!isLastColumn &&
			!visited.includes(rightIndex)
		) {
			unvisited.push({
				index: rightIndex,
				direction: 'right',
				oppositeDirection: 'left'
			})
		}

		// Check if adjacent top cell is unvisited
		if (
			topIndex > 0 &&
			topIndex < levelLength &&
			!isFirstRow &&
			!visited.includes(topIndex)
		) {
			unvisited.push({
				index: topIndex,
				direction: 'up',
				oppositeDirection: 'down'
			})
		}

		// Check if adjacent bottom cell is unvisited
		if (
			bottomIndex > 0 &&
			bottomIndex < levelLength &&
			!isLastRow &&
			!visited.includes(bottomIndex)
		) {
			unvisited.push({
				index: bottomIndex,
				direction: 'down',
				oppositeDirection: 'up'
			})
		}

		// If dead end is encountered start back tracking by popping
		// off the last visited cell from the stack array
		// until you find a cell with unvisited adjacent cells or
		// until stack array is empty
		if (unvisited.length < 1) {
			stack.pop()
			currentIndex = stack[stack.length - 1]

			if (stack.length > 0) {
				recursiveBacktrack(
					stack,
					visited,
					currentIndex,
					cells,
					size,
					levelLength
				)
			}
		}

		if (stack.length === 0) {
			return
		}

		// Take random cell from the unvisited adjacent cells array
		const randomArrayIndex = Math.floor(Math.random() * unvisited.length)
		const randomCell = unvisited[randomArrayIndex]
		const randomCellIndex = randomCell.index
		const randomCellDirection = randomCell.direction
		const randomCellOppositeDirection = randomCell.oppositeDirection

		// Update level cell using the randomly chosen cell index above
		cells[currentIndex].allowedDirections.push(randomCellDirection)
		cells[randomCellIndex].allowedDirections.push(
			randomCellOppositeDirection
		)

		// Update visited cells array and current cell index
		currentIndex = randomCellIndex
		visited.push(currentIndex)
		stack.push(currentIndex)

		recursiveBacktrack(
			stack,
			visited,
			currentIndex,
			cells,
			size,
			levelLength
		)
	}
}

export const generateMaze = (difficultyLevel = difficulty.easy) => {
	let size = 10
	let cells = []
	let visited = []
	let stack = []
	const currentIndex = 0

	// Set level size based on selected difficulty
	switch (difficultyLevel) {
		case difficulty.easy:
			size = 10
			break
		case difficulty.normal:
			size = 14
			break
		case difficulty.medium:
			size = 18
			break
		case difficulty.hard:
			size = 22
			break
		case difficulty.insane:
			size = 26
			break
		default:
			break
	}

	const levelLength = Math.pow(size, 2)

	// Generate level cells
	for (let i = 0; i < levelLength; i++) {
		const x = i % size
		const y = Math.floor(i / size)

		cells[i] = {
			coordinates: {
				x,
				y
			},
			allowedDirections: [],
			key: `${x}-${y}`
		}

		if (x === 0 && y === 0) {
			cells[i].isStart = true
		}

		if (x === size - 1 && y === size - 1) {
			cells[i].isEnd = true
		}
	}

	// Update level cells based on `Recursive Backtracker algorithm`
	visited.push(currentIndex)
	stack.push(currentIndex)

	recursiveBacktrack(stack, visited, currentIndex, cells, size, levelLength)

	return {
		size: size,
		cells: cells,
		start: {
			coordinates: {
				x: 0,
				y: 0
			}
		},
		end: {
			coordinates: {
				x: size - 1,
				y: size - 1
			}
		}
	}
}
