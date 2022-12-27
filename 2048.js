const readline = require('readline');

let grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

const directions = {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right'
};

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getEmptyCells = () => {
    const emptyCells = [];
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            if (cell === 0) {
                emptyCells.push({
                    row: rowIndex,
                    cell: cellIndex
                });
            }
        });
    });
    return emptyCells;
}

const addRandomNumber = () => {
    const emptyCells = getEmptyCells();
    const randomCell = emptyCells[getRandomInt(0, emptyCells.length - 1)];
    grid[randomCell.row][randomCell.cell] = 2;
}

const printGrid = () => {
    grid.forEach(row => {
        console.log(row);
    });
}

const moveGrid = (direction) => {
    switch (direction) {
        case directions.up:
            moveUp();
            break;
        case directions.down:
            moveDown();
            break;
        case directions.left:
            moveLeft();
            break;
        case directions.right:
            moveRight();
            break;
    }
}

const moveUp = () => {
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            if (rowIndex === 0) {
                return;
            }
            const previousRow = grid[rowIndex - 1];
            if (previousRow[cellIndex] === 0) {
                previousRow[cellIndex] = cell;
                row[cellIndex] = 0;
            }
        });
    });
}

const moveDown = () => {
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            if (rowIndex === grid.length - 1) {
                return;
            }
            const nextRow = grid[rowIndex + 1];
            if (nextRow[cellIndex] === 0) {
                nextRow[cellIndex] = cell;
                row[cellIndex] = 0;
            }
        });
    });
}

const moveLeft = () => {
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            if (cellIndex === 0) {
                return;
            }
            const previousCell = row[cellIndex - 1];
            if (previousCell === 0) {
                row[cellIndex - 1] = cell;
                row[cellIndex] = 0;
            }
        });
    });
}

const moveRight = () => {
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            if (cellIndex === row.length - 1) {
                return;
            }
            const nextCell = row[cellIndex + 1];
            if (nextCell === 0) {
                row[cellIndex + 1] = cell;
                row[cellIndex] = 0;
            }
        });
    });
}

const mergeGrid = (direction) => {
    switch (direction) {
        case directions.up:
            mergeUp();
            break;
        case directions.down:
            mergeDown();
            break;
        case directions.left:
            mergeLeft();
            break;
        case directions.right:
            mergeRight();
            break;
    }
}

const mergeUp = () => {
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            if (rowIndex === 0) {
                return;
            }
            const previousRow = grid[rowIndex - 1];
            if (previousRow[cellIndex] === cell) {
                previousRow[cellIndex] = cell * 2;
                row[cellIndex] = 0;
            }
        });
    });
}

const mergeDown = () => {
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            if (rowIndex === grid.length - 1) {
                return;
            }
            const nextRow = grid[rowIndex + 1];
            if (nextRow[cellIndex] === cell) {
                nextRow[cellIndex] = cell * 2;
                row[cellIndex] = 0;
            }
        });
    });
}

const mergeLeft = () => {
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            if (cellIndex === 0) {
                return;
            }
            const previousCell = row[cellIndex - 1];
            if (previousCell === cell) {
                row[cellIndex - 1] = cell * 2;
                row[cellIndex] = 0;
            }
        });
    });
}

const mergeRight = () => {
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            if (cellIndex === row.length - 1) {
                return;
            }
            const nextCell = row[cellIndex + 1];
            if (nextCell === cell) {
                row[cellIndex + 1] = cell * 2;
                row[cellIndex] = 0;
            }
        });
    });
}

const isGameOver = () => {
    const emptyCells = getEmptyCells();
    if (emptyCells.length > 0) {
        return false;
    }
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (i < grid.length - 1 && grid[i][j] === grid[i + 1][j]) {
                return false;
            }
            if (j < grid[i].length - 1 && grid[i][j] === grid[i][j + 1]) {
                return false;
            }
        }
    }
    return true;
}

const isGameWon = () => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 2048) {
                return true;
            }
        }
    }
    return false;
}

const initGame = () => {
    grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    addRandomNumber();
    addRandomNumber();
}

// run the game
initGame();
printGrid();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    moveGrid(input);
    mergeGrid(input);
    moveGrid(input);
    addRandomNumber();
    console.clear();
    printGrid();
    if (isGameWon()) {
        console.log('You won!');
        rl.close();
    }
    if (isGameOver()) {
        console.log('Game over!');
        rl.close();
    }
})