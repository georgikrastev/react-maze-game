export const TOGGLE_ALERT = 'TOGGLE_ALERT'
export const startScreenTitle = 'The Maze'
export const menuLinks = [
	{
		id: 'start-new-game-easy',
		label: 'Start New Game - Easy',
		action: {
			type: 'START',
			difficulty: 'EASY'
		}
	},
	{
		id: 'start-new-game-normal',
		label: 'Start New Game - Normal',
		action: {
			type: 'START',
			difficulty: 'NORMAL'
		}
	},
	{
		id: 'start-new-game-medium',
		label: 'Start New Game - Medium',
		action: {
			type: 'START',
			difficulty: 'MEDIUM'
		}
	},
	{
		id: 'start-new-game-hard',
		label: 'Start New Game - Hard',
		action: {
			type: 'START',
			difficulty: 'HARD'
		}
	},
	{
		id: 'start-new-game-insane',
		label: 'Start New Game - Insane',
		action: {
			type: 'START',
			difficulty: 'INSANE'
		}
	},
	{
		id: 'load-game',
		label: 'Load Game',
		action: {
			type: 'LOAD'
		}
	}
]
