import { difficulty } from '../components/App/constants'

/**
 * if adjacent cell is not visited it's cell index,
 * direction and oppositeDirection are added to
 * the unvisited array
 *
 * @param {Number} index 					Index of adjacent cell to be checked
 * @param {Boolean} forbidden 				Boolean of the forbidden column/row(for instance if the current cell is in the first column the adjacent cell on the left of it is forbidden)
 * @param {Array} visited 					Array of visited indexes we use to check if the current index was visited
 * @param {Array} unvisited 				Array of unvisited indexes
 * @param {Number} levelLength 				Total number of cells
 * @param {String} direction 				Direction of movement from the current cell to the selected adjacent cell
 * @param {String} oppositeDirection 		Direction of movement from the selected adjacent cell to the current cell
 */
const isAdjacentCellNotVisited = (
	index,
	forbidden,
	visited,
	unvisited,
	levelLength,
	direction,
	oppositeDirection
) => {
	if (
		index >= 0 &&
		index < levelLength &&
		!forbidden &&
		!visited.includes(index)
	) {
		unvisited.push({
			index,
			direction,
			oppositeDirection
		})
	}
}

/**
 * `Recursive Backtracking` algorithm to randomly
 * generate a maze
 *
 * @param {Array} stack 					Array of indexes to backtrack generator movement
 * @param {Array} visited 					Array of visited indexes
 * @param {Number} currentIndex 			Currently selected cell index
 * @param {Array} cells 					Array of cell objects
 * @param {Number} size 					The size of the maze, for example 10 rows and 10 cols means size 10
 * @param {Number} levelLength 				Total number of cells in the maze, for example 10 rows and 10 cols means 100 cells in total
 */
const recursiveBacktrack = (
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

		// Check if adjacent left cell is not visited
		isAdjacentCellNotVisited(
			leftIndex,
			isFirstColumn,
			visited,
			unvisited,
			levelLength,
			'left',
			'right'
		)

		// Check if adjacent right cell is not visited
		isAdjacentCellNotVisited(
			rightIndex,
			isLastColumn,
			visited,
			unvisited,
			levelLength,
			'right',
			'left'
		)

		// Check if adjacent top cell is not visited
		isAdjacentCellNotVisited(
			topIndex,
			isFirstRow,
			visited,
			unvisited,
			levelLength,
			'up',
			'down'
		)

		// Check if adjacent bottom cell is not visited
		isAdjacentCellNotVisited(
			bottomIndex,
			isLastRow,
			visited,
			unvisited,
			levelLength,
			'down',
			'up'
		)

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

/**
 * Generate maze based on provided difficulty
 * using the `Recursive Backtracking` algorithm
 *
 * @param {String} difficultyLevel 			Difficulty level, for example 'EASY'
 */
export const generateMaze = (difficultyLevel = difficulty.easy) => {
	let size = 10
	let cells = []
	let visited = []
	let stack = []

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
	const currentIndex = Math.floor(Math.random() * levelLength)

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
