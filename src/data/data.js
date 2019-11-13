export const levels = [
    {
        level: {
            number: 1,
            size: 10,
            cells: [
                {
                    coordinates: {
                        x: 0,
                        y: 0
                    },
                    allowedDirections: ['right', 'down']
                },
                {
                    coordinates: {
                        x: 1,
                        y: 0
                    },
                    allowedDirections: ['left', 'right', 'down']
                }
            ],
            end: {
                x: 9,
                y: 9
            }
        }
    }
]

export const startPosition = {
    position: {
        coordinates: {
            x: 0,
            y: 0
        },
        allowedDirections: ['right', 'down']
    }
}