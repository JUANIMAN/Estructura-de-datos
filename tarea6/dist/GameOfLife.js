import { Array2D } from './Array2D.js';
export class GameOfLife {
    constructor(rows, cols) {
        this.grid = new Array2D(rows, cols, false);
    }
    randomize() {
        for (let i = 0; i < this.grid.getRowSize(); i++) {
            for (let j = 0; j < this.grid.getColSize(); j++) {
                this.grid.setItem(i, j, Math.random() > 0.5);
            }
        }
    }
    nextGeneration() {
        const newGrid = new Array2D(this.grid.getRowSize(), this.grid.getColSize(), false);
        for (let i = 0; i < this.grid.getRowSize(); i++) {
            for (let j = 0; j < this.grid.getColSize(); j++) {
                const neighbors = this.countNeighbors(i, j);
                const currentState = this.grid.getItem(i, j);
                if (currentState && (neighbors < 2 || neighbors > 3)) {
                    newGrid.setItem(i, j, false);
                }
                else if (!currentState && neighbors === 3) {
                    newGrid.setItem(i, j, true);
                }
                else {
                    newGrid.setItem(i, j, currentState);
                }
            }
        }
        this.grid = newGrid;
    }
    countNeighbors(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0)
                    continue;
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < this.grid.getRowSize() && newCol >= 0 && newCol < this.grid.getColSize()) {
                    count += this.grid.getItem(newRow, newCol) ? 1 : 0;
                }
            }
        }
        return count;
    }
    toggleCell(row, col) {
        this.grid.setItem(row, col, !this.grid.getItem(row, col));
    }
}
